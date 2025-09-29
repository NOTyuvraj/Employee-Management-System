import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

const connectDb = async () =>{
  await mongoose.connect(process.env.LOCAL_URI);
}

try{
  connectDb();
}catch(err){
  console.log("Unable to connect Database");
}

app.use(cors());
app.use(express.json());
app.use('/api/auth' , userRoutes)

app.listen(PORT , ()=>{
  console.log(`Server Running on Port ${PORT}`);
})
