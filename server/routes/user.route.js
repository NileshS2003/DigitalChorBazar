import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controller/user.controller.js";

const router = Router()

router.patch('/update/:id',verifyToken,updateUser)

export default router