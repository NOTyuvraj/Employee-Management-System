import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

const connectDb = async () =>{
  await mongoose.connect(process.env.LOCAL_URI)
}