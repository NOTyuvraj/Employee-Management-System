import express from "express";

const router = express.Router();

router.post("/create" , async (req , res) =>{
  const {name , email , password , role} = req.body();
})