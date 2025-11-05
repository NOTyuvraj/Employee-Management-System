import {Navigate} from "react-router-dom"

const ProtectedRoutes = ({children , role}) => {
  const token = localStorage.getItem("token");
  try{
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
    if(role && user?.role !== role) return <Navigate to="/"/>;
    return children;
  }
  catch{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to='/'/>;
  }
}

export default ProtectedRoutes;