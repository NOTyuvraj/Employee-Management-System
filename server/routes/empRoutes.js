import express from "express";
import EmpModel from "../models/empModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, jobTitle, department, email, phone } = req.body;
    const emp = new EmpModel({
      name,
      jobTitle,
      department,
      email,
      phone,
    });

    await emp.save();
    return res.status(200).json({ message: "Employee Created" });
  } catch (err) {
    return res.status(500).json({ message: "Employee cannot be created" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allEmp = await EmpModel.find();
    return res.status(200).json(allEmp);
  } catch (err) {
    return res.status(400).json({ message: "Cannot find any Employees" });
  }
});

export default router;