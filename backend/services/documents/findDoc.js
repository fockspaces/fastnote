import Document from "../../models/Document.js";
import cache from "../../utils/cache.js";

// @@@ desc fetch doc by id
// @@@ params document_id <Object_id>
// @@@ return document <Object>
export const findDoc = async (document_id) => {
  // Check if the document is in the Redis cache
  const cacheKey = `document:${document_id}`;

  console.time("cacheFetch");
  const cachedDocument = await cache.get(cacheKey);
  console.timeEnd("cacheFetch");

  if (cachedDocument) return cachedDocument;

  console.time("dbFetch");
  const document = await Document.findById(document_id).populate({
    path: "paragraphs",
    options: { sort: { updatedAt: -1 } },
  });
  console.timeEnd("dbFetch");

  if (document) {
    console.time("cacheSet");
    await cache.set(cacheKey, document, "EX", 60);
    console.timeEnd("cacheSet");
  }

  return document;
};

