import "./Header.scss";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { Button, Col, Popover, Row } from "antd";
import { CiSquareQuestion } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { LuUser } from "react-icons/lu";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { WrapperContentPopup } from "./styles";

import * as UserServices from "../../services/UserServices";
import { resetUser } from "../../redux/slides/userSlides";
import Loading from "../LoadingComponent/Loading";
import { useNavigate } from "react-router-dom";

const Header = ({ setActive, setIsLoginActive }) => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const userRedux = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();

  // CLICK BTN LOG-OUT
  const handleClickBtnLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    // sau khi gọi clear Cookie chứa token / set lại state (chứa thông tin user = redux)
    dispatch(resetUser());
    setOpen(false); // Đảm bảo Popover đóng lại sau khi đăng xuất
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    setUserAvatar(userRedux?.avatar);
  }, [userRedux?.avatar]);

  // HIDE POP OVER
  const hide = () => {
    setOpen(false);
  };

  // OPEN CHANGE
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleClickIconUser = () => {
    setActive(true);
    setIsLoginActive(true);
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
          <Col span={5} className="Logo">
            LOGO
          </Col>

          <Col span={13} className="Search-box">
            <Search
              className="search-box-item"
              placeholder="Tìm kiếm sản phẩm"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Col>
          <Col span={6} className="Shopping-cart flex-center-center">
            <Loading isPending={loading}>
              <div className="Wrapper-Account">
                {userRedux?.name !== "" && userRedux?.name !== undefined ? (
                  <div className="user-login flex-center-center">
                    <>
                      <Popover
                        content={
                          <ul
                            className="user-nav"
                            style={{ padding: "0", minWidth: "160px" }}
                          >
                            {userRedux?.isAdmin && (
                              <li>
                                <WrapperContentPopup
                                  onClick={() => navigate("/system/admin")}
                                >
                                  Quản lý hệ thống
                                </WrapperContentPopup>
                              </li>
                            )}
                            <li>
                              <WrapperContentPopup
                                onClick={() => navigate("/profile-user")}
                              >
                                Thông tin
                              </WrapperContentPopup>
                            </li>

                            <li>
                              <WrapperContentPopup
                                onClick={() => handleClickBtnLogout()}
                              >
                                Đăng xuất
                              </WrapperContentPopup>
                            </li>
                          </ul>
                        }
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                        className="flex-center-center Popover"
                      >
                        {userAvatar ? (
                          <img
                            className="avatar-login-user"
                            src={userAvatar}
                            alt="avatar"
                          ></img>
                        ) : (
                          <LuUser
                            style={{ fontSize: "35px", padding: "0 6px" }}
                          ></LuUser>
                        )}
                        <Button>
                          <span onClick={hide}>{userRedux.name}</span>
                        </Button>
                      </Popover>
                    </>
                  </div>
                ) : (
                  <div
                    className="None-account"
                    onClick={() => handleClickIconUser()}
                  >
                    {/* Icons User */}
                    <AiOutlineUser className="shopping-cart-icons user"></AiOutlineUser>
                    <span className="text-lg">tài khoản</span>
                  </div>
                )}
                {/* <div className="favorite-box flex-center-center">
              <AiOutlineHeart className="shopping-cart-icons icons"></AiOutlineHeart>
              <div className="favorite flex-center-center">1</div>
            </div> */}
              </div>
            </Loading>
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
