# Fastnote

<p align="center">
  <img src="https://github.com/fockspaces/fastnote/assets/63909491/d6841cb8-46aa-4803-9053-00c97c6fe521" alt="Fastnote" width="50%" height="auto"/>
</p>

<p align="center">  
  <img alt="AWS Services" src="https://img.shields.io/badge/AWS-Services-FF9900?logo=amazonaws"/>  
  <a href="https://github.com/fockspaces/fastnote/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"/></a>
  <img alt="backend workflow" src="https://github.com/fockspaces/fastnote/actions/workflows/backend.yml/badge.svg"/>
  <a href="https://app.swaggerhub.com/apis-docs/fastnote/fast-note_api/1.0.0"><img alt="Swagger API" src="https://img.shields.io/badge/Swagger-API-brightgreen?logo=swagger"/></a>
  <img alt="Terraform" src="https://img.shields.io/badge/Terraform-v1.0.0-623CE4.svg?logo=terraform"/>
</p>

📓 Fastnote is a serverless note-taking app with MERN stacks, aiming at efficient idea management, offering features such as search functionality, auto-generation of summaries, and tagging with openAI.

🔗 Website URL: <a href="https://www.fastnote.space" target="_blank">www.fastnote.space</a>

📖 How to Use: <a href="https://github.com/fockspaces/fastnote/blob/main/documentations/Tutorial.md" target="_blank">Tutorial</a>

📓 Under the Hood:
<a href="https://github.com/fockspaces/fastnote/blob/main/documentations/TechSkills.md" target="_blank"> Details</a>

_**Note:** In the '**Under the Hood**' section, we'll take a closer look at the technical aspects of the project and how various technologies and skills were employed to achieve specific goals._

---

## Table of Contents

- [Main Features](#main-features)
- [Architecture](#architecture)
- [Database Table Schema](#database-table-schema)
- [CI / CD](#ci--cd)
- [API Documentation](#api-documentation)
- [Technique](#technique)
- [Cloud Services (AWS)](#cloud-services-aws)
- [Contact](#contact)

---

## Main Features

- Full-Text-Search: Efficient full-text search functionality, allowing users to quickly find related notes they have written.
- Asynchronous Processing: Perform independent summarization tasks with lambda functions
- Scalable Design: Handle high-load scenarios by initiating additional containers as needed.
- Infrastructure Management: Employed Terraform for resources management.

---

## Architecture

## <img src="https://github.com/fockspaces/fastnote/assets/63909491/87417a0d-2d21-45ae-ba29-87100fbe2d45" alt="image" width="100%" height="auto" />

---

## Database Table Schema

The database table schema is defined using Mongoose schema.

## <img src="https://github.com/fockspaces/fastnote/assets/63909491/4435ddcc-1f0a-4c9e-880f-2c6f022e77b8" alt="image" width="100%" height="auto" />

---

## CI / CD

The deployment process for both frontend and backend components is managed separately.

<img alt="image" src="https://github.com/fockspaces/fastnote/assets/63909491/44377ac5-61ef-428f-9043-510c472a2e96">

### Workflow

- Backend Process: If the tests pass successfully, a Docker image is pushed to a Docker Hub, triggering an update in the AWS ECS services.

- Frontend Process: Each commit triggers a build of the React application. Static files are directly uploaded to AWS S3 for web hosting.

### Testing

To execute the tests and generate the test results, use the following command:

```shell
npm run test -- --coverage
```

You can find the coverage report in the <code>/backend/coverage</code> directory of the repository.

![image](https://github.com/fockspaces/fastnote/assets/63909491/a4a45eef-eacd-4ca5-a877-5bead4be5777)

### Tools

- GitHub Actions: Automates the workflow from code push to deployment.
- Jest and SuperTest: Utilizes for integrated testing in the backend API.
- Docker: Ensures consistent, reproducible environments for AWS ECS.
- Terraform: Manages and provisions AWS services resources, enhancing scalability and consistency.

---

## API Documentation

The API documentation is supported by Swagger

🔗 https://app.swaggerhub.com/apis-docs/fastnote/fast-note_api/1.0.0

---

## Technique

Technologies and tools utilized in the project.

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

---

## Contact

🧑🏻‍💻 Feng Ming, Chang

✉️ a86gj3sp4@gmail.com
