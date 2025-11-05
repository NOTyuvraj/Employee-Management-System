import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {getEmployees, getEmpOnLeave} from '../api/employeeApi.js'

export const Dashboard = () => {
  const {data : employees = [] , isLoading : empLoading} = useQuery(["employees"], getEmployees);
  const {data : empOnLeave = [] , isLoading : leaveLoading} = useQuery (["empOnLeave"], getEmpOnLeave);

  if(empLoading || leaveLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div></div>
    </div>
  )
}
