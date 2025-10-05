import express from "express";
import { verifyToken } from "../middlewares/authJWT.js";
import { authorizeRole } from "../middlewares/authRoles.js";
const router = express.Router();

// Admin Only
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Admin + Manager
router.get("/manager", verifyToken, authorizeRole("admin" , "manager"), (req, res) => {
  res.json({ message: "Welcome Manager" });
});

// Anyone
router.get("/user", verifyToken, authorizeRole("admin" , "manager" , "user"), (req, res) => {
  res.json({ message: "Welcome User" });
});

export default router;
