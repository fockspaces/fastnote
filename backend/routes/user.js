import express from "express";
import {
  authUserWithGoogle,
  signupAsGuest,
  verifyGoogle,
} from "../middleware/Authentication.js";
import { getAccessToken } from "../controllers/users.js";

const user = express.Router();
user.route("/signin").get(verifyGoogle, getAccessToken);
user.route("/guests").get(signupAsGuest, getAccessToken);
user.route("/auth/google").post(authUserWithGoogle);

export default user;
