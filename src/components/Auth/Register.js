import React, { useState, useEffect, useRef } from "react";
import "./Login.scss";
import { AiFillCloseSquare } from "react-icons/ai";
import backgroundRegister from "../../assets/LabubuRegister.png";
const Register = ({
  setLoginActive,
  isRegisterActive,
  registerHiddent,
  setRegisterHiddent,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // khởi tạo giá trị useRef hook
  const overlayRef = useRef(null);

  // dùng useEffect đảm bảo components sau khi mounted hàm này sẽ có đủ thông tin để chạy
  // Để đảm bảo truy cập vào phần tử DOM chỉ khi React đã render xong, bạn nên sử dụng useEffect để đợi đến khi DOM đã sẵn sàng. Dưới đây là cách sửa:
  useEffect(() => {
    overlayRef.current = document.querySelector(".overlay-all");
  }, []);

  // Click Submit Sau Khi Điền Form
  const HandleSubmitFormRegister = () => {};

  // Click Btn Đóng Form
  const handleClickCloseBtn = () => {
    setRegisterHiddent();
  };
  // Clik Btn Đăng Nhập
  const handleSignIn = () => {
    setLoginActive();
    setRegisterHiddent();
  };

  return (
    <div
      className={`login-container overlay-all flex-center-center ${
        isRegisterActive ? "active" : "hiddent"
      } `}
    >
      <div className="Login-wapper Width flex-center-center">
        <div
          className="Goto-Sign-Up"
          style={{ backgroundImage: `url("${backgroundRegister}")` }}
        >
          {/* Button Đăng Ký */}
          <div className="Goto-Sign-Up__btn">
            <button
              className="btn-signup"
              onClick={() => {
                handleSignIn();
              }}
            >
              Đăng Nhập
            </button>
          </div>
        </div>
        {/* Button Close Form */}
        <AiFillCloseSquare
          className="btn-close-form"
          onClick={() => handleClickCloseBtn()}
        ></AiFillCloseSquare>

        <div className="Info-Sign-In">
          <div className="title col-4 mx-auto">Đăng Ký</div>
          <div className="welcome col-4 mx-auto">
            Chào Mừng Bạn Đến Với Thế Giới Đồ Chơi
          </div>
          <div className="content-form col-5 mx-auto">
            {/* 1/ Họ - first Name */}
            <div className="form-group">
              <label className="flex-center-center">
                Họ
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={"text"}
                className="form-control"
                value={email}
                placeholder="Nhận họ của bạn"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>

            {/* 1/ Tên - last Name */}
            <div className="form-group">
              <label>
                Tên <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={"text"}
                className="form-control"
                value={email}
                placeholder="Nhận tên của bạn"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>

            {/* 2/ useName - email */}
            <div className="form-group">
              <label>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={"email"}
                className="form-control"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            {/* 3/ password */}
            <div className="form-group">
              <label>
                Mật khẩu <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={"password"}
                className="form-control"
                value={password}
                placeholder="Mật khẩu "
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <div className="errorShow">
              {/* <span className="forgot-password">Quên mật khẩu ?</span> */}
              {/* <span className="error">{errorMasage || ""}</span> */}
            </div>

            <div>
              <button className="btn-submit">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
