import express from "express";
import { catchAsync } from "../utils/errorHandling.js";
import { authUserWithGoogle, verifyGoogle } from "../middleware/Authentication.js";
import { getAccessToken } from "../controllers/users.js";

const user = express.Router();
user.route("/signin").get(verifyGoogle, getAccessToken);
user.route('/auth/google').post(authUserWithGoogle)

export default user;
