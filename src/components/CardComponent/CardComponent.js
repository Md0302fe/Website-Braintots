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
        {props?.products?.map((product) => {
          return (
            <CardRender
              key={product._id}
              id={product._id}
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
              style={{ Flex: "0.25" }}
            ></CardRender>
          );
        })}
      </div>
    </div>
  );
};

export default CardComponent;
