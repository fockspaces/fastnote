import AWS from "aws-sdk";

// Configure the AWS SDK with your region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-1",
});

const sqs = new AWS.SQS();

// --------------------------------------------------------------------------
export const sendSummaryJob = async (
  document_id,
  content,
  tags,
  access_token
) => {
  const event = "fetchGPT";
  const params = {
    MessageBody: JSON.stringify({
      document_id,
      content,
      tags,
      access_token,
      event,
    }),
    QueueUrl: process.env.AWS_SQS_URL,
  };
  try {
    const result = await sqs.sendMessage(params).promise();
    console.log("Message sent to SQS:", { result });
  } catch (error) {
    console.error("Error sending message to SQS:", error);
  }
};
