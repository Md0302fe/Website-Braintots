import React, { useEffect, useState } from "react";
import "./DropdownList.scss";

import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import * as ProductServices from "../../services/ProductServices";

const DropdownList = () => {
  // Handle Render List Category
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
          <li
            onClick={() => navigate(`/Product-type/${category._id}`)}
            key={category._id}
            className="dropdown-item"
          >
            <span className="dropdown_text">{category?.name}</span>
            <AiOutlineRight className="dropdown-icons"></AiOutlineRight>
          </li>
        );
      });
    }
  };

  return (
    <div className="Supmenu-dropdown ">
      <ul className="container flex">
        {/* MAP type of items here ? */}
        {renderCategories()}
      </ul>
    </div>
  );
};

export default DropdownList;
