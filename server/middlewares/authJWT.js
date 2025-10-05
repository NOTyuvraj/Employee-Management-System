import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";

dotenv.config();

export const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token , authorization denied" });
    }

    try{
      const decode = jwt.verify(token , process.env.TOKEN_SECRET);
      req.user = decode;
      console.log("The decoded user : " , req.user);
      next(); 
    }catch(err){
      res.staus(400).json({message : "Token is not valid"})
    }
  }
};
