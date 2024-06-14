import { Router } from "express";
import { createListing, getAllListings } from "../controller/lisitng.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get('/get-all',getAllListings).post('/create',verifyToken,createListing)

export default router;
 