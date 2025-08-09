import React from "react";
import { SideBarItem, SideNavBar } from "../components/SideNavBar";
import { About } from "./About";
import { Settings } from "./Settings";
import {
  BriefcaseBusiness,
  Cog,
  Info,
  LayoutDashboard,
  SquareUser,
} from "lucide-react";

import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Employee } from "./Employee";
import { Jobs } from "./Jobs";

export const Dashboard = () => {
  return (
    <main className="flex">
      <SideNavBar>
        <NavLink to="/">
          {({ isActive }) => (
            <SideBarItem
              icon={<LayoutDashboard size={22} />}
              text={"Dashboard"}
              active={isActive}
              className={`${
                isActive
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
              }`}
            />
          )}
        </NavLink>
        <NavLink to="/employee">
          {({ isActive }) => (
            <SideBarItem
              icon={<SquareUser size={22} />}
              text={"Employee"}
              active={isActive}
              className={`${
                isActive
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
              }`}
            />
          )}
        </NavLink>
        <NavLink to={"/jobs"}>
          {({ isActive }) => (
            <SideBarItem
              icon={<BriefcaseBusiness size={22} />}
              text={"Job Roles"}
              active={isActive}
              className={`${
                isActive
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
              }`}
            />
          )}
        </NavLink>
        <hr className="my-3" />
        <NavLink to={"/about"}>
          {({ isActive }) => (
            <SideBarItem
              icon={<Info size={22} />}
              text={"About"}
              active={isActive}
              className={`${
                isActive
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
              }`}
            />
          )}
        </NavLink>
        <NavLink to={"/settings"}>
          {({ isActive }) => (
            <SideBarItem
              icon={<Cog size={22} />}
              text={"Settings"}
              active={isActive}
              className={`${
                isActive
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
              }`}
            />
          )}
        </NavLink>
      </SideNavBar>
      <Routes>
        <Route path="/" />
        <Route path="/employee" element={<Employee />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About/>} />
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </main>
  );
};
