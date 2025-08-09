import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
  img: { type: String, required: true },
  empName: { type: String, required: true },
  empJobTitle: { type: String, required: true },
  empDep: { type: String, required: true },
  empHiredDate: { type: Date, default: Date.now, required: true },
  empEmail: { type: String, required: true },
  empPhone: { type: Number, required: true },
});

export default mongoose.model("Record" , empSchema);