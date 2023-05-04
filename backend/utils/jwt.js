import jwt from "jsonwebtoken";

export const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const sign = (payload, options) =>
  jwt.sign(payload, process.env.JWT_SECRET, options);
