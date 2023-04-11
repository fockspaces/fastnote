import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  picture: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
