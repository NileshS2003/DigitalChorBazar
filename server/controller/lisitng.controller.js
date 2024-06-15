import Listing from "../model/Listing.model.js";
import User from "../model/User.model.js";
import { errorhandler } from "../utils/error.js";

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

export const getUserListings = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const listings = await Listing.find({ seller_Id: req.user.id });
      res.json(listings).status(200);
    } catch (error) {
      next(error);
    }
  } else {
    next(401, "Cannot get your listings");
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorhandler(404, "listing Not found"));

  /*************Checking if authenticated user is delting or not****************  */
  const check1 = toString(listing.seller_Id);
  const check2 = toString(req.user.id);
  if (check2 !== check1) {
    return next(errorhandler(401, `Not authorized to deletion`));
  }

  try {
    const response = await Listing.findByIdAndDelete(req.params.id);
    console.log(response);
    res.status(200).json("Succesful deletion");
  } catch (error) {
    next(error);
  }
};
