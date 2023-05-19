# Fastnote
<p align="center">
  <img src="https://github.com/fockspaces/fastnote/assets/63909491/d6841cb8-46aa-4803-9053-00c97c6fe521" alt="Fastnote" width="70%" height="auto" />
</p>

📓 Fastnote is a serverless note-taking app with MERN stacks, aiming at efficient idea management, offering features such as search functionality, auto-generation of summaries, and tagging with openAI.

🔗 Website URL: https://www.fastnote.space

## Table of Contents
- [Main Features](#main-features)
- [Technique](#technique)
- [Cloud Services (AWS)](#cloud-services-aws)
- [Architecture](#architecture)
- [Database Table Schema](#database-table-schema)
- [API Doc](#api-doc)
- [Testing](#testing)
- [Contact](#contact)


## Main Features
- **Full-Text-Search**: Efficient full-text search functionality, allowing users to quickly find related notes they have written.
- **Asynchronous Processing**: Perform independent summarization tasks with lambda functions
- **Scalable Design**: Handle high-load scenarios by initiating additional containers as needed. 
- **Infrastructure Management**: Employed Terraform for resources management.


## Technique
### Infrastructure
- Docker
- Terraform
### Environment
- Node.js / Express.js
### Database
- MongoDB Atlas
- ElastiCache (Redis)
### Test
- Jest, SuperTest

### CI / CD
- GitHub Actions

### Third Party Library
- OpenAI
- Tiptap
### Frontend
- React (Hook)
- Sass


## Cloud Services (AWS)
### Server
- Elastic Load Balancer
- Elastic Container Service (ECS)
- Elastic Compute Cloud (EC2)
- Fargate
### Storage
- Simple Storage Service (S3) 
- CloudFront (CDN)
### Message Broker
- Simple Queue Service (SQS)
- Lambda
### DNS
- Route 53

## Architecture
<img src="https://github.com/fockspaces/fastnote/assets/63909491/9946b399-1d52-46e7-aebd-731b4d1988f6" alt="image" width="65%" height="auto" />

## Database Table Schema
<img src="https://github.com/fockspaces/fastnote/assets/63909491/4435ddcc-1f0a-4c9e-880f-2c6f022e77b8" alt="image" width="65%" height="auto" />



## API Doc


## Testing

## Contact
🧑🏻‍💻 Feng Ming, Chang

✉️ a86gj3sp4@gmail.com
