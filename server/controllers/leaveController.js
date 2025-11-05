import Leave from "../models/leaveModel.js";
import Employee from "../models/empModel.js";

export const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const employeeId = req.user.id;
    const newLeave = new Leave({
      employee: employeeId,
      startDate,    
      endDate,
      reason,
    });
    await newLeave.save();
    await Employee.findByIdAndUpdate(employeeId, {leaveStatus: "requested"});
    res.status(201).json({ message: "Leave application submitted", leave: newLeave });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leaveId = req.params.id;
    const leave = await Leave.findById(leaveId).populate("employee");
    if (!leave) {
      return res.status(404).json({ message: "Leave application not found" });
    }
    leave.status = status;
    await leave.save();

    const empStatus = status === "approved" ? "on_leave" : "none";
    await Employee.findByIdAndUpdate(leave.employee._id, { leaveStatus: empStatus });
    
    res.status(200).json({ message: "Leave status updated", leave });
  }catch (error) { 
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "name email department");
    res.status(200).json({ leaves });
  }
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getMyLeaves = async(req ,res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id });
    res.status(200).json({ leaves });
  }
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getEmployeeOnLeave = async (req, res) => {
  try {
    const employees = await Employee.find({ leaveStatus: "on_leave" });
    res.status(200).json({ employees });
  }catch (error) {
    res.status(500).json({error: error.message });
  }
}