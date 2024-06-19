import { Router } from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getAllTypesFront,
  getListing,
  getListingsWithQuery,
  getUserListings,
  updateListing,
} from "../controller/lisitng.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router
  .get("/get", getListingsWithQuery)
  .get("/getTypes", getAllTypesFront)
  .delete("/:id", verifyToken, deleteListing)
  .get("/:id", verifyToken, getListing)
  .get("/", getAllListings)
  .get("/user/:id", verifyToken, getUserListings)
  .post("/create", verifyToken, createListing)
  .patch("/update/:id", verifyToken, updateListing);

export default router;
