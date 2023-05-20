# Fastnote
<p align="center">
  <img src="https://github.com/fockspaces/fastnote/assets/63909491/d6841cb8-46aa-4803-9053-00c97c6fe521" alt="Fastnote" width="50%" height="auto"/>
</p>

📓 Fastnote is a serverless note-taking app with MERN stacks, aiming at efficient idea management, offering features such as search functionality, auto-generation of summaries, and tagging with openAI.

🔗 Website URL: <a href="https://www.fastnote.space" target="_blank">https://www.fastnote.space</a>

## Table of Contents
- [Main Features](#main-features)
- [Architecture](#architecture)
- [Database Table Schema](#database-table-schema)
- [CI / CD](#ci-cd)
- [API Documentation](#api-documentation)
- [Technique](#technique)
- [Cloud Services (AWS)](#cloud-services-aws)
- [Contact](#contact)




## Main Features
- **Full-Text-Search**: Efficient full-text search functionality, allowing users to quickly find related notes they have written.
- **Asynchronous Processing**: Perform independent summarization tasks with lambda functions
- **Scalable Design**: Handle high-load scenarios by initiating additional containers as needed. 
- **Infrastructure Management**: Employed Terraform for resources management.




## Architecture
<img src="https://github.com/fockspaces/fastnote/assets/63909491/87417a0d-2d21-45ae-ba29-87100fbe2d45" alt="image" width="100%" height="auto" />


## Database Table Schema
<img src="https://github.com/fockspaces/fastnote/assets/63909491/4435ddcc-1f0a-4c9e-880f-2c6f022e77b8" alt="image" width="100%" height="auto" />



## CI / CD
The deployment process for both the frontend and backend components is managed separately.

<img src="https://github.com/fockspaces/fastnote/assets/63909491/0b35231b-96d0-41b9-a3ec-6347dd721871" alt="image" width="100%" height="auto" />

### Workflow
- **Backend Process**: Includes conducting integrated tests using Jest and SuperTest. If the tests pass successfully, a Docker image is generated and pushed to a Docker registry, triggering an update in the AWS ECS services.

- **Frontend Process**: The React app is built and the resulting build folder is directly uploaded to AWS S3 for deployment. This is followed by clearing the cache in CloudFront.


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

## API Documentation
The API documentation is supported by Swagger

🔗 https://app.swaggerhub.com/apis-docs/fastnote/fast-note_api/1.0.0

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



## Contact
🧑🏻‍💻 Feng Ming, Chang

✉️ a86gj3sp4@gmail.com
