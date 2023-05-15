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
