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

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing) {
      const userIdFromList = toString(listing.seller_Id);
      const useridFromAuthToken = toString(req.user.id);

      if (userIdFromList === useridFromAuthToken) {
        res.json(listing).status(200);
      } else {
        next(401, "Not authorized");
      }
    } else {
      next(404, "No listing");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorhandler(404, "listing Not found"));

  /*************Checking if authenticated user is delting or not****************  */
  const arg1 = toString(listing.seller_Id);
  const arg2 = toString(req.user.id);
  if (arg2 !== arg1) {
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

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorhandler(404, "listing Not found"));

  /*************Checking if authenticated user is updatingk or not****************  */
  const arg1 = toString(listing.seller_Id);
  const arg2 = toString(req.user.id);
  if (arg2 !== arg1) {
    return next(errorhandler(401, `Not authorized to deletion`));
  }

  try {
    const response = await Listing.findByIdAndUpdate(req.params.id, req.body);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllTypes = async () => {
  try {
    // Fetch all distinct type values from the Listing collection
    const types = await Listing.distinct("type");
    return types;
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
};

const getAllColleges = async () => {
  try {
    // Fetch all distinct type values from the Listing collection
    const types = await Listing.distinct("college");
    return types;
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
};

export const getAllTypesFront = async (req, res, next) => {
  try {
    // Fetch all distinct type values from the Listing collection
    const types = await Listing.distinct("type");
    res.status(200).json(types);
  } catch (error) {
    console.error("Error fetching types:", error);
    next(error);
  }
};

export const getListingsWithQuery = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let isNegotiable = req.query.isNegotiable;

    if (isNegotiable === undefined || isNegotiable === "false") {
      isNegotiable = { $in: [false, true] };
    }

    let type = req.query.type;
    console.log(type);

    let isCollegeOnly = req.query.isCollegeOnly;

    if (isCollegeOnly === undefined || "false") {
      const collegeArray = await getAllColleges();
      isCollegeOnly = { $in: collegeArray };
    }

    if (type === undefined || type === "all") {
      try {
        const typesArray = await getAllTypes();
        type = { $in: typesArray }; // Dynamically set type to include all types
      } catch (error) {
        return next(error);
      }
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: "i" },
      isNegotiable,
      type,
      college: isCollegeOnly,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
    
  } catch (error) {
    next(error);
  }
};
