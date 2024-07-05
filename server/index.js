import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const corsConfig={
  origin:'*',
  credentials:true,
  methods:["GET","PUT","PATCH","DELETE","POST","OPTIONS"]
}

app.options("", cors(corsConfig))

app.use(
  session({
    secret: process.env.JWT_SECRET, // Change this to a random string (used for session encryption)
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Session expires in 7 day (adjust as needed) Thala for a reason
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Helps prevent XSS attacks
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/user", userRouter);

/* To send brower defined errors  */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("server connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Views: ${req.session.views}`);
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
