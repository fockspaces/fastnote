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


# env variabels
variable "GPT_ACCESS_KEY" {
  description = "GPT_ACCESS_KEY"
  type        = string
}
variable "host" {
  description = "ECS host"
  type        = string
}

variable "AWS_SQS_URL" {
  description = "AWS_SQS_URL"
  type        = string
}

variable "GPT_SERVER_KEY" {
  description = "GPT_SERVER_KEY"
  type        = string
}

variable "GPT_HOST" {
  description = "GPT_HOST"
  type        = string
}

