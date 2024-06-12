import Listing from "../model/Listing.model.js";
import User from "../model/User.model.js";

export const getAllListings = async (req, res) => {
  try {
    const doc = await Listing.find({});
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
  }
};

export const createListing = async (req, res, next) => {
  try {
    // Create the new listing
    const listing = await Listing.create(req.body);

    // Find the user by ID
    const user = await User.findById(req.body.seller_Id);

    // Add the new listing's ID to the user's listings array
    user.listings.push(listing.id);

    // Save the updated user document
    await user.save();

    // Return the created listing
    return res.status(201).json(listing);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
