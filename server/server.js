import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_URI);
    console.log(`Database Connected`);
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (err) {
    console.log("Unable to connect Database", err.message);
    process.exit(1);
  }
};

connectDb();
