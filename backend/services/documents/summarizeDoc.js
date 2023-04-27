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

const extractContent = (document) => {
  // find updated paragraphs
  const updatedParagraphs = document.paragraphs.filter(
    (paragraph) => paragraph.isUpdated
  );
  return updatedParagraphs
    .map((paragraph) => stripHTMLTags(paragraph.content))
    .join(" ");
};

export const summarizeDoc = async (document_id) => {
  console.time("summary");
  const document = await findDoc(document_id);
  const plainText = extractContent(document);
  if (plainText.length < 100) return;

  // Detect the original language
  let lang = franc(plainText);
  console.log({ lang, plainText });
  if (lang === "cmn") lang = "Traditional Chinese";
  // console.log({ lang });

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
  let combinedSummary = summaries.join(" ");
  const tagsPrompt = `Please provide topic tags for the following summary:

  ${combinedSummary}
  
  Once you've read the summary, follow these steps to generate topic tags:
  1. Identify the main ideas, themes, and key points in the summary.
  2. Consider the relevance of each idea, theme, or key point to the overall context.
  3. Create a list of topic tags that accurately represent the main ideas and themes.
  4. Ensure that the topic tags are separated by commas.
  
  Example format: Tag1, Tag2, Tag3
  
  Tags: `;
  const tagsResponse = await fetchGPT(tagsPrompt);

  const finalTags = parseGPTResponse(tagsResponse.choices, "tags");
  console.log({ finalTags });
  return;

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

  console.log({ combinedSummary });
  let finalSummary = parseGPTResponse(finalResponse.choices, "summary");
  console.log({ finalSummary });

  // Translate the finalSummary back to the original language if it's not English
  // if (lang !== "eng") {
  //   const wordCount = finalSummary.split(" ").length;

  //   const preserveTerms = generatePreserveTerms(finalTags);
  //   const translationPrompt = `Translate the following text from English to ${lang}:\n\n${finalSummary}\n\n${preserveTerms}\n\nTranslation: `;
  //   const translationResponse = await fetchGPT(translationPrompt);
  //   finalSummary = parseGPTResponse(translationResponse.choices, "summary");
  // }

  // console.log({ finalSummary });

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
