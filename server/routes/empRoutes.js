import express from "express";
import { verifyToken } from "../middlewares/authJWT.js";
import { authorizeRole } from "../middlewares/authRoles.js";
import { createEmp, getEmps, getEmpById, updateEmp, deleteEmp } from "../controllers/empAuth.js";
const router = express.Router();

router.post("/", verifyToken, authorizeRole("admin"), createEmp);

router.get("/", verifyToken, authorizeRole("admin", "manager"), getEmps);

router.get("/:id", verifyToken, authorizeRole("admin", "manager"), getEmpById);

router.put("/:id", verifyToken, authorizeRole("admin"), updateEmp);

router.delete("/:id", verifyToken, authorizeRole("admin"), deleteEmp);

export default router;