import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import {AdminDashboard} from './pages/AdminDashboard.jsx';
import {EmployeeDashboard} from './pages/EmployeeDashboard.jsx';
import {ManagerDashboard} from './pages/ManagerDashboard.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected Routes */}

        <Route 
          path='/admin'
          element={
            <ProtectedRoutes role="admin">
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />

        <Route 
          path='/manager'
          element={
            <ProtectedRoutes role="manager">
              <ManagerDashboard />
            </ProtectedRoutes>
          }
        />

        <Route 
          path='/employee'
          element={
            <ProtectedRoutes role="employee">
              <EmployeeDashboard/>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  )
}
