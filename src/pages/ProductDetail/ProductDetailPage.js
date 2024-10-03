import React from "react";
import "./ProductDetailPage.scss";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  // params giúp lấy params thông qua cách truyền tham số url
  const navigate = useNavigate();
  const params = useParams();
  // dùng useParams của react-router-dom để get giá trị truyền thông qua kiểu link url/:id ...
  const { id } = params;
  return (
    <div className="Product-Detail Container flex-center-center">
      <div className="Wrapper Width">
        <div className="navigate-link">
          <h5>
            <span onClick={() => navigate("/")}>Trang chủ</span> -
            <span> Chi tiết sản phẩm</span>
            phẩm
          </h5>
        </div>
        <div className="Product-Detail-MainContent">
          <ProductDetailComponent idProduct={id}></ProductDetailComponent>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
