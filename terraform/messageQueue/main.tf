provider "aws" {
  region = "ap-northeast-1"
}

locals {
  app_name = "fastnote"
}

# SQS
resource "aws_sqs_queue" "dlq" {
  name = "${local.app_name}-queue-dlq"
}

resource "aws_sqs_queue" "queue" {
  name = "${local.app_name}-queue"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dlq.arn
    maxReceiveCount     = 5
  })

  visibility_timeout_seconds = 300
}

resource "aws_sqs_queue" "lambda_dlq" {
  name = "${local.app_name}-lambda-dlq"
}


# Lambda
resource "aws_lambda_function" "lambda" {
  function_name    = "${local.app_name}-lambda"
  filename         = "lambda_function.zip"
  source_code_hash = filebase64sha256("lambda_function.zip")
  handler          = "index.handler"
  runtime          = "nodejs14.x"
  role             = aws_iam_role.lambda.arn
  architectures    = ["arm64"]
  # reserved_concurrent_executions = 10
  memory_size = 256


  timeout = 40

  dead_letter_config {
    target_arn = aws_sqs_queue.lambda_dlq.arn
  }

  environment {
    variables = {
      GPT_ACCESS_KEY : var.GPT_ACCESS_KEY,
      host : var.host,
      AWS_SQS_URL : var.AWS_SQS_URL,
      GPT_SERVER_KEY : var.GPT_SERVER_KEY,
      GPT_HOST : var.GPT_HOST
    }
  }
}

resource "aws_lambda_event_source_mapping" "sqs_mapping" {
  event_source_arn = aws_sqs_queue.queue.arn
  function_name    = aws_lambda_function.lambda.arn
  batch_size       = 1
}

resource "aws_lambda_function_event_invoke_config" "no_retry" {
  function_name = aws_lambda_function.lambda.function_name
  qualifier     = "$LATEST" # Add this line

  destination_config {
    on_failure {
      destination = aws_sns_topic.failure_destination.arn
    }
  }

  maximum_retry_attempts = 0
}

resource "aws_sns_topic" "failure_destination" {
  name = "${local.app_name}-failure-destination"
}

resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.failure_destination.arn
  protocol  = "email"
  endpoint  = "a86gj3sp4@email.com"
}



resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14
}


# IAM Role
resource "aws_iam_role" "lambda" {
  name = "${local.app_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "${local.app_name}-lambda-policy"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "lambda:CreateFunction",
          "lambda:DeleteFunction",
          "lambda:GetFunction",
          "lambda:GetFunctionConfiguration",
          "lambda:ListFunctions",
          "lambda:UpdateFunctionCode",
          "lambda:UpdateFunctionConfiguration",
          "lambda:InvokeFunction"
        ],
        Effect   = "Allow",
        Resource = "*"
      },
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes",
          "sqs:SendMessage" # Add this permission
        ],
        Effect   = "Allow",
        Resource = aws_sqs_queue.queue.arn
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Action = [
          "sqs:SendMessage"
        ],
        Effect   = "Allow",
        Resource = aws_sqs_queue.lambda_dlq.arn
      },
      {
        Action = [
          "sns:Publish"
        ],
        Effect   = "Allow",
        Resource = aws_sns_topic.failure_destination.arn
      }
    ]
  })
}


resource "aws_iam_user_policy" "sns_create_topic" {
  name = "sns_create_topic_policy"
  user = "fastnote-user"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sns:CreateTopic"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}


// Output the SQS Queue URL
output "sqs_queue_url" {
  value = aws_sqs_queue.queue.url
}
