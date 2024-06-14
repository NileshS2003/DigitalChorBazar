import { Router } from "express";
import {
  createListing,
  getAllListings,
  getUserListings,
} from "../controller/lisitng.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router
  .get("/get-all", getAllListings)
  .post("/create", verifyToken, createListing)
  .get("/:id", getUserListings);

export default router;
