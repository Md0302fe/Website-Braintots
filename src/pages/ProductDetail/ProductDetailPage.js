import React from "react";
import "./ProductDetailPage.scss";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

const ProductDetailPage = () => {
  return (
    <div className="Product-Detail Container flex-center-center">
      <div className="Wrapper Width">
        <div className="navigate-link">
          <h5>Trang chủ</h5>
        </div>
        <div className="Product-Detail-MainContent">
          <ProductDetailComponent></ProductDetailComponent>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
