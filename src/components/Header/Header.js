import "./Header.scss";
import React from "react";
import Search from "antd/es/transfer/search";
import { Col, Row } from "antd";
import { CiSquareQuestion } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = ({ loginActive }) => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const navigate = useNavigate();

  // Handle Click Icons User : click vào thì tag overlay Login sẽ add thêm active vào.
  const handleClickIconsUser = () => {
    loginActive();
  };

  return (
    <div className="Header">
      {/* Topbar - Wrapper */}
      <div className="topbar-wrap flex-center-center">
        <div className="Width flex-center-center">
          <div className="topcontent-left"> Giao hàng siêu tốc</div>
          <div className="topcontent-right flex-center-center">
            <div className="content-rights">
              <CiSquareQuestion className="icons-right"></CiSquareQuestion>
            </div>
            <a href="https://www.dochoigiaotri.com/">
              <div className="content-item">
                <span>Tư vấn mua hàng</span>
                <h5>0333 090 091 / Facebook</h5>
              </div>
            </a>
          </div>
        </div>
      </div>
      <Row className="flex-center-center">
        <div className="Width flex-center-center">
          <Col span={6} className="Logo">
            LOGO
          </Col>

          <Col span={11} className="Search-box">
            <Search
              className="search-box-item"
              placeholder="Tìm kiếm sản phẩm"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Col>

          <Col span={7} className="Shopping-cart flex-center-center">
            {/* Icons User */}
            <AiOutlineUser
              className="shopping-cart-icons user"
              onClick={() => handleClickIconsUser()}
            ></AiOutlineUser>
            <div className="favorite-box flex-center-center">
              <AiOutlineHeart className="shopping-cart-icons icons"></AiOutlineHeart>
              <div className="favorite flex-center-center">1</div>
            </div>
            <div className="cart-box flex-center-center">
              <HiOutlineShoppingBag className="shopping-cart-icons"></HiOutlineShoppingBag>
              <span className="cart-number">0</span>
              <span>/</span>
              <span className="cart-total">0 đ</span>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default Header;

// ant design / chia phần tử ra thành 24 cột , Col span={...} số cột chiếm trong layout.
