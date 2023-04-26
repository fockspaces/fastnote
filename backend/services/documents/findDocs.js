import { PAGE_LIMIT } from "../../configs/Configs.js";
import Document from "../../models/Document.js";
import Paragraph from "../../models/Paragraph.js";
import { escapeRegExp } from "../../utils/regexEscape.js";
import cache from "../../utils/cache.js";

const baseCases = (is_favorite, is_trash) => {
  if (is_trash) return "trash";
  if (is_favorite) return "favorite";
  return "default";
};

export const findDocs = async ({
  paging = 0,
  tagging = [],
  is_favorite,
  is_trash,
  keyword,
  userId,
}) => {
  // if default case, cache it
  const shouldCache = !(keyword || tagging.length || paging > 0);
  const cacheKey = `documents:${userId}:${baseCases(is_favorite, is_trash)}`;

  if (shouldCache) {
    const cachedDocuments = await cache.get(cacheKey);
    if (cachedDocuments) return cachedDocuments;
  }

  // preparing query parameters
  let query = { userId };
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

  const documents = await Document.find(query)
    .sort({ createdAt: -1 })
    .skip(paging ? parseInt(paging) * limit : 0)
    .limit(limit);

  if (shouldCache) {
    await cache.set(cacheKey, documents, { EX: 86400 });
  }

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
