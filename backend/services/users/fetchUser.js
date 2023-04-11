import User from "../../models/User.js";

// @desc: check if user in db
// @params: user <Object>
// @return: newUser <Object>
export const fetchUser = async (user) => {
  let getUser = await User.findOne({ email: user.email }).exec();
  if (!getUser) {
    getUser = new User(user);
    await getUser.save();
  }
  return getUser;
};
