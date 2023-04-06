import Paragraph from "../../models/Paragraph.js";
import Document from "../../models/Document.js";
import { maxEdits, PAGE_LIMIT } from "../../configs/Configs.js";

export const getDocId = async (paragraph_id) => {
  const paragraph = await Paragraph.findById(paragraph_id);
  if (!paragraph) return { error: "Paragraph not found" };
  const document = await Document.findOne({ paragraphs: paragraph_id });
  if (!document) return { error: "Document not found" };

  return { data: document };
};

export const searchText = async (keyword, paging = 0) => {
  const regex = new RegExp(`.*${keyword}.*`, "i");
  const paragraphs = await Paragraph.aggregate([
    {
      $match: {
        $or: [
          { title: { $regex: regex } },
          { "blocks.content.text": { $regex: regex } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        blocks: "$blocks.content.text",
      },
    },
    { $skip: paging },
    { $limit: PAGE_LIMIT },
  ]);
  if (!paragraphs) return { error: "Paragraph not found" };
  return { data: paragraphs };
};
