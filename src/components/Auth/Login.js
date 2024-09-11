import React, { useState, useEffect, useRef } from "react";
import "./Login.scss";
import { AiFillCloseSquare } from "react-icons/ai";

const Login = ({ isLoginActive, setLoginHiddent, setRegisterActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // khởi tạo giá trị useRef hook
  const overlayRef = useRef(null);

  // dùng useEffect đảm bảo components sau khi mounted hàm này sẽ có đủ thông tin để chạy
  // Để đảm bảo truy cập vào phần tử DOM chỉ khi React đã render xong, bạn nên sử dụng useEffect để đợi đến khi DOM đã sẵn sàng. Dưới đây là cách sửa:
  useEffect(() => {
    overlayRef.current = document.querySelector(".overlay-all");
  }, []);

  // handle click login after fill on the blank.
  const handleLogin = () => {};

  // Handle Clicking Close Btn
  const handleClickCloseBtn = () => {
    setLoginHiddent();
  };
  // Handle Cliking Dang Ky Btn
  const handleSignUp = () => {
    setLoginHiddent();
    setRegisterActive();
  };

  return (
    <div
      className={`login-container overlay-all flex-center-center ${
        isLoginActive ? "active" : "hiddent"
      } `}
    >
      <div className="Login-wapper Width flex-center-center">
        <div className="Info-Sign-In">
          <div className="title col-4 mx-auto">Thế Giới Đồ Chơi</div>
          <div className="welcome col-4 mx-auto">Chào Mừng Bạn Trở Lại</div>
          <div className="content-form col-5 mx-auto">
            {/* useName - email */}
            <div className="form-group">
              {/* <label>Email</label> */}
              <input
                type={"email"}
                className="form-control"
                value={email}
                placeholder="Tài khoản"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            {/* password */}
            <div className="form-group">
              {/* <label>Password</label> */}
              <input
                type={"password"}
                className="form-control"
                value={password}
                placeholder="Mật khẩu "
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <div className="errorShow">
              <span className="forgot-password">Quên mật khẩu ?</span>
              {/* <span className="error">{errorMasage || ""}</span> */}
            </div>

            <div>
              <button className="btn-submit" onClick={() => handleLogin()}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>

        <div className="Goto-Sign-Up">
          {/* Button Đăng Ký */}
          <div className="Goto-Sign-Up__btn">
            <button
              className="btn-signup"
              onClick={() => {
                handleSignUp();
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
        {/* Button Close Form */}
        <AiFillCloseSquare
          className="btn-close-form"
          onClick={() => handleClickCloseBtn()}
        ></AiFillCloseSquare>
      </div>
    </div>
  );
};

export default Login;
