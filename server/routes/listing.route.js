import { Router } from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getUserListings,
} from "../controller/lisitng.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router
  .delete("/:id", verifyToken, deleteListing)
  .get("/get-all", getAllListings)
  .get("/:id", verifyToken, getUserListings)
  .post("/create", verifyToken, createListing);

export default router;
