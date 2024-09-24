import React, { useEffect, useState } from "react";
import "./Login.scss";
import { AiFillCloseSquare } from "react-icons/ai";
import backgroundRegister from "../../assets/LabubuRegister.png";
import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";

import { TbFaceIdError } from "react-icons/tb";
import { RxCheckCircled } from "react-icons/rx";

const Register = ({
  setLoginActive,
  isRegisterActive,
  setRegisterHiddent,
  setActive,
  active,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const mutation = useMutationHooks((data) => UserServices.userRegister(data));
  const { isPending, data, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data.status === "OK") {
      setTimeout(() => {
        setLoginActive();
        setRegisterHiddent();
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // Click Submit Sau Khi Điền Form
  const HandleSubmitFormRegister = () => {
    const data = { name, email, password, confirmPassword, phone };
    mutation.mutate(data);
  };

  // Click Btn Đóng Form
  const handleClickCloseBtn = () => {
    setRegisterHiddent();
    setActive(false);
  };

  // Clik Btn Đăng Nhập
  const handleSignIn = () => {
    setLoginActive();
    setRegisterHiddent();
  };

  return (
    <div
      className={`login-container overlay-all flex-center-center ${
        active && isRegisterActive ? "active" : "hiddent"
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
          {/* FORM SIGN UP */}
          <div className="content-form col-5 mx-auto">
            {/* 1/ Họ - first Name */}
            <div className="form-group">
              <input
                type={"text"}
                className="form-control"
                value={name}
                placeholder="Tên của bạn"
                onChange={(event) => setName(event.target.value)}
                required
              ></input>
            </div>

            {/* 2/ useName - email */}
            <div className="form-group">
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
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Mật khẩu"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {/* 4/ Confirm Password */}
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                placeholder="Xác thực mật khẩu"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>

            {/* 5/ Phone */}
            <div className="form-group">
              {/* <label>
                Phone <span style={{ color: "red" }}>*</span>
              </label> */}
              <input
                type={"text"}
                className="form-control"
                value={phone}
                placeholder="Số điện thoại"
                onChange={(event) => setPhone(event.target.value)}
              ></input>
            </div>

            {/* Error */}
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
                disabled={
                  !name.length ||
                  !email.length ||
                  !password.length ||
                  !confirmPassword.length ||
                  !phone.length
                }
                className="btn-submit"
                onClick={() => HandleSubmitFormRegister()}
              >
                Đăng ký
              </button>
            </Loading>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
