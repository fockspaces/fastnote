import User from "../../models/User.js";
import cache from "../../utils/cache.js";

// @desc: check if user in db
// @params: user <Object>
// @return: newUser <Object>
export const fetchUser = async (user) => {
  const cacheKey = `user:${user.email}`;
  const cachedUser = await cache.get(cacheKey);
  if (cachedUser) {
    console.log({ message: "hit", cachedUser });
    return new User(cachedUser);
  }

  let getUser = await User.findOne({ email: user.email }).exec();
  if (!getUser) {
    getUser = new User(user);
    await getUser.save();
  }
  await cache.set(cacheKey, getUser, "EX", 60);

  return getUser;
};
