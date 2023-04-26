import Document from "../../models/Document.js";
import cache from "../../utils/cache.js";

// @@@ desc fetch doc by id
// @@@ params document_id <Object_id>
// @@@ return document <Object>
export const findDoc = async (document_id, useCache) => {
  // for only userId needed
  const cacheKey = `document:${document_id}:userId`;
  if (useCache) {
    const cachedUserId = await cache.get(cacheKey);
    if (cachedUserId) return { userId: cachedUserId };
  }

  const document = await Document.findById(document_id).populate({
    path: "paragraphs",
    options: { sort: { updatedAt: -1 } },
  });

  if (useCache && document) {
    await cache.set(cacheKey, document.userId, { EX: 86400 });
  }
  
  return document;
};
