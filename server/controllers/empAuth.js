import EmpModel from "../models/empModel.js"

export const createEmp = async (req , res) => {
  try{
    const emp = new EmpModel(req.body); 
    await emp.save();
    res.status(201).json({message : "Employee created successfully" , emp});
  }
  catch(err){
    res.status(500).json({message : "Error creating employee" , error : err.message});
  }
};

export const getEmps = async (req , res) => {
  try{
    const emp = await EmpModel.find({});
    res.status(200).json({emps : emp});
  }
  catch(err){
    res.status(500).json({message : "Error fetching employees" , error : err.message});
  }
}

export const getEmpById = async (req , res) => {
  try{
    const emp = await EmpModel.findById(req.params.id);
    if(!emp) return res.status(404).json({message : "Employee not found"});
    res.status(200).json({emp});
  }
  catch(err){
    res.status(500).json({message : "Error fetching employee" , error : err.message});
  }
}

export const updateEmp = async (req , res) => {
  try{
    const updated = await EmpModel.findByIdAndUpdate(req.params.id , req.body , {new : true});  
    if(!updated) return res.status(404).json({message : "Employee not found"});
    res.status(200).json({message : "Employee updated successfully" , emp : updated});
  }
  catch(err){
    res.status(500).json({message : "Error updating employee" , error : err.message});
  }
}

export const deleteEmp = async (req , res) => {
  try{
    const deleted = await EmpModel.findByIdAndDelete(req.params.id);  
    if(!deleted) return res.status(404).json({message : "Employee not found"});
    res.status(200).json({message : "Employee deleted successfully" });
  }
  catch(err){
    res.status(500).json({message : "Error deleting employee" , error : err.message});
  }
}
