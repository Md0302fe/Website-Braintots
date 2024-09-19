import React from "react";
import Subnav from "../../components/HeaderComponent/Subnav";
import Category from "../../components/CategoryComponent/Category";
import { Pagination } from "antd";
import "./ProductType.scss";
const ProductType = () => {
  // Handle Paginate Clicking.
  const handlePaginate = () => {};
  return (
    <>
      <Subnav></Subnav>
      <div className="Product-type Container flex-center-center">
        <div className="Product-Type-Wrapper Width flex-center-center">
          <Category></Category>
          <Pagination
            className="Paginate"
            defaultCurrent={6}
            total={100}
            onChange={() => handlePaginate()}
          />
        </div>
      </div>
    </>
  );
};

export default ProductType;
