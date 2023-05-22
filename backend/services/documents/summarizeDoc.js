import { JSDOM } from "jsdom";
import { findDoc } from "./findDoc.js";
import Paragraph from "../../models/Paragraph.js";
import { sendSummaryJob } from "./sendSummaryJob.js";

// --------------------------------------------------------------------------
export const summarizeDoc = async (document_id, access_token) => {
  try {
    const document = await findDoc(document_id);
    // preparing parameters
    const updatedParagraphs = document.paragraphs.filter(
      (paragraph) => paragraph.isUpdated
    );
    const content = updatedParagraphs
      .map((paragraph) => stripHTMLTags(paragraph.content))
      .join(" ");
      
    const tags = document.tags;

    // store job {document_id, content, access_token} into SQS
    await sendSummaryJob(document_id, content, tags, access_token);

    // Update the isUpdated field of the updatedParagraphs to false
    await updateParagraphsIsUpdated(updatedParagraphs, false);

    return true;
  } catch (e) {
    console.error("Error in summarizeDoc:", error);
    return false;
  }
};

// --------------------------------------------------------------------------
const updateParagraphsIsUpdated = async (updatedParagraphs, isUpdated) => {
  const updatedParagraphIds = updatedParagraphs.map(
    (paragraph) => paragraph._id
  );
  await Paragraph.updateMany(
    { _id: { $in: updatedParagraphIds } },
    { $set: { isUpdated: isUpdated } }
  );
};

// --------------------------------------------------------------------------
export const stripHTMLTags = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent;
};
