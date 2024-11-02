import React, { useState, useEffect } from "react";
import "./CardComponent.scss";
import { useNavigate } from "react-router-dom";
import {convertPrice} from '../../ultils'
const CardRender = (props) => {
  // const { key, countInStock ,description ,image ,masanpham ,name ,price ,rating ,type , selled , discount} = props;
  const {
    id,
    type,
    name,
    price,
    image,
    rating,
    selled,
    masanpham,
    description,
    countInStock,
    priceAfterDiscount,
    discount = 5,
  } = props;
  const [isDiscount, setIsDiscount] = useState(false);

  useEffect(() => {
    if (priceAfterDiscount && priceAfterDiscount < price) {
      setIsDiscount(true);
    } else {
      setIsDiscount(false);
    }
  }, [priceAfterDiscount]);

  const navigate = useNavigate();
  // handle Navigate to product-details page
  const handleDetailsProduct = () => {
    // muốn truyền tham số thông qua navigate => chèn thêm dữ liệu sau dấu /
    navigate(`/Product-Detail/${id}`);
  };

  return (
    <div className="product-card" onClick={() => handleDetailsProduct(id)}>
      {/* ảnh sản phẩm */}
      <div
        className="product-image"
        style={{ background: `url(${image})`, backgroundSize: "cover" }}
      ></div>
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
        style={{ justifyContent: "space-between" }}
      >
        {isDiscount ? (
          <div className="flex flex-col">
            <span className="line-through text-sm">
              {convertPrice(price)}đ
            </span>
            <span className="pl-3 text-[#DD3535]">
              {convertPrice(priceAfterDiscount)}đ
            </span>
          </div>
        ) : (
          <span className="text-black"> {convertPrice(price)}đ</span>
        )}
        <span>Ưu đãi - {discount}%</span>
      </div>
    </div>
  );
};

export default CardRender;
