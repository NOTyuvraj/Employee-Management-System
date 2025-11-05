import mongoose from "mongoose";

const empSchema = mongoose.Schema({
  name : {type : String , required : true},
  email : {type : String , required : true , unique : true , lowercase : true , trim : true},
  role : {type : String , enum : ["admin" , "manager" , "employee"] , default : "employee"},
  department : {type : String , required : true},
  joinDate : {type : Date , default : Date.now},
  leaveStatus : {type : String , enum : ["active" , "on leave" , "resigned"] , default : "active"},
  leaveTaken : {type : Number , default : 0},
});

const EmpModel = mongoose.model("EmpModel" , empSchema);

export default EmpModel;