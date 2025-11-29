import express from "express";
import { setName } from "../controller/Name.js";
const router = express.Router()

router.post("/", setName);

export default router;