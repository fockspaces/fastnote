import { JSDOM } from "jsdom";
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

  const chunks = chunkText(plainText, 2048);
  console.log({ chunks });
  let combinedSummary = "";

  for (const chunk of chunks) {
    const prompt = `Please provide a summary for the following text:\n\n${chunk}\n\nSummary: `;
    const response = await fetchGPT(prompt);
    const summary = parseGPTResponse(response.choices, "summary");

    combinedSummary += summary + " ";
  }
  console.log({ combinedSummary });

  const tagsPrompt = `Please provide topic tags for the following summary:\n\n${combinedSummary}\n\nTags: `;
  const tagsResponse = await fetchGPT(tagsPrompt);

  const finalTags = parseGPTResponse(tagsResponse.choices, "tags");
  console.log({ finalTags });

  const finalPrompt = `Please provide a summary for the following text:\n\n${combinedSummary}\n\nSummary: `;
  const finalResponse = await fetchGPT(finalPrompt);

  const finalSummary = parseGPTResponse(finalResponse.choices, "summary");
  console.log({ finalSummary });

  // You can update the document's description and tags with the overallSummary and overallTags here.
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
