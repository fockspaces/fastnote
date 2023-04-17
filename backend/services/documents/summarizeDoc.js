import { JSDOM } from "jsdom";
import { franc } from "franc";
import { fetchGPT } from "../../utils/fetchGPT.js";
import { findDoc } from "./findDoc.js";
import { updateDoc } from "./updateDoc.js";

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
  const responseText = choices[0].text.trim(); // Access the first choice's text.
  if (type === "tags") return responseText.split(",").map((tag) => tag.trim());
  if (type === "summary") return responseText;
};

export const summarizeDoc = async (document_id) => {
  const document = await findDoc(document_id);

  const plainText = document.paragraphs
    .map((paragraph) => stripHTMLTags(paragraph.content))
    .join(" ");

  // Detect the original language
  let lang = franc(plainText);
  if (lang === "cmn") lang = "Traditional Chinese";

  const chunks = chunkText(plainText, 2048);
  let combinedSummary = "";

  for (const chunk of chunks) {
    const prompt = `Please provide a summary for the following text:\n\n${chunk}\n\nSummary: `;
    const response = await fetchGPT(prompt);
    const summary = parseGPTResponse(response.choices, "summary");

    combinedSummary += summary + " ";
  }

  const tagsPrompt = `Please provide topic tags for the following summary:\n\n${combinedSummary}\n\nExample format: Tag1, Tag2, Tag3\n\nTags: `;
  const tagsResponse = await fetchGPT(tagsPrompt);

  const finalTags = parseGPTResponse(tagsResponse.choices, "tags");

  const finalPrompt = `Please provide a summary for the following text:\n\n${combinedSummary}\n\nSummary: `;
  const finalResponse = await fetchGPT(finalPrompt, 100);

  let finalSummary = parseGPTResponse(finalResponse.choices, "summary");
  console.log({ finalSummary });
  // Translate the finalSummary back to the original language if it's not English
  if (lang !== "eng") {
    const translationPrompt = `Translate the following text from English to ${lang}:\n\n${finalSummary}\n\nTranslation: `;
    const translationResponse = await fetchGPT(translationPrompt, 100);
    finalSummary = parseGPTResponse(translationResponse.choices, "summary");
  }
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

  return true;
};
