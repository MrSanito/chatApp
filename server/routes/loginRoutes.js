import express from "express";
import { loginUser } from "../controller/Login.js";
import { requireAuth } from "../middleware/auth.js";
 import { verifyToken } from "../controller/Login.js";
const router = express.Router();

router.post("/", loginUser);
router.get("/verify", requireAuth, verifyToken);

export default router;
