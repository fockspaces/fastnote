import { CACHE_EXPIRATION_TIME, PAGE_LIMIT } from "../../configs/Configs.js";
import Document from "../../models/Document.js";
import cache from "../../utils/cache.js";
import mongoose from "mongoose";

// --------------------------------------------------------------------------
export const findDocs = async ({
  paging = 0,
  tagging = [],
  is_favorite,
  is_trash,
  keyword,
  userId,
}) => {
  const shouldCache = !(keyword || tagging.length || paging > 0);
  const cacheKey = `documents:${userId}:${baseCases(is_favorite, is_trash)}`;

  if (shouldCache) {
    const cachedDocuments = await cache.get(cacheKey);
    if (cachedDocuments) return cachedDocuments;
  }

  const limit = paging ? PAGE_LIMIT : 500;

  const query = buildQuery({ userId, is_favorite, is_trash, tagging });
  const searchPipeline = buildSearchPipeline(keyword);
  const basePipeline = buildBasePipeline({ query, paging, limit });

  const documents = await Document.aggregate([
    ...searchPipeline,
    ...basePipeline,
  ]);

  if (shouldCache) {
    await cache.set(cacheKey, documents, { EX: CACHE_EXPIRATION_TIME });
  }

  return documents;
};

// --------------------------------------------------------------------------
const baseCases = (is_favorite, is_trash) => {
  if (is_trash === "true") return "trash";
  if (is_favorite === "true") return "favorite";
  return "default";
};

// --------------------------------------------------------------------------
const buildQuery = ({ userId, is_favorite, is_trash, tagging }) => {
  const query = {};
  if (userId) query.userId = new mongoose.Types.ObjectId(userId);
  if (is_favorite) query.is_favorite = is_favorite === "true";
  if (is_trash) query.is_trash = is_trash === "true";
  if (tagging.length)
    query.tags = { $in: tagging.split(",").map((tag) => tag.trim()) };

  return query;
};

// --------------------------------------------------------------------------
const buildSearchPipeline = (keyword) => {
  if (!keyword) return [];

  return [
    // documents search
    {
      $search: {
        index: "default",
        compound: {
          should: [
            {
              text: {
                query: keyword,
                path: "description",
              },
            },
            {
              autocomplete: {
                query: keyword,
                path: "tags",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        $or: [
          {
            description: {
              $regex: `.*${keyword}.*`,
              $options: "i",
            },
          },
          {
            tags: keyword,
          },
        ],
      },
    },
    // paragraphs search
    {
      $unionWith: {
        coll: "paragraphs",
        pipeline: [
          {
            $search: {
              index: "token",
              autocomplete: {
                path: "plainText",
                query: keyword,
              },
            },
          },
          {
            $match: {
              plainText: {
                $regex: `.*${keyword}.*`,
                $options: "i",
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
};

// --------------------------------------------------------------------------
const buildBasePipeline = ({ query, paging, limit }) => {
  return [
    { $match: { ...query } },
    { $sort: { updatedAt: -1 } },
    { $skip: paging ? parseInt(paging) * limit : 0 },
    { $limit: limit },
    {
      $lookup: {
        from: "paragraphs",
        localField: "paragraphs",
        foreignField: "_id",
        as: "paragraphs",
      },
    },
    {
      $project: {
        "paragraphs.content": 0,
      },
    },
  ];
};
