import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const verify = (token) => jwt.verify(token, JWT_SECRET);

export const sign = (payload, options) =>
  jwt.sign(payload, JWT_SECRET, options);
