import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String },
  contact_number: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pfp: { type: String },
  listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  purchases: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  college: { type: String },
  city: { type: String },
  state: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
