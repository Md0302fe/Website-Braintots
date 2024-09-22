import { React, useState } from "react";

import { FaBars } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import "./Admin.scss";
import "react-pro-sidebar/dist/css/styles.css";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      {/* Admin-Sidebar - [AS] */}
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed}></Sidebar>
      </div>

      <div className="admin-content">
        {/* admin-header-content */}
        <div className="admin-header">
          <FaBars
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </div>
        {/* admin-main-content */}
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
