import { sign } from "../utils/jwt.js";
import { JWT_options } from "../configs/Configs.js";
import { fetchUser } from "../services/documents/documentUtils.js";

export const getAccessToken = async (req, res) => {
  const user = req.user;
  const access_token = sign(user, JWT_options);
  return res.status(200).json({ access_token, user });
};
