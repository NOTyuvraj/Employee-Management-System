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
    res.json({ message : `User registered with name ${newUser.name}` });
  } catch (err) {
    res.json({ error: "Signup Failed" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "User not found" });
      return;
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      res.json({ error: "Wrong Password" });
      return;
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1000s",
      }
    );
    res.json({ token });
  } catch (err) {
    res.json({ error: "Server Error" });
  }
};
