import AWS from "aws-sdk";

AWS.config.update({ region: "ap-northeast-1" });

const sqs = new AWS.SQS();

export async function sendToSQS(message) {
  console.log(process.env.AWS_SQS_URL);
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.AWS_SQS_URL,
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log(`Message sent to SQS: ${result.MessageId}`);
    return result;
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    throw error;
  }
}

export async function deleteMessageFromSQS(receiptHandle) {
  const params = {
    QueueUrl: process.env.AWS_SQS_URL,
    ReceiptHandle: receiptHandle,
  };

  try {
    await sqs.deleteMessage(params).promise();
    console.log(`Deleted message with ReceiptHandle`);
  } catch (error) {
    if (error.code === "AWS.SimpleQueueService.NonExistentMessage") {
      console.log(`Message with ReceiptHandle no longer exists in the queue.`);
    } else {
      console.error(`Failed to delete message: ${error.message}`);
    }
  }
}
