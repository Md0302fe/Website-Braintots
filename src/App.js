import React, { useEffect, useState } from "react";
import * as UserServices from "./services/UserServices";

import { Outlet, useMatch } from "react-router-dom";
import { isJsonString } from "./ultils";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlides";
import { jwtDecode } from "jwt-decode";
import { IoIosRemove } from "react-icons/io";
import Drawer from "./components/DrawerComponent/DrawerComponent";

import Loading from "./components/LoadingComponent/Loading";
import Header from "./components/HeaderComponent/Header";
import Navigation from "./components/HeaderComponent/Navigation";
import Login from "./components/AuthComponent/Login";
import Register from "./components/AuthComponent/Register";

import ProductDetailComponent from "./components/ProductDetailComponent/ProductDetailComponent";

const App = ({ loginActive }) => {
  // header icons click state
  const [activeForm, setActiveForm] = useState(false);
  // active register state
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  // active login state
  const [isLoginActive, setIsLoginActive] = useState(false);
  // isActive Drawer Up
  const [drawerUp, setDrawerUp] = useState(false);

  // dispatch
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  // Bạn có thể sử dụng useMatch để kiểm tra xem route có phải là route của ProductDetails không.
  const match = useMatch("/Product-Detail/:id"); // Kiểm tra route

  // Effect 1

  useEffect(() => {
    setIsLoading(true);
    // nhận token về
    const { storageData, decoded } = handleDecoded();
    // kiểm tra decoded có tồn tại hay không --> check token trên localStorage.
    if (decoded?.id) {
      // nếu có decoded (chuỗi token sau mã hóa) --> gọi hàm lấy thông tin người dùng.
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  // Function 8
  const handleDecoded = () => {
    // nhận token về [token này đã có khi người dùng login]
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      // parse dữ liệu thành đối tượng JavaScript , ở đây là chuỗi token.
      storageData = JSON.parse(storageData);
      // giải mã token - get data từ cái token - sinh ra ngay từ lúc user Login
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  // USER INFOMATIONS // handleGetDetailsUser để lấy thông tin người dùng từ server.
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    // dispatch để gửi action updateUser đến Redux để cập nhật thông tin người dùng trong state.
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  // Function 7
  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const customCloseIcon = (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5%",
        color: "white",
      }}
    >
      <span style={{ textTransform: "uppercase" }}>Đóng</span>
      <IoIosRemove style={{ marginRight: 8, fontSize: "22px" }} />
    </span>
  );

  // Authentication form log-in/log-out
  const setLoginActive = () => {
    setIsLoginActive(true);
  };
  const setLoginHiddent = () => {
    setIsLoginActive(false);
  };
  const setRegisterActive = () => {
    setIsRegisterActive(true);
  };
  const setRegisterHiddent = () => {
    setIsRegisterActive(false);
  };

  return (
    <div>
      <Loading isPending={isLoading}>
        <div>
          {/* Header-App */}
          <div className="header-container">
            <Header
              setActive={setActiveForm}
              setIsLoginActive={setIsLoginActive}
              setDrawerUp={setDrawerUp}
            ></Header>
            <div className="navigation-container">
              <Navigation></Navigation>
            </div>
          </div>
          {/* Main-Body-App */}
          <div className="main-container">
            {/* main-content */}
            <div className="app-content">
              {match ? (
                <Outlet context={{ setLoginActive, setActiveForm }}></Outlet>
              ) : (
                <Outlet></Outlet>
              )}
            </div>
          </div>
          {/* LOGIN IF ACTIVE */}
          <activeForm-Authentication>
            {activeForm && (
              <Login
                isLoginActive={isLoginActive}
                setLoginHiddent={setLoginHiddent}
                setRegisterActive={setRegisterActive}
                setActive={setActiveForm}
                active={activeForm}
              />
            )}
            {activeForm && isRegisterActive && (
              <Register
                setLoginActive={setLoginActive}
                setRegisterHiddent={setRegisterHiddent}
                isRegisterActive={isRegisterActive}
                setActive={setActiveForm}
                active={activeForm}
              ></Register>
            )}
          </activeForm-Authentication>
        </div>
      </Loading>

      {/* Footer App */}
      <div className="footer"></div>

      {/* Drawer Cart */}
      <Drawer
        title="Giỏ Hàng"
        isOpen={drawerUp}
        onClose={() => setDrawerUp(false)}
        placement="right"
        width="30%"
        forceRender
        closeIcon={customCloseIcon}
      ></Drawer>

      {/* TOAST - Notification */}
      <ToastContainer
        hideProgressBar={false}
        position="top-right"
        newestOnTop={false}
        pauseOnFocusLoss
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
        rtl={false}
        draggable
      />
    </div>
  );
};

export default App;

/* THÔNG TIN CÁC HÀM HERE */
/* 

Function 7 :
CÁI HÀM NÀY NÓ SẼ GET TOKEN ĐANG CÓ TRÊN HEADERS , sao đó kiểm tra xem TOKEN còn hoạt động hay không
NẾU KHÔNG HOẠT ĐỘNG SẼ CẤP LẠI 1 ACCESS_TOKEN mới (axiosJWT) --> CẤP TOKEN MỚI ĐỒNG NGHĨA GET lại DETAILS USER Ở TRANG HEADER.
axiosJWT.interceptors.request.use() : thiết lập 1 config giúp call lại token đã hết hạn mà k cần phải gọi lại hàm refresh_token
  // Function 7
  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
*/
