import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const hanleSignup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5050/api/auth/register", { name, email, password, role });
    alert("Signup Successful");
    navigate("/");
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={hanleSignup}>
        <input 
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
