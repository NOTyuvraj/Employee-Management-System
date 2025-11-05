import express from 'express';
import {verifyToken} from '../middlewares/authJWT.js';
import { applyLeave, updateLeaveStatus, getAllLeaves, getMyLeaves, getEmployeeOnLeave } from '../controllers/leaveController.js';
import { authorizeRole } from '../middlewares/authRoles.js';

const router = express.Router();

router.post('/' , verifyToken , authorizeRole('employee' , 'manager' , 'admin') , applyLeave);

router.get('/my' , verifyToken , authorizeRole('admin' , 'manager', 'employee') , getMyLeaves);

router.get('/' , verifyToken , authorizeRole('admin' , 'manager') , getAllLeaves);

router.put('/:id' , verifyToken , authorizeRole('admin' , 'manager') , updateLeaveStatus);

router.get('/on-leave/emp', verifyToken, authorizeRole('admin', 'manager'), getEmployeeOnLeave);

export default router;