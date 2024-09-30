import React from "react";

// import layout
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

// import icons
import { FaGem, FaGithub } from "react-icons/fa";

import sidebarBg from "../../assets/bg2.jpg";

import { MdDashboardCustomize } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        toggled={toggled}
        collapsed={collapsed}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div className="SiderWrapper">
            {/* title here */}
            <div className="SidebarHeader-top">
              <div
                className="SidebarHeader-avatar"
                style={{ backgroundImage: `url(${user?.avatar})` }}
              ></div>
              <span className="SidebarHeader-title">MD.DEV</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboardCustomize />}>
              Dashboard
              <Link to={"/system/admin"} />
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              icon={<FaUserGear />}
              title="Người Dùng"
            >
              <MenuItem>
                Quản lý người dùng
                <Link to={"manage-users"} />
              </MenuItem>
            </SubMenu>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              icon={<FaGem />}
              title="Sản Phẩm"
            >
              <MenuItem>
                Quản lý sản phẩm
                <Link to={"manage-products"} />
              </MenuItem>
              <MenuItem> Quản lý sản phẩm </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter className="SidebarFooter">
          <div className="sidebar-btn-wrapper">
            <a
              href="https://github.com/Md0302fe/Md.dev.QuizApp"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {/* footer link */}
                <span>minhduc.lmd Dev</span>
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
