import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "express-error-handler";
import { verifyUser } from "./middleware/Authentication.js";

dotenv.config();
const app = express();
// connect to db
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(verifyUser);

app.get("/api/summary", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

// error hanlding
app.use(
  errorHandler({
    accepts: "json",
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`GPT Server listening on port ${PORT}`);
});
