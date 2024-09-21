import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as UserServices from "./services/UserServices";

import routes from "./routes/routes";
import Default from "./components/Default";
import { ToastContainer } from "react-toastify";
import { isJsonString } from "./ultils";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slides/userSlides";
import Loading from "./components/LoadingComponent/Loading";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

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

  // CÁI HÀM NÀY NÓ SẼ GET TOKEN ĐANG CÓ TRÊN HEADERS , sao đó kiểm tra xem TOKEN còn hoạt động hay không
  // NẾU KHÔNG HOẠT ĐỘNG SẼ CẤP LẠI 1 ACCESS_TOKEN mới --> CẤP TOKEN MỚI ĐỒNG NGHĨA GET lại DETAILS USER Ở TRANG HEADER.
  // axiosJWT.interceptors.request.use() : thiết lập 1 config giúp call lại token đã hết hạn mà k cần phải gọi lại hàm refresh_token
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
      // Do something with request error
      return Promise.reject(error);
    }
  );

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

  return (
    <div>
      {/* loading when get user data -- authentication admin ...*/}
      <Loading isPending={isLoading}>
        <Router>
          <Routes>
            {/* routes.map */}
            {routes.map((route) => {
              const Page = route.page;
              // biến kiểm tra : nếu page này không yêu cầu quyền riêng tư hoặc là admin
              const isPrivate = !route.isPrivate || user?.isAdmin;
              const Layout = route.isShowHeader ? Default : Fragment;
              return (
                <Route
                  key={route.path}
                  path={isPrivate ? route.path : undefined}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              );
            })}
          </Routes>
        </Router>
      </Loading>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
