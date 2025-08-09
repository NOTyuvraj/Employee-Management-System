import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import recordRoutes from "./routes/recordRoutes.js";

dotenv.config({path : "./config.env"});

const app = express();
const PORT = process.env.PORT || 5050;

const connectDb = async ()=>{
  await mongoose.connect(process.env.LOCAL_URI);
}
connectDb();

app.use(cors());
app.use(express.json());
app.use('/record' , recordRoutes);


app.listen(PORT , ()=>{
  console.log(`Server Running on Port ${PORT}`);
})