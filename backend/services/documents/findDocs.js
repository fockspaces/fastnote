import { PAGE_LIMIT } from "../../configs/Configs.js";
import Document from "../../models/Document.js";
import Paragraph from "../../models/Paragraph.js";
import { escapeRegExp } from "../../utils/regexEscape.js";
import cache from "../../utils/cache.js";

// todo : adding cache into this
export const findDocs = async ({
  paging,
  tagging = [],
  is_favorite,
  is_trash,
  keyword,
  userId,
}) => {
  // cache
  const cacheKey = `documents:${userId}:${paging}:${tagging}:${is_favorite}:${is_trash}:${keyword}`;
  
  console.time("Cache fetch");
  const cachedDocuments = await cache.get(cacheKey);
  console.timeEnd("Cache fetch");

  if (cachedDocuments) return cachedDocuments;

  // preparing query parameters
  const query = { userId };
  if (typeof tagging === "string" && tagging.length)
    query.tags = {
      $all: tagging
        .split(",")
        .map((tag) => new RegExp(`^${escapeRegExp(tag.trim())}$`, "i")),
    };
  if (is_favorite) query.is_favorite = is_favorite;
  if (is_trash) query.is_trash = is_trash;

  const limit = paging ? PAGE_LIMIT : 500;

  if (keyword) {
    const keywordQuery = await addKeywordQuery(keyword);
    query = { ...query, ...keywordQuery };
  }

  console.time("Database fetch");
  const documents = await Document.find(query)
    .sort({ createdAt: -1 })
    .skip(paging ? parseInt(paging) * limit : 0)
    .limit(limit);
  console.timeEnd("Database fetch");

  console.time("Cache set");
  await cache.set(cacheKey, documents, "EX", 60);
  console.timeEnd("Cache set");

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
