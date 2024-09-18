import React, { useEffect, useState } from "react";
import "./Login.scss";
import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { AiFillCloseSquare } from "react-icons/ai";
import Loading from "../LoadingComponent/Loading";

import { TbFaceIdError } from "react-icons/tb";
import { RxCheckCircled } from "react-icons/rx";

const Login = ({ isLoginActive, setLoginHiddent, setRegisterActive }) => {
  // khởi tạo giá trị useRef hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutationHooks((data) => UserServices.userLogin(data));
  const { isPending, data, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data.status === "OK") {
      setTimeout(() => {
        setLoginHiddent();
      }, 1500);
    }
  }, [isSuccess]);

  // Handle Click Btn Login
  const handleLogin = async () => {
    const data = { email, password };
    mutation.mutate(data);
  };

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
            {/* Email */}
            <div className="form-group">
              {/* <label>Email</label> */}
              <input
                type={"email"}
                className="form-control"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>

            {/* Password */}
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
            <div
              className={`errorShow register ${data?.status ? "active" : ""}`}
            >
              {data?.status === "ERROR" ? (
                <div className="errorShow">
                  <TbFaceIdError className="icons"></TbFaceIdError>
                  <div className="errorBox">
                    <span className="error">{data?.message}</span>
                  </div>
                </div>
              ) : (
                <div className="successShow">
                  <RxCheckCircled className="icons"></RxCheckCircled>
                  <div className="errorBox">
                    <span className="success">{data?.message}</span>
                  </div>
                </div>
              )}
            </div>

            <Loading isPending={isPending}>
              <button
                className="btn-submit"
                onClick={() => handleLogin()}
                disabled={!email.length || !password.length}
              >
                Đăng nhập
              </button>
            </Loading>
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
