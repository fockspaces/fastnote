import express from "express";
import {
  getDocumentId,
  searchTextInParagraph,
} from "../controllers/paragraphs.js";
import { verifyUser } from "../middleware/Authentication.js";
import { catchAsync } from "../utils/errorHandling.js";

const paragraph = express.Router();

paragraph.use(verifyUser);
paragraph.route("/search").get(catchAsync(searchTextInParagraph));
paragraph.route("/:paragraph_id").get(catchAsync(getDocumentId));

export default paragraph;
