import React, { useEffect, useState } from "react";
import "./Subnav.scss";

import { useNavigate } from "react-router-dom";

import * as ProductServices from "../../services/ProductServices";

const Subnav = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchGetAllCategory = async () => {
    const res = await ProductServices.getAllCategory();
    if (res?.status === "OK") {
      setCategories(res?.data);
    }
  };

  useEffect(() => {
    fetchGetAllCategory();
  }, []);

  // Handle Active Animaton
  const renderCategories = () => {
    if (categories.length > 0) {
      return categories?.map((category) => {
        return (
          <div
            key={category?._id}
            className="menu-items homepage flex-center-center"
          >
            <span onClick={() => navigate(`Product-type/${category?._id}`)}>
              {category.name}
            </span>
          </div>
        );
      });
    }
  };

  let listItems = document.querySelectorAll(".subnav-menu .menu-items");
  const currentActive = document.querySelector(
    ".subnav-menu .menu-items.active"
  );

  listItems.forEach((item, index) => {
    item.onclick = function () {
      currentActive?.classList.remove("active");
      this.classList.add("active");
    };
  });

  return (
    <div className="Subnavigation-Container flex-center-center">
      <div className="Width subnav-menu flex-center-center">
        {/* MAP ITEMS HERE  */}
        {renderCategories()}
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Subnav;
