import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorHandler from "express-error-handler";
import { verifyUser } from "./middleware/Authentication.js";
import { fetchGPT } from "./utils/fetchGPT.js";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();

// Rate limiter configuration
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use(cors());
app.use(express.json());
app.use(verifyUser);

app.post("/api/summary", rateLimiter, async (req, res) => {
  const { prompt } = req.body;
  const data = await fetchGPT(prompt);
  return res.status(200).json({ data });
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
