import React, { useEffect, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import * as UserServices from "../../services/UserServices";
import "./Login.scss";
// react - ui
import { useMutationHooks } from "../../hooks/useMutationHook";
import { AiFillCloseSquare } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";
import { RxCheckCircled } from "react-icons/rx";
// JWT
import { jwtDecode } from "jwt-decode";
// react redux
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlides";

const Login = ({
  isLoginActive,
  setLoginHiddent,
  setRegisterActive,
  setActive,
  active,
}) => {
  // Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateNotification, setStateNotification] = useState(false);
  const dishpatch = useDispatch();

  // Mutation
  const mutation = useMutationHooks((data) => UserServices.userLogin(data));
  const { isPending, data, isSuccess } = mutation;

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      // chuẩn bị active box notification (success/fails)
      setStateNotification(true);
      if (data.status === "OK") {
        // lấy token từ phía BE
        const token = data?.access_token;
        // setItem (token)
        localStorage.setItem("access_token", JSON.stringify(token));
        if (data?.access_token) {
          const decode = jwtDecode(token);
          if (decode?.id) {
            handleGetDetailsUser(decode?.id, token);
          }
        }
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setLoginHiddent();
          setStateNotification(false);
        }, 1000);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (email === "" && password === "") {
      setStateNotification(false);
    }
  }, [email, password]);

  // USER INFOMATIONS
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dishpatch(updateUser({ ...res?.data, access_token: token }));
  };

  // CLICK BTN LOGIN
  const handleLogin = async () => {
    const data = { email, password };
    mutation.mutate(data);
  };

  // CLICK BTN CLOSE
  const handleClickCloseBtn = () => {
    setLoginHiddent();
    setActive(false);
  };

  // CLICK BTN ĐĂNG KÝ
  const handleSignUp = () => {
    setLoginHiddent();
    setRegisterActive();
  };

  return (
    //  Overlay - Login-container
    <div
      className={`login-container overlay-all flex-center-center ${
        isLoginActive && active ? "active" : "hiddent"
      } `}
    >
      {/* Wrapper Login */}
      <div className="Login-wapper Width flex-center-center">
        <div className="Info-Sign-In">
          <div className="title col-8 mx-auto">Thế Giới Đồ Chơi</div>
          <div className="welcome col-8 mx-auto">Chào Mừng Bạn Trở Lại</div>
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

            {/* Forget Password */}
            <div className="forget-password">
              <span>Quên mật khẩu ?</span>
            </div>
            <div
              className={`errorShow register ${
                stateNotification ? "active" : ""
              }`}
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
