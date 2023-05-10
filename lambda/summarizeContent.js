import { checkAPI, updateDocument } from "./updateDocument.js";
import { JSDOM } from "jsdom";
import { fetchGPT } from "./fetchGPT.js";

export async function summarizeContent(
  document_id,
  content,
  tags,
  access_token
) {
  // Define the helper functions
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
    const responseText = choices[0].text.trim();
    if (type === "tags")
      return responseText.split(",").map((tag) => tag.trim());
    if (type === "summary") return responseText;
  };

  // Main Lambda Function Logic
  const plainText = stripHTMLTags(content);
  if (plainText.length < 100) {
    return {
      statusCode: 400,
      body: "Content length is less than 100 characters.",
    };
  }

  const chunks = chunkText(plainText, 2000);
  const summaryPromises = chunks.map(async (chunk) => {
    const prompt = `First, identify the language of the text provided below:
  ${chunk}

  Once you've identified the language, follow these steps to generate a one-sentence summary in the original language:

  1. Carefully read the text, focusing on the main ideas and themes of each restaurant mentioned.
  2. Break down the text into smaller, manageable parts, and analyze each part in detail.
  3. Consider the relevance of each part to the overall context, and identify the key points for each restaurant.
  4. Combine the key points for each restaurant separately, ensuring the information is clear and not mixed.
  5. Create a concise summary that accurately captures the essence of the content, mentioning both restaurants.
  6. Ensure that the summary is grammatically correct, forms a complete sentence, and is in the original language of the text.

  Summary: `;
    const response = await fetchGPT(prompt, access_token);
    const summary = parseGPTResponse(response.choices, "summary");
    return summary;
  });

  const summaries = await Promise.all(summaryPromises);
  const combinedSummary = summaries.join(" ");

  const tagsPrompt = `Based on the given summary and existing tags, generate additional relevant tags:

  Instructions:
  1. Detect the language of the summary.
  2. Identify the main topics, themes, or subjects discussed in the summary. Avoid generating tags that are too specific or detailed.
  3. Review the existing tags: ${tags.join(", ")}
  4. Generate additional tags that align with the themes or topics represented by the existing tags.
  5. Combine similar tags into a single, more general tag when appropriate.
  6. Prioritize the tags based on their relevance to the summary's content.
  7. Ensure that the generated tags are in the same language as the summary.

  Summary: ${combinedSummary}

  Existing Tags: ${tags.join(", ")}

  New Tags:`;

  const tagsResponse = await fetchGPT(tagsPrompt, access_token);

  const finalTags = parseGPTResponse(tagsResponse.choices, "tags");
  // if only one summary, it can be final summary
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
      6. Ensure that the summary is grammatically correct, forms a complete sentence, and is in the original language of the text.

      Summary: `;
    const finalResponse = await fetchGPT(finalPrompt, access_token);
    finalSummary = parseGPTResponse(finalResponse.choices, "summary");
  } else finalSummary = combinedSummary;

  return { combinedSummary, finalTags };
}
