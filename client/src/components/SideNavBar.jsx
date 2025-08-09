import React, { createContext, useContext, useState } from "react";

import {
  AlignJustify,
  Apple,
  CircleUserRound,
  EllipsisVertical,
  X,
} from "lucide-react";

const SideBarContext = createContext();
export const SideNavBar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`transition-all duration-300 h-screen ${expanded ? "w-64" : "w-16"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Apple
            size={32}
            className={`overflow-hidden transition-all 
            ${expanded ? "w-10" : "w-0"}`}
          />
          <button
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 "
          >
            {expanded ? <X /> : <AlignJustify />}
          </button>
        </div>

        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>

        <div className="flex justify-center items-center cursor-default relative bottom-4 border-t pt-4">
          <CircleUserRound size={32} />
          <div
            className={`
            flex  justify-between items-center
            overflow-hidden transition-all
            ${expanded ? "w-52 ml-3" : "w-0"} 
          `}
          >
            <div className="leading-4 ">
              <div className="flex flex-col">
                <h4 className="font-semibold">BigBlueBuck</h4>
                <span className="text-xs text-gray-600 ">
                  bigbluebuck@buck.com
                </span>
              </div>
            </div>
            <button className="hover:text-indigo-700">
              <EllipsisVertical size={32} />
            </button>
            <button className="hover:text-indigo-700">
              <EllipsisVertical size={32} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export function SideBarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SideBarContext);
  return (
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer 
      transition-colors group 
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }
    `}
    >
      {icon}
      <span
        className={`
        overflow-hidden transition-all 
        ${expanded ? "w-52 ml-3" : "w-0"}
      `}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}
      {!expanded && (
        <div
          className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-20 -translate-x-3 transition-all 
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

// import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   AlignJustify,
//   X,
//   BookText,
//   Mail,
//   Calendar,
//   BriefcaseBusiness,
//   UserRoundSearch,
//   ScrollText,
//   BookUser,
//   Combine,
//   BookLock,
//   Settings,
// } from "lucide-react";
// import { MdPadding } from "react-icons/md";

// export const SideNavBar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const toggle = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <Sidebar
//       className={`h-screen bg-violet-600`}
//       transitionDuration={300}
//       collapsedWidth="64px"
//       width="256px"
//       collapsed={isCollapsed}
//     >
//       <button
//         onClick={toggle}
//         className=" flex justify-center items-center top-2 left-2 mb-6 relative h-12 w-12 rounded-full hover:bg-violet-500 hover:text-white "
//       >
//         {isCollapsed ? (
//           <AlignJustify className="align-center" size={28} />
//         ) : (
//           <X className="text-9xl" size={28} />
//         )}
//       </button>
//       <Menu
//         menuItemStyles={{
//           root: {
//             color: "black",
//             fontSize: "16px",
//           },
//         }}
//       >
//         <MenuItem
//           className="transition-all duration-300"
//           component={<Link to={"/dashboard"} />}
//         >
//           {isCollapsed ? <BookText /> : "Documentation"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/inbox"} />}>
//           {isCollapsed ? <Mail /> : "Inbox"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/calender"} />}>
//           {isCollapsed ? <Calendar /> : "Calender & Todos"}
//         </MenuItem>
//         {isCollapsed ? (
//           <div className="relative left-2 h-1 w-12 mt-4 mb-4 bg-black margin-0"></div>
//         ) : (
//           <h1 className="ml-5 text-gray-500 mt-4 mb-4">Recruitment</h1>
//         )}
//         <MenuItem component={<Link to={"/jobs"} />}>
//           {isCollapsed ? <BriefcaseBusiness /> : "Jobs"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/candidate"} />}>
//           {isCollapsed ? <UserRoundSearch /> : "Candidate"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/referrals"} />}>
//           {isCollapsed ? <ScrollText /> : "My Refferals"}
//         </MenuItem>
//         {isCollapsed ? (
//           <div className="relative left-2 h-1 w-12 bg-black mt-4 mb-4 margin-0"></div>
//         ) : (
//           <h1 className="ml-5 text-gray-500 text-s mt-4 mb-4">Organization</h1>
//         )}
//         <MenuItem component={<Link to={"/careesite"} />}>
//           {isCollapsed ? <BookUser /> : "Caree Site"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/structure"} />}>
//           {isCollapsed ? <Combine /> : "Structure"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/report"} />}>
//           {isCollapsed ? <BookLock /> : "Report"}
//         </MenuItem>
//         <MenuItem component={<Link to={"/setting"} />}>
//           {isCollapsed ? <Settings /> : "Setting"}
//         </MenuItem>
//       </Menu>
//     </Sidebar>
//   );
// };
