import jwt from "jsonwebtoken";
import bcrypt, { compare, hash } from "bcrypt";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      role,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1000s",
    });
    res.json({ message: "User Registered", accessToken: token });
  } catch (err) {
    res.json({ error: "Signup Failed" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPass = await User.findOne({ email });
    if (!userPass) {
      res.json({ error: "User not found" });
      return;
    }
    const isMatch = await compare(password, userPass.password);
    if (!isMatch) {
      res.json({ error: "Wrong Password" });
      return;
    }
    const token = jwt.sign({id : userPass._id} , process.env.TOKEN_SECRET , {expiresIn : '1000s'});
    res.json({ message: "Login Succesful" , accessToken : token});
  } catch (err) {
    res.json({ error: "Server Error" });
  }
};
