import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "express-error-handler";
import document from "./routes/document.js";
import user from "./routes/user.js";
import image from "./routes/image.js";

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

// health check
app.get("/api/", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

// lambda testing
app.get("/api/lambda", (req, res) => {
  const { message } = req.query;
  // Get the IP address from the request
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Log the IP address and a custom message
  console.log(`lambda Check OK - IP: ${ip}, message: ${message}`);
  return res.status(200).json({ message });
});

app.get("/api/test", (req, res) => {});

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
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
