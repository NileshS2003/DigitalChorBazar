import mongoose, { Schema } from "mongoose";

// Define the User schema
const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    photos: { type: [String], required: true },
    used_time: { type: String, required: true },
    isNegotiable: { type: Boolean, required: true },
    seller_Id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sold: { type: Boolean, default: false },
    college: { type: String, default: false },
  },
  { timestamps: true }
);

// Create and export the User model
const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
