import React from "react";
import "./DropdownList.scss";
import { AiOutlineRight } from "react-icons/ai";

const DropdownList = () => {
  return (
    <div className="Supmenu-dropdown ">
      <ul className="container flex">
        {/* MAP type of items here ? */}
        <li className="dropdown-item">
          <span className="dropdown_text">Đồ chơi gỗ</span>
          <AiOutlineRight className="dropdown-icons"></AiOutlineRight>
        </li>
        <li className="dropdown-item">
          <span className="dropdown_text">Đồ chơi trí tuệ</span>
          <AiOutlineRight className="dropdown-icons"></AiOutlineRight>
        </li>
        <li className="dropdown-item">
          <span className="dropdown_text">Đồ chơi giáo dục</span>
          <AiOutlineRight className="dropdown-icons"></AiOutlineRight>
        </li>
        <li className="dropdown-item">
          <span className="dropdown_text">Đồ chơi sáng tạo</span>
          <AiOutlineRight className="dropdown-icons"></AiOutlineRight>
        </li>
        <li className="dropdown-item">
          <span className="dropdown_text">Đồ chơi lắp ráp</span>
          <AiOutlineRight className="dropdown-icons"></AiOutlineRight>
        </li>
      </ul>
    </div>
  );
};

export default DropdownList;
