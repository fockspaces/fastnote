# Under The Hood

This section provides insights into the mechanisms powering our application, focusing on the two key factors: **Summarization Strategy** and **Asynchronous Task Processing**.

---

## Table of Contents

- [Summarization Strategy](#summarization-strategy)

  - [Fine-tuning Prompt](#1-fine-tuning-prompt)
  - [Managing Long Texts](#2-managing-long-texts)

- [Asynchronous Task Processing](#asynchronous-task-processing)

  - [Choosing Amazon SQS: The Advantages](#1-choosing-amazon-sqs-the-advantages)
  - [Ensuring Data Integrity with AWS Lambda](#2-ensuring-data-integrity-with-aws-lambda)

---

## Summarization Strategy

This section explains our method for creating clear and short prompts, which are important for summarizing content and creating tags.

### 1. Fine-tuning Prompt

Our approach focuses on creating a detailed prompt that guides the summarization process.

At first, we used a simple prompt asking GPT to summarize:

<img width="90%" alt="image" src="https://github.com/fockspaces/fastnote/assets/63909491/4b3a3fa5-01e8-479d-8107-9b87e554e461">

This initial attempt produced results that looked like this:

<img src="https://github.com/fockspaces/fastnote/assets/63909491/bdba9324-ba37-4411-b03e-33e91897ec51" alt="image" width="80%" height="auto" />

We found that the summary was incomplete and not very clear.

So, we changed the prompt into:

<img width="90%" alt="image" src="https://github.com/fockspaces/fastnote/assets/63909491/29e22dea-76fd-44b3-ab61-778806138c60">

Our approach is based on these main principles:

> 1. Thinking step by step.
> 2. Breaking complex tasks into simpler by subtasks.
> 3. Sticking to specific output formats.

The results with this refined prompt appear as follows:

<img src="https://github.com/fockspaces/fastnote/assets/63909491/425e0ca7-4b96-4875-a649-65d110562c7e" alt="image" width="80%" height="auto" />

Great, now we get a clear understanding of the note content.

For more insights, please refer to the <a href="https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md">OpenAI Cookbook</a>

### 2. Managing Long Texts

When dealing with large amounts of note content, the summarization process might take longer. This is because we have to divide the content into several parts to stay within the maximum token limit of GPT-3.

If we split the content into 3 parts, we might have to wait for a GPT-3 response three times. This process could exhaust the server and cause delays for the client waiting for a response.

To address this issue of long texts, I use a parallel processing approach:

<img src="https://github.com/fockspaces/fastnote/assets/63909491/c81f0ed8-e7b4-4b47-8b1f-48c6925c14c6" alt="image" width="80%" height="auto" />

By breaking the note's content into many pieces, we can get responses from the GPT-3 model concurrently. This approach ensures consistent processing time regardless of the length of the note's content.

However, it's still tricky to determine which part is the dominant one. Each piece of the summary might have a different significance in the overall context. If a user adds new content that falls into a new piece, it might take up too much proportion (weight) in the summarization process.

---

## Asynchronous Task Processing

Through the integration of Lambda and SQS, we can eliminate the waiting time for responses and ensure data integrity during periods of high traffic.

### 1. Choosing Amazon SQS: The Advantages

The selection of Amazon SQS as our message queuing service was driven by several key factors:

- Reliability: In contrast to self-hosted RabbitMQ, which requires backup plans on server failure. SQS (maintained by AWS) guarantees the queuing of new jobs as long as our Express server remains active.

- Efficiency: Considering the infrequent need for article summarization by users, there's generally less computational load. At most part of the processing time is spent awaiting GPT-3 responses, using SQS with Lambda to manage these responses is a highly efficient strategy.

- Cost-effectiveness: SQS grants 1 million free requests per month. Compared to RabbitMQ's minimum setup cost on Tokyo ECS (around 8.9 USD/month for 0.25v CPU + 0.5v Memory), SQS becomes a cost-effective choice if monthly requests stay under 1 million.

### 2. Ensuring Data Integrity with AWS Lambda

To prevent data loss, we use AWS Lambda's capability to handle a high volume of simultaneous requests without requiring additional infrastructure management.

<img src="https://github.com/fockspaces/fastnote/assets/63909491/57708be4-ed63-43a2-a830-cb0ff8bafea5" alt="image" width="80%" height="auto" />

Here's how our application ensures data integrity:

- Stage 1: GPT Fetching

  When a task arrives in SQS, it triggers a Lambda function to process the content, retrieve a summary and tags from GPT, and then store these back in SQS.

- Stage 2: Database Update

  Subsequently, SQS triggers another Lambda function that interacts with the Express server to update the database.

Additionally, we have implemented an error-handling mechanism. If a Lambda process fails, SQS restarts the Lambda process after a preset timeout.

If failures continue, the task is sent to a Dead-Letter Queue (DLQ), a repository designed for messages that could not be correctly processed. This ensures that no data is lost, even during network failures.
