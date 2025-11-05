import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const[email , setEmail] = React.useState("");
  const[password , setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5050/api/auth/login" , {email , password});
      const token = res.data.token;
      localStorage.setItem("token" , token);

      const user = JSON.parse(atob(token.split(".")[1]));
      if(user.role === "admin") navigate("/admin");
      else if(user.role === "manager") navigate("/manager");
      else if(user.role === "employee") navigate("/employee");

    }
    catch(err){
      console.log(err);
      alert("Invalid credentials");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
