variable "domain_name" {
  description = "Domain name to associate with the ECS service"
  type        = string
}

variable "hosted_zone_id" {
  description = "ID of the hosted zone in Route 53"
  type        = string
}

variable "certificate_arn" {
  type = string
}

variable "key_name" {
  description = "Key pair name to be used for EC2 instances"
  type        = string
}

variable "CLIENT_HOST" {
  description = "CLIENT_HOST for cors origin"
  type        = string
}


variable "MONGODB_URI" {}
variable "PORT" {}
variable "GOOGLE_CLIENT_ID" {}
variable "GOOGLE_CLIENT_SECRET" {}
variable "JWT_SECRET" {}
variable "AWS_BUCKET_NAME" {}
variable "AWS_BUCKET_REGION" {}
variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_ACCESS_KEY" {}
variable "GPT_ACCESS_KEY" {}
variable "AWS_SQS_URL" {}
variable "NODE_ENV" {}
variable "AWS_ELASTIC_CACHE" {}

