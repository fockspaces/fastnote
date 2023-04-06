import { getDocId, searchText } from "../services/paragraphs/paragraphUtils.js";

export const getDocumentId = async (req, res) => {
  const { paragraph_id } = req.params;
  const result = await getDocId(paragraph_id);
  if (result.error) return res.status(404).json(result);

  return res.status(200).json(result);
};

export const searchTextInParagraph = async (req, res) => {
  const { keyword, paging } = req.query;
  const result = await searchText(keyword, paging);
  if (result.error) return res.status(404).json(result);

  return res.status(200).json(result);
};
