import AWS from 'aws-sdk'

// Configure the AWS SDK with your region
AWS.config.update({ region: "ap-northeast-1" });

const sqs = new AWS.SQS();

export const sendSummaryJob = async (document_id, content, access_token) => {
  const params = {
    MessageBody: JSON.stringify({ document_id, content, access_token }),
    QueueUrl: process.env.AWS_SQS_URL, // Replace with your SQS Queue URL
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log("Message sent to SQS:", result);
  } catch (error) {
    console.error("Error sending message to SQS:", error);
  }
};
