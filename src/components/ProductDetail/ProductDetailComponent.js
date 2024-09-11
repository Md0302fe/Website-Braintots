import React from "react";
import "./ProductDetailComponent.scss";
import { Col, Row } from "antd";
import { BiHeart } from "react-icons/bi";
import { CgFacebook } from "react-icons/cg";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const ProductDetailComponent = () => {
  return (
    <div className="Product-Detail-Container">
      <Row className="Wrapper Layout">
        {/* Left Col Content */}
        <Col span={12} className="Left-Col">
          <div className="Image-Product_Detail"></div>
          <div className="ExtraImage-Product_Detail flex-center-center">
            {/* extra image below */}
            <div className="extra"></div>
            <div className="extra"></div>
            <div className="extra"></div>
          </div>
        </Col>
        {/* Right Col Content */}
        <Col span={12} className="Right-Col">
          <div className="title">
            Đồ chơi giáo dục ghép chữ học tiếng anh tên động vật D197
          </div>
          <div className="prices">
            250.000 <span className="prices-d">đ</span>
          </div>
          {/* main info product details */}
          <div className="product-detail-info">
            <div className="product-des-info">
              <li>
                Đồ chơi giáo dục ghép chữ tiếng anh tên động vật với Bảng chữ
                cái Tiếng Anh đủ 25 kí tự với thiết kế ghép vào các hình card
                các loài động vật dễ thương thông thường các Bé thường gặp.
              </li>
              <li>
                Nhận biết các loài động vật tăng sự cuốn hút cho các Bé vừa chơi
                vừa học.
              </li>
            </div>
            <div className="product-status">còn 1 hàng</div>
            <button>thêm vào giỏ hàng</button>
          </div>
          {/* sub info product detail */}
          <div className="product-detail-subinfo">
            <div className="info-hotline"></div>
            <div className="favorite flex-center-center">
              <BiHeart></BiHeart>
              Thêm yêu thích
            </div>
            <div className="info-transfer flex-center-center">
              <div className="trans-items">
                <div className="trans-items-shipping icons"></div>
                <div className="trans-items-right">
                  <h2>Miễn phí giao hàng trong Tp HCM</h2>
                  <span>(Sản phẩm trên 690.000đ)</span>
                </div>
              </div>
              <div className="trans-items">
                <div className="trans-items-calendar icons"></div>
                <div className="trans-items-right">
                  <h2>Đổi Trả Dễ Dàng</h2>
                  <span>
                    (Đổi trả trong vòng 3 ngày nếu có lỗi từ nhà sản xuất)
                  </span>
                </div>
              </div>
              <div className="trans-items">
                <div className="trans-items-Phone icons"></div>
                <div className="trans-items-right">
                  <h2>Tổng Đài Bán Hàng 033 309 0XXX</h2>
                  <span>(Hỗ trợ tư vấn từ 8h30 - 21h30 mỗi ngày)</span>
                </div>
              </div>
            </div>
            <div className="product-code text">
              Mã : <span> XXX</span>
            </div>
            <div className="share flex-center-center text">
              <span>Chia sẻ:</span>
              <div className="share-link flex-center-center">
                <a href="/" className="share-link-items">
                  <CgFacebook></CgFacebook>
                </a>
                <a href="/" className="share-link-items">
                  <BsTwitter></BsTwitter>
                </a>
                <a href="/" className="share-link-items">
                  <AiOutlineMail></AiOutlineMail>
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailComponent;
