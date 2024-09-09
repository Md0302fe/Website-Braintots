import React from "react";
import "./Subnav.scss";

import { useNavigate } from "react-router-dom";

const Subnav = () => {
  const navigate = useNavigate();
  return (
    <div className="Subnavigation-Container flex-center-center">
      <div className="Width subnav-menu flex-center-center">
        {/* MAP ITEMS HERE  */}
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>tất cả</span>
        </div>
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>đồ chơi giáo dục</span>
        </div>
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>đồ chơi gỗ</span>
        </div>
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>đồ chơi lắp ráp</span>
        </div>
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>đồ chơi sáng tạo</span>
        </div>
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>đồ chơi trí tuệ</span>
        </div>
        <div className="menu-items homepage flex-center-center">
          <span onClick={() => navigate("/")}>đồ chơi tương tác</span>
        </div>
      </div>
    </div>
  );
};

export default Subnav;
