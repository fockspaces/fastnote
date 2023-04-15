export const tagsHelper = (tags) => {
  const tagging = tags.join(",");
  return `&tagging=${tagging}`;
};

export const getAllTags = (documents) => {
  if (!documents) return [];
  const tags = new Set();
  documents.forEach((document) => {
    if (document.tags && document.tags.length > 0) {
      document.tags.forEach((tag) => {
        tags.add(tag);
      });
    }
  });
  return Array.from(tags);
};
