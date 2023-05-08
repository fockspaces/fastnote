import { deleteMessageFromSQS, sendToSQS } from "./sendToSQS.js";
import { summarizeContent } from "./summarizeContent.js";
import { checkAPI, updateDocument } from "./updateDocument.js";

export async function handler(event) {
  // Get the first record from the event object
  const record = event.Records[0];

  // Parse the message body (assuming it's a JSON string)
  const message = JSON.parse(record.body);

  // (monitor) check event from express server
  const data = await checkAPI(message.event);
  console.log(`message: ${JSON.stringify(data)}`);

  let result;

  // go to fetchGPT and store the result back to SQS
  if (message.event === "fetchGPT") {
    const { document_id, content, access_token } = message;
    result = await summarizeContent(document_id, content, access_token);
    const { combinedSummary, finalTags } = result;
    const newMessage = {
      event: "updateServer",
      document_id: document_id,
      combinedSummary: combinedSummary,
      finalTags: finalTags,
      access_token: access_token,
    };
    await sendToSQS(newMessage);
  }

  if (message.event === "updateServer") {
    const { document_id, combinedSummary, finalTags, access_token } = message;
    // Update the document's description and tags in the database
    result = await updateDocument(
      document_id,
      { description: combinedSummary, tags: finalTags },
      access_token
    );
  }

  // Delete the message from SQS
  await deleteMessageFromSQS(record.receiptHandle);
  console.log(`message ${message.event} is deleted`);

  return result;
}
