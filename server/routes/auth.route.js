import { Router } from "express";
import { signin, signup } from "../controller/auth.controller.js";

const router = Router();

router.post("/sign-up", signup).post("/sign-in", signin);

export default router;
