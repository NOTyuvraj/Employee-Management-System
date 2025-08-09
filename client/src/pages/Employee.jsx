import React, { useEffect, useRef, useState } from "react";
import api from "../../api.js";
import AddEmployee from "./AddEmployee.jsx";

import {
  Bell,
  Ellipsis,
  Mail,
  Moon,
  PhoneCall,
  Search,
  Trash2,
  User,
} from "lucide-react";

export const Employee = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const modalRef = useRef();

  const openDialog = () => {
    modalRef.current.openModal();
  };

  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [searchTerm , setSearchTerm] = useState("");

  const fetchRecords = async (query = "") => {
    try {
      const endPoint = query ? `/search?q=${query}` : "/";
      const res = await api.get(endPoint);
      setRecords(res.data.records || []);
      setCount(res.data.count || 0);
    } catch (err) {
      console.error("Error fetching Records", err);
    }
  };

  const DeleteRec = async (id) => {
    await api.delete(`/${id}`);
    alert("Record Deleted");
    window.location.reload();
  };

  useEffect(() => {
    if(searchTerm.trim() === ""){
      fetchRecords();
    }else{
      fetchRecords(searchTerm);
    }
  }, [searchTerm]);

  

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* top */}
      <div className={`font-roboto h-20 flex mr-10 justify-end items-center`}>
        <div className="flex ">
          <div className=" left-10 h-10 w-180 rounded border-1 justify-around flex items-center">
            <Search className="relative left-2" />
            <input
              className="border-l-1 border-gray-400 outline-0 pl-4 w-160"
              placeholder="Search for Employees"
              type="textarea"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center ml-4 rounded-full h-10 w-10 border">
            <Moon />
          </div>
          <div className="flex justify-center items-center ml-4 mr-4 rounded-full h-10 w-10 border">
            <User />
          </div>
          <div className="flex justify-center items-center rounded-full h-10 w-10 border">
            <Bell />
          </div>
        </div>
      </div>

      <hr className="" />

      {/* no. of employee */}
      <div className="h-10 text-4xl mt-4 font-roboto flex ml-8 mb-2 justify-between items-center">
        <div>
          <span className="text-indigo-700">{count}</span>&nbsp;Employee
        </div>
        <div>
          <button
            onClick={openDialog}
            className="mr-8 px-2 py-2 text-xl rounded bg-indigo-700 text-white hover:bg-indigo-600 border-none "
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* employee card */}
      <div className="flex font-roboto">
        {records.map((emp) => (
          <div
            key={emp._id}
            id="card"
            className="bg-gray-100 rounded-lg  h-64 w-64 flex flex-col m-4 ml-8"
          >
            <div className=" m-2 mx-4 flex flex-row justify-between items-center ">
              <img className="h-16 w-16 rounded-full" src={emp.img} />
              <Trash2
                onClick={() => {
                  DeleteRec(emp._id);
                }}
                className=" hover:text-indigo-700  h-8 w-8"
              />
            </div>
            <div className="mx-4">
              <h2 className="text-lg">{emp.empName}</h2>
              <p className="text-base text-gray-400">{emp.empJobTitle}</p>
            </div>
            <div className="flex mx-4 justify-between mt-2">
              <div className="flex flex-col text-left">
                <p className="text-sm text-gray-400">Department</p>
                <p className="text-sm">{emp.empDep}</p>
              </div>
              <div className="flex flex-col text-left">
                <p className="text-sm text-gray-400">Hired Date</p>
                <p className="text-sm">{formatDate(emp.empHiredDate)}</p>
              </div>
            </div>
            <div>
              <div className="flex mt-4 items-center mx-4">
                <Mail size={16} />
                <p className="pl-4">{emp.empEmail}</p>
              </div>
              <div className="flex mt-1 items-center mx-4">
                <PhoneCall size={16} />
                <p className="pl-4">{emp.empPhone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddEmployee ref={modalRef} />
    </div>
  );
};
