import { PAGE_LIMIT } from "../../configs/Configs.js";
import Document from "../../models/Document.js";
import Paragraph from "../../models/Paragraph.js";
import { escapeRegExp } from "../../utils/regexEscape.js";

export const findDocs = async (query, keyword, paging) => {
  const limit = paging ? PAGE_LIMIT : 500;

  if (keyword) {
    const keywordQuery = await addKeywordQuery(keyword);
    query = { ...query, ...keywordQuery };
  }

  const documents = await Document.find(query)
    .sort({ createdAt: -1 })
    .skip(paging ? parseInt(paging) * limit : 0)
    .limit(limit);
  return documents;
};

// convert keword into query format
const addKeywordQuery = async (keyword) => {
  const escapedKeyword = escapeRegExp(keyword);
  const keywordRegex = new RegExp(escapedKeyword, "i");

  // Find paragraph IDs with matching content
  const matchingParagraphs = await Paragraph.find({
    content: { $regex: keywordRegex },
  });

  const matchingParagraphIds = matchingParagraphs.map((p) => p._id);
  return {
    $or: [
      { title: { $regex: keywordRegex } },
      { paragraphs: { $in: matchingParagraphIds } },
    ],
  };
};
