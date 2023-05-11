import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "express-error-handler";
import document from "./routes/document.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import { healthCheck } from "./controllers/healthCheck.js";
import { createRateLimiter } from "./middleware/RateLimit.js";

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
app.use(createRateLimiter);

// health check
app.get("/api/", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

app.get("/api/lambda", healthCheck);
app.use("/api/documents", document);
app.use("/api/users", user);
app.use("/api/images", image);

// error hanlding
app.use(
  errorHandler({
    accepts: "json",
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
