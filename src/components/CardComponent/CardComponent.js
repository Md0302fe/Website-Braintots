import React from "react";
import "./CardComponent.scss";

const CardComponent = () => {
  // Handle Get Data Card-Product
  return (
    <div className="Card flex-center-center">
      <div className="Card-wrapper Width">
        <div className="product-card">
          <div className="product-image"></div>
          <div className="product-title">
            <span>
              Đồ chơi giáo dục ghép chữ học tiếng anh tên động vật D197
            </span>
          </div>
          <div className="product-prices">
            250.000 <span className="prices-tag">đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
