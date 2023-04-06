import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "express-error-handler";
import document from "./routes/document.js";
import paragraph from "./routes/paragraph.js";
import user from "./routes/user.js";

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

app.use("/api/documents", document);
app.use("/api/paragraphs", paragraph);
app.use("/api/users", user);

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
