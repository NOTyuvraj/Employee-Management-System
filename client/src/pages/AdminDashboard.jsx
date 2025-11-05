import React, { useEffect, useState } from 'react'
import {createEmployee, deleteEmployee, getEmployees, getEmpOnLeave, updateEmployee} from "../api/employeeApi.js"

export const AdminDashboard = () => {

  const[employee , setEmployees] = useState([]);
  const[onLeave , setOnLeave] = useState([]);
  const[form , setForm] = useState({name : "" , email : "" , role : ""});
  const[editing , setEditing] = useState(null);

  const fetchEmployees = async ()=>{
    const data = await getEmployees();
    setEmployees(data);
  }

  const fetchOnLeave = async () =>{
    const data = await getEmpOnLeave();
    setOnLeave(data);
  }

  useEffect(() => {
    fetchEmployees();
    fetchOnLeave();
  } , []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(editing){
      await updateEmployee(editing , form);
    }else{
      await createEmployee(form);
    }
    setForm({name : "" , email : "" , role : ""});
    setEditing(null);
    fetchEmployees();
  };

  const handleEdit = (emp) =>{
    setEditing(emp._id);
    setForm({name : emp.name , email: emp.email , role: emp.role});
  }

  const handleDelete= async (id)=>{
    await deleteEmployee(id);
    fetchEmployees();
  }

   return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      {/* Employee Form */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">{editing ? "Update" : "Add"} Employee</button>
      </form>

      <h3>All Employees</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* On Leave Section */}
      <h3>Employees On Leave</h3>
      <ul>
        {onLeave.map(emp => (
          <li key={emp._id}>
            {emp.name} ({emp.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
