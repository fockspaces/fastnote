import express from "express";
import { catchAsync } from "../utils/errorHandling.js";
import { verifyGoogle } from "../middleware/Authentication.js";
import { getAccessToken } from "../controllers/users.js";

const user = express.Router();
user.route("/signin").get(verifyGoogle, getAccessToken);

export default user;
