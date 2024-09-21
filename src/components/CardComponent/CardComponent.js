import React from "react";
import "./CardComponent.scss";
import CardRender from "./CardRender";

const CardComponent = (props) => {
  // const { key, countInStock ,description ,image ,masanpham ,name ,price ,rating ,type , selled , discount} = props;
  // Handle Get Data Card-Product
  return (
    <div className="Card flex-center-center">
      <div className="Card-wrapper">
        {/* EACH PRODUCT CARD RENDER HERE */}
        {props?.product?.data.map((product) => {
          return (
            <CardRender
              key={product._id}
              countInStock={product.countInStock}
              description={product.description}
              image={product.image}
              masanpham={product.masanpham}
              name={product.name}
              price={product.price}
              rating={product.rating}
              type={product.type}
              selled={product.selled}
              discount={product.discount}
              style={{ Flex: "0.25" }}
            ></CardRender>
          );
        })}
      </div>
    </div>
  );
};

export default CardComponent;
