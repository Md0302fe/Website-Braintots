import React from "react";
import "./Category.scss";
import CardComponent from "../CardComponent/CardComponent";

const Category = (props) => {
  // Handle Get List Category.
  const getListCategory = () => {};
  return (
    <div className="Content-Wrapper">
      {/* main-content-features */}
      <div className="homepage-content-features">
        {/* Box Features 1 */}
        <div className="content-features">
          {/* content features info */}
          <div className="content-features-info flex-center-center">
            <div className="top-header text-center">
              <span>Đồ chơi trí tuệ</span>
            </div>
            <div className="header text-center flex-center-center">
              <h6>ĐỒ CHƠI GIÁO DỤC</h6>
              <div className="line text-center"></div>
            </div>
            <div className="info text-center">
              Đồ chơi giáo trí: Giáo dục, Giải trí, Trí tuệ. Giúp bé vui chơi,
              học hỏi nhiều điều mới lạ đồng thời định hướng, phát triển tư duy,
              phần biệt màu sắc, khả năng sáng tạo và phát triển toàn diện
            </div>
          </div>
          {/* content features product */}
          <div className="features-products">
            <div className="features-product-wrapper flex-center-center">
              {/* Components Card Here */}
              <CardComponent></CardComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
