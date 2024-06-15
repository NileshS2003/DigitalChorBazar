import { Router } from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListing,
  getUserListings,
  updateListing,
} from "../controller/lisitng.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router
  .delete("/:id", verifyToken, deleteListing)
  .get("/:id", verifyToken, getListing)
  .get("/get-all", getAllListings)
  .get("/user/:id", verifyToken, getUserListings)
  .post("/create", verifyToken, createListing)
  .patch("/update/:id", verifyToken, updateListing);

export default router;
