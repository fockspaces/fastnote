variable "ami_id" {
  description = "The Amazon Machine Image (AMI) ID for the EC2 instance"
  type        = string
  default     = "ami-0d979355d03fa2522"
}

provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_security_group" "GPTServer" {
  name        = "GPTServer"
  description = "GPTServer security group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
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

resource "aws_instance" "GPTServer" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  key_name      = "stylish_MAC"

  vpc_security_group_ids = [aws_security_group.GPTServer.id]

  disable_api_termination = false

  tags = {
    Name = "GPTServer-instance"
  }
}

resource "aws_eip" "GPTServer" {
  instance = aws_instance.GPTServer.id
  vpc      = true
}

output "instance_public_ip" {
  value = aws_eip.GPTServer.public_ip
}
