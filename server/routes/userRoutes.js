import express from "express";
import userModel from "../models/userModel";

const router = express.Router();

router.post('/' , async (req , res)=>{
  try{
    const user = new userModel(req.body);
    await user.save();
    res.json(user);
  }catch(err){
    res.json({error : err.message});
  }
})


export default router;