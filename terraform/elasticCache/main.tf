provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_elasticache_cluster" "fastnote" {
  cluster_id           = "fastnote"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"
  subnet_group_name    = aws_elasticache_subnet_group.fastnote.name
  security_group_ids   = [aws_security_group.fastnote.id]
}

resource "aws_elasticache_subnet_group" "fastnote" {
  name       = "fastnote"
  subnet_ids = [
    "subnet-0ab4c681c91fbc66e",
    "subnet-02a1c6c54d13710f3",
    "subnet-027722a1d2ec5574d",
    "subnet-04ec878f2165ee80e",
  ]
}

resource "aws_security_group" "fastnote" {
  name        = "fastnote"
  description = "Security group for ElastiCache cluster"
  vpc_id      = "vpc-0bca8a5e7f50054a4"

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }
}
