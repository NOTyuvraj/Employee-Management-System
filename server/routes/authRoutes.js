import express from "express";
import { signin, signup } from "../controllers/userAuth.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);

export default router;
