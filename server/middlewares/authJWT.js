import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Token Required" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401), json({ message: "Inavlid or Expired Token" });
  }
};
