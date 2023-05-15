provider "aws" {
  region = "ap-northeast-1"
}

data "aws_region" "current" {}

locals {
  app_name = "fastnote"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name                 = local.app_name
  cidr                 = "10.0.0.0/16"
  azs                  = ["ap-northeast-1a", "ap-northeast-1c"]
  private_subnets      = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets       = ["10.0.101.0/24", "10.0.102.0/24"]
  enable_nat_gateway   = false
  single_nat_gateway   = true
  enable_dns_hostnames = true
}

// ***************** ECS *****************
resource "aws_ecs_cluster" "this" {
  name = local.app_name
}

resource "aws_ecs_cluster_capacity_providers" "cluster" {
  cluster_name = local.app_name

  capacity_providers = ["FARGATE_SPOT", "FARGATE"]

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
  }
}


resource "aws_cloudwatch_log_group" "this" {
  name              = "/ecs/${local.app_name}"
  retention_in_days = 7
}



resource "aws_ecs_task_definition" "this" {
  family                   = local.app_name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "fastnote"
      image = "fockspace/fastnote:latest"

      essential = true

      environment = [
        { name = "MONGODB_URI", value = var.MONGODB_URI },
        { name = "PORT", value = var.PORT },
        { name = "GOOGLE_CLIENT_ID", value = var.GOOGLE_CLIENT_ID },
        { name = "GOOGLE_CLIENT_SECRET", value = var.GOOGLE_CLIENT_SECRET },
        { name = "JWT_SECRET", value = var.JWT_SECRET },
        { name = "AWS_BUCKET_NAME", value = var.AWS_BUCKET_NAME },
        { name = "AWS_BUCKET_REGION", value = var.AWS_BUCKET_REGION },
        { name = "AWS_ACCESS_KEY", value = var.AWS_ACCESS_KEY },
        { name = "AWS_SECRET_ACCESS_KEY", value = var.AWS_SECRET_ACCESS_KEY },
        { name = "GPT_ACCESS_KEY", value = var.GPT_ACCESS_KEY },
        { name = "AWS_SQS_URL", value = var.AWS_SQS_URL },
        { name = "NODE_ENV", value = var.NODE_ENV },
        { name = "AWS_ELASTIC_CACHE", value = var.AWS_ELASTIC_CACHE }, { name = "CLIENT_HOST", value = var.CLIENT_HOST },
      ]


      portMappings = [
        {
          containerPort = 8000
          hostPort      = 8000
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.this.name
          "awslogs-region"        = data.aws_region.current.name
          "awslogs-stream-prefix" = "ecs"
        }
      }

    }
  ])

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }

}

resource "aws_security_group" "allow_outbound" {
  name        = "allow_outbound"
  description = "Allow outbound traffic and inbound traffic on ports 80 and 443"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000 // Update this line
    to_port     = 8000 // Update this line
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_ecs_service" "this" {
  name            = local.app_name
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  # launch_type     = "FARGATE"

  desired_count = 1

  network_configuration {
    subnets          = module.vpc.public_subnets
    security_groups  = [aws_security_group.allow_outbound.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.this.arn
    container_name   = "fastnote"
    container_port   = 8000
  }

  // Or if you want to use both FARGATE and FARGATE_SPOT, you can define multiple strategies
  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = 1
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 1
  }
}


resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = aws_iam_role.ecs_task_execution_role.name
}

// ***************** ALB *****************
resource "aws_lb" "this" {
  name               = "${local.app_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_outbound.id]
  subnets            = module.vpc.public_subnets
}

resource "aws_lb_target_group" "this" {
  name        = "fastnote-target-group"
  port        = 8000 // Update this line
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "ip" // Add this line


  health_check {
    enabled             = true
    interval            = 30
    path                = "/api" # Update this to the correct health check path for your application
    timeout             = 5
    healthy_threshold   = 3
    unhealthy_threshold = 3
  }
}



resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}



resource "aws_route53_record" "www" {
  name    = "api.${var.domain_name}"
  type    = "A"
  zone_id = var.hosted_zone_id
  alias {
    name                   = aws_lb.this.dns_name
    zone_id                = aws_lb.this.zone_id
    evaluate_target_health = true
  }
}
