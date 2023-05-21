# Under The Hood

## 🚧 Summarization

This section delves into the strategies employed for generating precise prompts, integral for content summarization and tag creation.

<!-- 1. How are you creating accurate and comprehensive prompts for summarizing content?

- Prompt evolution (ref GPT cookbook)
- Can you provide an example of how a typical prompt looks like? -->

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

To handle the challenge of lengthy text, we employ a parallel processing strategy:

<!-- Consider explaining the challenges of handling long text in more detail. Why is long text a problem for GPT-3 or for your application? -->

By dividing the note's content into numerous chunks, we can concurrently fetch responses from the GPT-3 model. This approach ensures consistent processing time regardless of the length of the note's content.

<!-- It could be helpful to provide a concrete example of how you break down complex tasks into simpler subtasks. -->

<!-- If there are any limitations or known issues with your current approach to summarization, it would be good to acknowledge them and discuss any potential improvements or future plans you have to address these limitations. -->

## 🚧 Message Broker

### SQS & Lambda

Insight into the decision to utilize AWS SQS with Lambda for message brokering over self-hosted RabbitMQ server.

<!-- 1. Could you elaborate on your decision to use AWS SQS with Lambda for message brokering over a self-hosted RabbitMQ server?

2. What advantages did this choice offer in terms of performance, scalability, and maintenance?
3. Were there any notable challenges or issues you encountered with this setup? -->

### Job Processing

A detailed overview of the implementation and management of asynchronous tasks with different job stages.

<!-- 1. How have you implemented the asynchronous tasks in your project?
2. What does the lifecycle of a typical job look like from initiation to completion?
3. What were the challenges in managing different job stages?
4. What solutions or workarounds did you find for those challenges? -->

## 🚧 Search

Diving into the process of choosing the appropriate tokenizer and analyzer for MongoDB Atlas to optimize search efficiency.

1. How did you determine the most suitable tokenizer and analyzer for MongoDB Atlas in your project?
2. Could you explain how the chosen tokenizer and analyzer improve the search functionality?
3. Have you considered any other options before settling on your current choices? If so, why did you prefer the current selection?

## 🚧 Infrastructure

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

- debugging (hard to check the log message)

### Terraform (IaC Tool)
