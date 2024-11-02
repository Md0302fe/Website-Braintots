import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Popover, Row } from "antd";
import { CiSquareQuestion } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlides";
import { searchProduct } from "../../redux/slides/productSlides";
import { WrapperContentPopup } from "./styles";
import { persistor } from "../../redux/store";

import * as UserServices from "../../services/UserServices";
import Loading from "../LoadingComponent/Loading";
import logoBraintots from "../../assets/logo.png";
import "./Header.scss";

const Header = ({ setActive, setIsLoginActive, setDrawerUp }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  // get Data from redux => JSON data
  const userRedux = useSelector((state) => state.user);
  const orderRedux = useSelector((state) => state.order);

  // framework
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserAvatar(userRedux?.avatar);
  }, [userRedux?.avatar]);

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  // HIDE POP OVER
  const hide = () => {
    setOpen(false);
  };
  // OPEN CHANGE
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  // Click Icons User
  const handleClickIconUser = () => {
    setActive(true);
    setIsLoginActive(true);
  };
  // CLICK BTN LOG-OUT
  const handleClickBtnLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    // sau khi gọi clear Cookie chứa token / set lại state (chứa thông tin user = redux)
    dispatch(resetUser());
    // Xóa dữ liệu trong Redux Persist
    persistor.purge(); // Xóa toàn bộ dữ liệu trong Redux Persist

    // Xóa dữ liệu trong localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    // Đảm bảo Popover đóng lại sau khi đăng xuất
    setOpen(false);
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="Header">
      {/* Topbar - Wrapper */}
      <div className="topbar-wrap flex-center-center">
        <div className="Width flex-center-center">
          <div className="topcontent-left text-black"> Giao hàng siêu tốc</div>
          <div className="topcontent-right flex-center-center">
            <div className="content-rights">
              <CiSquareQuestion className="icons-right text-black"></CiSquareQuestion>
            </div>
            <a href="https://www.dochoigiaotri.com/">
              <div className="content-item text-black">
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
            <div
              style={{
                backgroundImage: `url(${logoBraintots})`,
                width: "100%",
                height: "100px",
                backgroundSize: "cover",
              }}
            ></div>
          </Col>

          <Col span={13} className="Search-box">
            <Search
              className="search-box-item"
              placeholder="Tìm kiếm sản phẩm"
              allowClear
              enterButton="Search"
              size="large"
              onChange={onSearch}
            />
          </Col>
          <Col span={6} className="Shopping-cart flex-center-center">
            <Loading isPending={loading}>
              <div className="Wrapper-Account text-black">
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
                                  style={{ cursor: "pointer" }}
                                  onClick={() => navigate("/system/admin")}
                                >
                                  Quản lý hệ thống
                                </WrapperContentPopup>
                              </li>
                            )}
                            <li>
                              <WrapperContentPopup
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/profile-user")}
                              >
                                Thông tin
                              </WrapperContentPopup>
                            </li>
                            <li>
                              <WrapperContentPopup
                                style={{ cursor: "pointer" }}
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
                    <AiOutlineUser className="shopping-cart-icons user text-black"></AiOutlineUser>
                    <span className="text-lg text-black">tài khoản</span>
                  </div>
                )}
                {/* <div className="favorite-box flex-center-center">
              <AiOutlineHeart className="shopping-cart-icons icons"></AiOutlineHeart>
              <div className="favorite flex-center-center">1</div>
            </div> */}
              </div>
            </Loading>

            <div className="cart-box flex-center-center text-black">
              <Badge count={orderRedux?.orderItems?.length} size="small">
                <HiOutlineShoppingBag
                  className="shopping-cart-icons text-black"
                  onClick={() => setDrawerUp(true)}
                ></HiOutlineShoppingBag>
              </Badge>

              <div className="shopping-cart-price">
                <span className="cart-number">0/</span>
                <span className="cart-total">0 đ</span>
              </div>
            </div>
          </Col>
        </div>
        {/* Drawer Up - CustomDrawer */}
      </Row>
    </div>
  );
};

export default Header;

// ant design / chia phần tử ra thành 24 cột , Col span={...} số cột chiếm trong layout.
