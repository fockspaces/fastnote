import { JSDOM } from "jsdom";
import { franc } from "franc";
import { fetchGPT } from "../../utils/fetchGPT.js";
import { findDoc } from "./findDoc.js";
import { updateDoc } from "./updateDoc.js";
import Paragraph from "../../models/Paragraph.js";

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

const parseGPTResponse = (choices, type) => {
  console.log({ choices });
  const responseText = choices[0].text.trim(); // Access the first choice's text.
  if (type === "tags") return responseText.split(",").map((tag) => tag.trim());
  if (type === "summary") return responseText;
};

const generatePreserveTerms = (tags) => {
  if (tags.length === 0) {
    return "";
  }
  return `When translating, please keep the terms ${tags.join(
    ", "
  )} unchanged.`;
};

export const summarizeDoc = async (document_id, options) => {
  console.time("summary");
  // handle the number of tags
  let min_tags = 1,
    max_tags = 5;
  if (options) {
    min_tags = options.min_tags;
    max_tags = options.max_tags;
  }
  if (min_tags > max_tags) return;
  const document = await findDoc(document_id);

  // find updated paragraphs
  const updatedParagraphs = document.paragraphs.filter(
    (paragraph) => paragraph.isUpdated
  );
  const plainText = updatedParagraphs
    .map((paragraph) => stripHTMLTags(paragraph.content))
    .join(" ");
  if (plainText.length < 100) return;

  const chunks = chunkText(plainText, 2048);
  // console.log({ length: chunks.length });
  // Replace the for loop with the following code:
  const summaryPromises = chunks.map(async (chunk) => {
    const prompt = `First, identify the language of the text provided below:
${chunk}

Once you've identified the language, follow these steps to generate a one-sentence summary in the original language:

1. Carefully read the text, focusing on the main ideas and themes of each restaurant mentioned.
2. Break down the text into smaller, manageable parts, and analyze each part in detail.
3. Consider the relevance of each part to the overall context, and identify the key points for each restaurant.
4. Combine the key points for each restaurant separately, ensuring the information is clear and not mixed.
5. Create a concise summary that accurately captures the essence of the content, mentioning both restaurants.
6. Ensure that the summary is in the original language of the text and forms a complete sentence.

Summary: `;

    const response = await fetchGPT(prompt);
    const summary = parseGPTResponse(response.choices, "summary");
    return summary;
  });

  const summaries = await Promise.all(summaryPromises);
  const combinedSummary = summaries.join(" ");

  const tagsPrompt = `Please follow the steps below to generate relevant tags for the given summary:

  1. Detect the language of the summary and generate tags in the original language.
  2. Identify the main topics, themes, or subjects discussed in the summary. Avoid generating tags that are too specific or detailed.
  3. Combine similar tags into a single, more general tag when appropriate.
  4. Prioritize the tags based on their relevance and representation of the summary's content.
  5. Generate tags within the range of ${min_tags} to ${max_tags}, and ensure that the tags are in the same language as the original context.
  
  Summary: ${combinedSummary}
  
  Tags:`;
  const tagsResponse = await fetchGPT(tagsPrompt);

  const finalTags = parseGPTResponse(tagsResponse.choices, "tags");
  console.log({ finalTags });

  let finalSummary;
  if (chunks.length > 1) {
    const finalPrompt = `First, identify the language of the text provided below:
    ${combinedSummary}
    
    Once you've identified the language, follow these steps to generate a one-sentence summary in the original language:
    
    1. Carefully read the text, focusing on the main ideas and themes of each restaurant mentioned.
    2. Break down the text into smaller, manageable parts, and analyze each part in detail.
    3. Consider the relevance of each part to the overall context, and identify the key points for each restaurant.
    4. Combine the key points for each restaurant separately, ensuring the information is clear and not mixed.
    5. Create a concise summary that accurately captures the essence of the content, mentioning both restaurants.
    6. Ensure that the summary is in the original language of the text and forms a complete sentence.
    
    Summary: `;
    const finalResponse = await fetchGPT(finalPrompt);
    finalSummary = parseGPTResponse(finalResponse.choices, "summary");
  } else finalSummary = combinedSummary;

  console.log({ combinedSummary });
  console.log({ finalSummary });

  // You can update the document's description and tags with the finalSummary and finalTags here.
  await updateDoc(
    "update_tagsAndDescription",
    {
      description: finalSummary,
      tags: finalTags,
    },
    document_id
  );

  // Update the isUpdated field of the updatedParagraphs to false
  const updatedParagraphIds = updatedParagraphs.map(
    (paragraph) => paragraph._id
  );
  await updateParagraphsIsUpdated(updatedParagraphIds, false);
  console.timeEnd("summary");

  return true;
};

const updateParagraphsIsUpdated = async (paragraphIds, isUpdated) => {
  await Paragraph.updateMany(
    { _id: { $in: paragraphIds } },
    { $set: { isUpdated: isUpdated } }
  );
};
