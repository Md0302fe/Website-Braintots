import React, { useState } from "react";
import "./Navigation.scss";
import { AiOutlineBars } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DropdownList from "./DropdownList";

const Navigation = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  return (
    <div className="Navigation-Container flex-center-center">
      <div className="Width navigation-menu flex-center-center">
        {/* Main-Focus */}
        <div className="DropDown_Box">
          <div className="menu-items main-nav flex-center-center">
            <AiOutlineBars className="nav-icons-main"></AiOutlineBars>
            <span>ĐỒ CHƠI TRẺ EM</span>
            <BiChevronDown className="arrow-down"></BiChevronDown>
          </div>
          <div className="Dropdown_list">
            <DropdownList></DropdownList>
          </div>
        </div>
        <div className="menu-items homepage flex-center-center">
          <FaHome className="nav-icons"></FaHome>
          <span onClick={() => navigate("/")}>TRANG CHỦ</span>
        </div>
        <div className="menu-items infomation flex-center-center">
          <FaInfoCircle className="nav-icons"></FaInfoCircle>
          <span>GIỚI THIỆU</span>
        </div>
        <div className="menu-items kids-blog flex-center-center">
          <FaRegNewspaper className="nav-icons"></FaRegNewspaper>
          <span>KIDS BLOG</span>
        </div>
        <div className="menu-items contact flex-center-center">
          <FaRegAddressCard className="nav-icons"></FaRegAddressCard>
          <span>LIÊN HỆ</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
