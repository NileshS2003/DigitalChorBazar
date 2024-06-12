import { Router } from "express";
import { createListing, getAllListings } from "../controller/lisitng.controller.js";

const router = Router();

router.get('/get-all',getAllListings).post('/create',createListing)

export default router;
