# Under The Hood

## 🚧 Summarization Approach

This section dives into the strategies employed for generating precise prompts, integral for content summarization and tag creation.

### Prompt Optimization

Our optimization strategy focus on creating a comprehensive prompt that guides the summarization process, as illustrated below:

> First, identify the language of the text provided below:
> ${content}
>
> Once you've identified the language, follow these steps to generate a one-sentence summary in the original language:
>
> 1.  Carefully read the text, focusing on the main ideas and themes of each restaurant mentioned.
> 2.  Break down the text into smaller, manageable parts, and analyze each part in detail.
> 3.  Consider the relevance of each part to the overall context, and identify the key points for each restaurant.
> 4.  Combine the key points for each restaurant separately, ensuring the information is clear and not mixed.
> 5.  Create a concise summary that accurately captures the essence of the content, mentioning both restaurants.
> 6.  Ensure that the summary is grammatically correct, forms a complete sentence, and is in the original language of the text.
>
> Summary:

Our strategy follows these core principles:

<!-- You might want to explain a little bit more about why you chose the 'step-by-step' and 'split complex tasks into simpler tasks' approach. What advantages does it bring to the summarization process? -->

1. Thinking Step-by-step.
2. Breaking down big tasks into simpler subtasks.
3. Sticking to specific output formats.

For more insights, please refer to the <a href="https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md">OpenAI Cookbook</a>

### Addressing Extended Text Length

To handle the challenge of lengthy text, I employ a parallel processing strategy:


<img src="https://github.com/fockspaces/fastnote/assets/63909491/c81f0ed8-e7b4-4b47-8b1f-48c6925c14c6" alt="image" width="80%" height="auto" />


<!-- Consider explaining the challenges of handling long text in more detail. Why is long text a problem for GPT-3 or for your application? -->

By dividing the note's content into numerous chunks, we can concurrently fetch responses from the GPT-3 model. This approach ensures consistent processing time regardless of the length of the note's content.

<!-- It could be helpful to provide a concrete example of how you break down complex tasks into simpler subtasks. -->

<!-- If there are any limitations or known issues with your current approach to summarization, it would be good to acknowledge them and discuss any potential improvements or future plans you have to address these limitations. -->

## 🚧 Message Broker

This section provides insights into the choice of employing AWS Simple Queue Service (SQS) with Lambda for message brokering.

### Why SQS and not RabbitMQ for Message Queuing?

For the execution of asynchronous summarization of articles, my choice fell on SQS due to the following advantages it offers:

- Reliability: In contrast to self-hosted RabbitMQ, which requires contingency plans on server failure. SQS (maintained by AWS) guarantees the queuing of new jobs as long as our Express server alive.

- Scalability: The expected user behavior suggests infrequent article summarizations, resulting in lower computational demands. A significant portion of processing time is dedicated to awaiting responses from GPT-3. Hence, utilize Lambda for managing GPT responses is an effective approach.

<!-- You could further elaborate on why you chose AWS Lambda for managing GPT responses in the "Scalability" section. -->

- Cost-effectiveness: SQS grants 1 million free requests per month. Compared to RabbitMQ's minimum setup cost on Tokyo ECS (around 8.9 USD/month for 0.25v CPU + 0.5v Memory), SQS is a budget-friendly choice, essentially free if monthly requests stay below 1 million.

### Task Processing

A detailed overview of the implementation and management of asynchronous tasks with different job stages.

<img src="https://github.com/fockspaces/fastnote/assets/63909491/57708be4-ed63-43a2-a830-cb0ff8bafea5" alt="image" width="80%" height="auto" />

The job processing is divided into two distinct stages to prevent data loss:

- Stage 1: GPT Fetching

  At this stage, the content of a note is sent to the OpenAI API to generate the summary and associated tags.

- stage 2: Database Update

  Updated data is then sent to the Express server for the database update.

With separating the job into two stages, the data remains in the SQS queue and will be retried when express server or database network failure.

<!-- In the "Task Processing" section, consider discussing how the system handles retry attempts if there's a network failure. -->

<!-- Consider detailing more about how SQS handles data during network failures, which contributes to its reliability. -->

<!-- visibility_timeout_seconds : 用來控制lambda重複看到queue message的時間 -->

<!-- 
## 🚧 Search

Diving into the process of choosing the appropriate tokenizer and analyzer for MongoDB Atlas to optimize search efficiency.

1. How did you determine the most suitable tokenizer and analyzer for MongoDB Atlas in your project?
2. Could you explain how the chosen tokenizer and analyzer improve the search functionality?
3. Have you considered any other options before settling on your current choices? If so, why did you prefer the current selection? -->

<!-- ## 🚧 Infrastructure

### Elastic Container Service (ECS)

Discussion on the rationale behind using ECS instead of traditional EC2 for server management.

1. Could you explain why you chose to use ECS instead of EC2 for server management in your project?

- Server Loading (no need for real-time
  operation)
- Easy to manage resource

2. What benefits did this choice provide for your project's scalability and reliability?

- containerization
  no need to care about the environment of instance setting

3. Were there any challenges or drawbacks with this decision?

- debugging (hard to check the log message) -->
