import mongoose from "mongoose";

const empSchema = mongoose.Schema({
  name : {type : String , required : true},
  jobTitle : {type : String , required : true},
  department : {type : String , required : true},
  email : {type : String , required : true , unique : true , lowercase : true , trim : true},
  phone : {type : Number , required : true , unique : true},
});

const EmpModel = mongoose.model("EmpModel" , empSchema);

export default EmpModel;