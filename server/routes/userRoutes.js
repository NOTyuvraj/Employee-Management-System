import express from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { signin, signup } from "../controllers/userAuth.js";

const router = express.Router();

dotenv.config();

router.post("/register", signup);

router.post("/login", signin)

export default router;
