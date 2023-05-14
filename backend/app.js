import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorHandler from "express-error-handler";
import document from "./routes/document.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import { healthCheck, lambdaHealthCheck } from "./controllers/healthCheck.js";
import { createRateLimiter } from "./middleware/RateLimit.js";
import { connectDB } from "./utils/database.js";
import { corsOptions } from "./configs/Configs.js";
import http from "http";

dotenv.config();
const app = express();
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(createRateLimiter);

// health check
app.get("/api/", healthCheck);
app.get("/api/lambda", lambdaHealthCheck);
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

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
