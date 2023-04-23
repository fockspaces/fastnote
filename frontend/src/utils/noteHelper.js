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
    isUpdated: true,
  };
};
