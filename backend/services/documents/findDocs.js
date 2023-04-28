import { PAGE_LIMIT } from "../../configs/Configs.js";
import Document from "../../models/Document.js";
import Paragraph from "../../models/Paragraph.js";
import cache from "../../utils/cache.js";
import mongoose from "mongoose";

const baseCases = (is_favorite, is_trash) => {
  if (is_trash === "true") return "trash";
  if (is_favorite === "true") return "favorite";
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
  const shouldCache = !(keyword || tagging.length || paging > 0);
  console.log({ keyword, tagging, paging, shouldCache });
  const cacheKey = `documents:${userId}:${baseCases(is_favorite, is_trash)}`;
  if (shouldCache) {
    const cachedDocuments = await cache.get(cacheKey);
    if (cachedDocuments) return cachedDocuments;
  }

  const limit = paging ? PAGE_LIMIT : 500;

  let pipeline = [];

  const tagsArray =
    typeof tagging === "string"
      ? tagging.split(",").map((tag) => tag.trim())
      : [];

  const userIdObj = new mongoose.Types.ObjectId(userId);
  const query = {
    userId: userIdObj,
    ...(is_favorite !== undefined && { is_favorite: is_favorite === "true" }),
    ...(is_trash !== undefined && { is_trash: is_trash === "true" }),
    ...(tagging.length > 0 && { tags: { $in: tagsArray } }),
  };

  if (keyword) {
    pipeline = [
      // documents search
      {
        $search: {
          index: "default",
          text: {
            query: keyword,
            path: { wildcard: "*" },
          },
        },
      },
      // paragraphs search
      {
        $unionWith: {
          coll: "paragraphs",
          pipeline: [
            {
              $search: {
                index: "paragraphs",
                text: {
                  query: keyword,
                  path: "content",
                },
              },
            },
            {
              $lookup: {
                from: "documents",
                localField: "document_id",
                foreignField: "_id",
                as: "document",
              },
            },
            {
              $unwind: "$document",
            },
            {
              $replaceRoot: {
                newRoot: "$document",
              },
            },
          ],
        },
      },
      // Group by _id and remove duplicates
      {
        $group: {
          _id: "$_id",
          document: {
            $first: "$$ROOT",
          },
        },
      },
      // Replace the root with the document object
      {
        $replaceRoot: {
          newRoot: "$document",
        },
      },
    ];
  }

  pipeline.push(
    { $match: { ...query } },
    { $sort: { createdAt: -1 } },
    { $skip: paging ? parseInt(paging) * limit : 0 },
    { $limit: limit }
  );

  const documents = await Document.aggregate(pipeline);

  if (shouldCache) {
    await cache.set(cacheKey, documents, { EX: 86400 });
  }

  return documents;
};
