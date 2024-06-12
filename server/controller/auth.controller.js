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

// export const signup = asyncHandler(async (req, res) => {
//   const { email, username, password } = req.body;

//   const existedUser = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (existedUser) {
//     throw new ApiError(409, "User with email or username already exists", []);
//   }
//   const user = await User.create({
//     email,
//     password,
//     username
//   });

//   /**
//    * unHashedToken: unHashed token is something we will send to the user's mail
//    * hashedToken: we will keep record of hashedToken to validate the unHashedToken in verify email controller
//    * tokenExpiry: Expiry to be checked before validating the incoming token
//    */
//   const { unHashedToken, hashedToken, tokenExpiry } =
//     user.generateTemporaryToken();

//   /**
//    * assign hashedToken and tokenExpiry in DB till user clicks on email verification link
//    * The email verification is handled by {@link verifyEmail}
//    */
//   user.emailVerificationToken = hashedToken;
//   user.emailVerificationExpiry = tokenExpiry;
//   await user.save({ validateBeforeSave: false });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
//   );

//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering the user");
//   }

//   return res
//     .status(201)
//     .json(
//       new ApiResponse(
//         200,
//         { user: createdUser },
//         "Users registered successfully and verification email has been sent on your email."
//       )
//     );
// });

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

// export const google = async (req, res, next) => {
//   const { email, username, photo } = req.body;
//   try {
//     const alreadyUser = await User.findOne({ email });
//     if (alreadyUser) {
//       const token = jwt.sign({ id: alreadyUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = alreadyUser._doc;

//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const genreatepassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const salt = await bcryptjs.genSalt(10);
//       const hashedPass = bcryptjs.hashSync(genreatepassword, salt); // hash password
//       const newUser = new User({
//         name: username,
//         username:
//           username.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email,
//         password: hashedPass,
//         avatar: photo,
//       });
//       // console.log(doc);
//       // console.log(doc)
//       const doc = await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = newUser._doc;

//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
