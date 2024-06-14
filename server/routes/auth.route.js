import { Router } from "express";
import {
  fetchUserbyCookie,
  google,
  signOut,
  signin,
  signup,
} from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router
  .post("/sign-up", signup)
  .post("/sign-in", signin)
  .post("/google", google)
  .get("/me", verifyToken, fetchUserbyCookie)
  .get('/signout',verifyToken, signOut)

export default router;
