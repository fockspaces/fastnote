import { sign } from "../utils/jwt.js";
import { JWT_options } from "../configs/Configs.js";
import { fetchUser } from "../services/users/fetchUser.js";

export const getAccessToken = async (req, res) => {
  const user = await fetchUser(req.user);
  const access_token = sign(user.toObject(), JWT_options);
  return res.status(200).json({ access_token, user });
};
