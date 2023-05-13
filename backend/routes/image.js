import express from "express";
import { uploadImage } from "../controllers/images.js";
import { verifyUser } from "../middleware/Authentication.js";
import { imageUpload } from "../utils/multer.js";

const image = express.Router();

image.use(verifyUser);

image.route("/").post(verifyUser, imageUpload, uploadImage);

export default image;
