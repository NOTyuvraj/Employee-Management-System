import express from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { signin, signup } from "../controllers/userAuth.js";

const router = express.Router();

dotenv.config();

const generateAccesToken = (username) =>{
  return jsonwebtoken.sign(username , process.env.TOKEN_SECRET , {expiresIn : '1000s'});
}

router.post("/register", signup ,async (req, res) => {
  
});

router.post("/login", signin , async(req , res) => {
  
})

export default router;
