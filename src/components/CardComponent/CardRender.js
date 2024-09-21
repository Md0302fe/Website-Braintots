import React from "react";
import "./CardComponent.scss";

const CardRender = (props) => {
  // const { key, countInStock ,description ,image ,masanpham ,name ,price ,rating ,type , selled , discount} = props;
  const {
    countInStock,
    description,
    image,
    masanpham,
    name,
    price,
    rating,
    type,
    selled,
    discount,
  } = props;

  return (
    <div className="product-card">
      {/* ảnh sản phẩm */}
      <div className="product-image"></div>
      {/* tên sản phẩm */}
      <div className="product-title">
        <span className="product-name">{name}</span>
      </div>
      {/* đã bán */}
      <div className="product-title">
        <span className="product-name"> đã bán {selled}</span>
      </div>
      {/* giá sản phẩm */}
      <div
        className="product-prices flex-center-center"
        style={{ justifyContent: "space-around" }}
      >
        <span className="prices-tag"> {price} đ</span>
        <span>Ưu đãi {discount}</span>
      </div>
    </div>
  );
};

export default CardRender;
