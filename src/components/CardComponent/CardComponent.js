import React from "react";
import "./CardComponent.scss";

import CardRender from "./CardRender";

import { useSelector } from "react-redux";

const CardComponent = (props) => {
  const searchProduct = useSelector((state) => state?.product?.search_data);
  return (
    <div className="Card flex-center-center">
      <div className="Card-wrapper">
        {/* EACH PRODUCT CARD RENDER HERE */}
        {props?.products
          ?.filter((pro) => {
            if (searchProduct === "") {
              return pro;
            } else {
              return pro?.name
                .toLowerCase()
                ?.includes(searchProduct?.toLowerCase());
            }
          })
          ?.map((product) => {
            return (
              <CardRender
                id={product._id}
                key={product._id}
                name={product.name}
                type={product.type}
                image={product.image}
                price={product.price}
                selled={product.selled}
                rating={product.rating}
                discount={product.discount}
                masanpham={product.masanpham}
                description={product.description}
                countInStock={product.countInStock}
                priceAfterDiscount={product.priceAfterDiscount}
                style={{ Flex: "0.25" }}
              ></CardRender>
            );
          })}
      </div>
    </div>
  );
};

export default CardComponent;
