import express from "express";
import Record from "../models/recordModels.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const employee = await Record.find({
      $or: [
        { empName: { $regex: q , $options: "i" } },
        { empJobTitle: { $regex: q , $options: "i" } },
        { empDep: { $regex: q , $options: "i" } },
      ],
    });
    res.json({records : employee , count : employee.length});
  } catch (err) {
    res.status(500).json({message : err.message});
  }
});

// create new Record
router.post("/", async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:dep" , async (req , res) => {
  try{
    const record = await Record.find({empDep : req.params.id});
    res.json(record);
  }catch(err){
    res.status(404).json({ error : "Record Not Found" });
  }
})

// See all Records
router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    const count = await Record.countDocuments();
    res.json({ records, count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// See by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.json(record);
  } catch (err) {
    res.status(404).json({ error: "Record Not Found" });
  }
});

// Update record by ID
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Record by ID
router.delete("/:id", async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/find", async (req, res) => {
  try {
    let user = await Record.find({ empName: "Harsh" });
    res.send(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
