import { PAGE_LIMIT } from "../../configs/Configs.js";
import Document from "../../models/Document.js";

export const findDocs = async (query, paging) => {
  const documents = await Document.find(query, { paragraphs: 0 })
    .sort({ updatedAt: -1 })
    .skip(paging ? parseInt(paging) * PAGE_LIMIT : 0)
    .limit(PAGE_LIMIT);
  return documents;
};
