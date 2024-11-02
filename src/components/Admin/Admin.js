import { React, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";

import "./Admin.scss";
import "react-pro-sidebar/dist/css/styles.css";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="admin-container">
      {/* Admin-Sidebar - [AS] */}
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed}></Sidebar>
      </div>
      <div className="admin-content w-full">
        {/* admin-header-content */}
        <div className="w-full flex justify-between items-center cursor-pointer px-[20px] h-10">
          <FaBars
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <div className="flex justify-center items-center text-black gap-2" onClick={() => navigate('/')}>
          <AiOutlineHome className="size-5"></AiOutlineHome>
            <span className="border-b border-black">Back to home</span>
          </div>
        </div>
        {/* admin-main-content */}
        <div className="admin-main px-3 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
