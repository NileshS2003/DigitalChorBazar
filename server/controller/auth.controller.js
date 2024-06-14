// Import necessary modules
import User from "../model/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorhandler } from "../utils/error.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const signup = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;

    // Check if the user already exists

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    // res.json(existingUser)
    if (existingUser) {
      return next(errorhandler(409, "user exist"));
    }

    // Generate a salt (10 rounds) and hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    try {
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      const { password, ...userWithoutPassword } = savedUser._doc;

      // Send the token and user details as the response
      res.cookie("access_token", token).status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorhandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorhandler(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    // 1. Extract Data (consider validation):
    const { email, username } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing required field: email" });
    }

    // 2. Check Existing User:
    const alreadyUser = await User.findOne({ email });

    // 3. Existing User Handling:
    if (alreadyUser) {
      const token = jwt.sign({ id: alreadyUser._id }, process.env.JWT_SECRET);
      const { password: _, ...rest } = alreadyUser._doc; // Exclude password

      console.log(rest);

      return res.cookie("access_token", token).status(200).json(rest);
    }

    // 4. New User Creation (improved username generation):
    const salt = await bcryptjs.genSalt(10);
    const generatePassword = () => Math.random().toString(36).slice(-12); // 12 characters
    const hashedPass = bcryptjs.hashSync(generatePassword(), salt);

    const newUser = new User({
      username: username
        ? username.trim().toLowerCase()
        : email.split("@")[0].toLowerCase(), // Use first part of email if no username provided
      email,
      password: hashedPass,
    });

    // 5. Save User and Generate Token:
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    const { password: __, ...userResponse } = savedUser._doc; // Exclude password

    // 6. Successful Response:
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(201) // Created status code for new users
      .json(userResponse);
  } catch (error) {
    console.error(error); // Log error for debugging
    next(error); // Pass error to next middleware for handling
  }
};
 
export const fetchUserbyCookie = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error",error });
  }
};

export const signOut= async (req,res)=>{
  res.clearCookie('access_token'); 
  res.status(200).json({ message: 'Logout successful' });
} 