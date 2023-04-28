import { JSDOM } from "jsdom";
import { franc } from "franc";
import { fetchGPT } from "../../utils/fetchGPT.js";
import { findDoc } from "./findDoc.js";
import { updateDoc } from "./updateDoc.js";
import Paragraph from "../../models/Paragraph.js";
import { sendSummaryJob } from "./sendSummaryJob.js";

const stripHTMLTags = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent;
};

const chunkText = (text, maxLength) => {
  const words = text.split(" ");
  const chunks = [];

  let currentChunk = "";
  for (const word of words) {
    if ((currentChunk + word).length > maxLength) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += word + " ";
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};

export const summarizeDoc = async (document_id, access_token) => {
  const document = await findDoc(document_id);

  // preparing parameters
  const updatedParagraphs = document.paragraphs.filter(
    (paragraph) => paragraph.isUpdated
  );
  const content = updatedParagraphs
    .map((paragraph) => stripHTMLTags(paragraph.content))
    .join(" ");
  if (content.length < 100) return;

  // todo : call the api gateway to store job {document_id, content, access_token} into SQS
  await sendSummaryJob(document_id, content, access_token);

  // Update the isUpdated field of the updatedParagraphs to false
  const updatedParagraphIds = updatedParagraphs.map(
    (paragraph) => paragraph._id
  );
  await updateParagraphsIsUpdated(updatedParagraphIds, false);

  return true;
};

const updateParagraphsIsUpdated = async (paragraphIds, isUpdated) => {
  await Paragraph.updateMany(
    { _id: { $in: paragraphIds } },
    { $set: { isUpdated: isUpdated } }
  );
};
