import { isObjectId } from "../utils/inputValidation.js";

// Middleware to validate ObjectId
export const validateObjectId = (req, res, next) => {
  const { document_id } = req.params;
  if (!isObjectId(document_id)) {
    return res.status(400).json({ error: "Invalid document ID" });
  }

  next();
};
