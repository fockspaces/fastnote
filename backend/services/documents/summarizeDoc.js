import { fetchGPT } from "../api/fetchGPT";

const extractTitle = (content) => {
  // Extract the title from the content
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(content, "text/html");
  const titleElement = htmlDoc.querySelector("body > *");
  return titleElement ? titleElement.textContent.trim() : "";
};

export const updateNote = (selectedNote, content) => {
  const title = extractTitle(content);
  return {
    ...selectedNote,
    content,
    title,
  };
};

export const generateTags = async (notes) => {
  const tags = [];
  const prompts = extractPrompt(notes);
  for (let i = 0; i < prompts.length; i++) {
    const result = await fetchGPT(prompts[i]);
    tags.push(...result);
  }
  return tags;
};

const extractPrompt = (notes) => {
  let concatText = "";
  notes.forEach((note) => (concatText += extractTextFromHtml(note.content)));
  return promptSpliter(concatText);
};

const extractTextFromHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  return (div.textContent || div.innerText || "") + " ";
};

const promptSpliter = (content) => {
  // Split the concatenated text into an array of prompts
  const maxPromptLength = 2000; // Maximum length for each prompt
  const contentPrompts = [];
  let prompt = "";
  content.split(" ").forEach((word) => {
    if (prompt.length + word.length + 1 <= maxPromptLength) {
      prompt += word + " ";
    } else {
      contentPrompts.push(prompt.trim());
      prompt = word + " ";
    }
  });
  if (prompt.length > 0) {
    contentPrompts.push(prompt.trim());
  }

  return contentPrompts;
};
