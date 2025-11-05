import axios from 'axios';
import { authHeader } from '../utils/authHeader.js';

const BASE_URL = 'http://localhost:5050/api';

export const getEmployees = async () => {
  const res = await axios.get(`${BASE_URL}/employees`, { headers: authHeader() });
  return res.data;
}

export const getEmpOnLeave = async () => {
  const res = await axios.get(`${BASE_URL}/leaves/on-leave/emp`, { headers: authHeader() });
  return res.data;
}

export const createEmployee = async (data) => {
  const res = await axios.post(`${BASE_URL}/employees`, data, { headers: authHeader() });
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/employees/${id}`, data, { headers: authHeader() });
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await axios.delete(`${BASE_URL}/employees/${id}`, { headers: authHeader() });
  return res.data;
};
