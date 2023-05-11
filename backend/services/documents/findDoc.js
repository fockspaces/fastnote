import Document from "../../models/Document.js";
import cache from "../../utils/cache.js";

// @@@ desc fetch doc by id
// @@@ params document_id <Object_id>
// @@@ return document <Object>
export const findDoc = async (document_id, useCache) => {
  const cacheKey = `document:${document_id}:userId`;

  if (useCache) {
    const cachedDocument = await getDocumentFromCache(cacheKey);
    if (cachedDocument) {
      return cachedDocument;
    }
  }

  const document = await getDocumentFromDB(document_id, cacheKey);
  return document;
};

const getDocumentFromCache = async (cacheKey) => {
  const cachedUserId = await cache.get(cacheKey);
  return cachedUserId ? { userId: cachedUserId } : null;
};

const getDocumentFromDB = async (document_id, cacheKey) => {
  const document = await Document.findById(document_id).populate({
    path: "paragraphs",
    options: { sort: { updatedAt: -1 } },
  });

  if (document) {
    await cache.set(cacheKey, document.userId, { EX: 86400 });
  }

  return document;
};
