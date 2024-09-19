import React from "react";
import Header from "./HeaderComponent/Header";
import Navigation from "./HeaderComponent/Navigation";
import { useState } from "react";
import Login from "./AuthComponent/Login";
import Register from "./AuthComponent/Register";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Default = ({ children }) => {
  // trạng thái của layout/Login
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);

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
      {/* Truyền props handle Click Icons Users */}
      <Header loginActive={setLoginActive}></Header>
      <Navigation></Navigation>

      <div className="content">{children}</div>

      {/* Login Components Automatite None Visibilitie */}
      <Login
        isLoginActive={isLoginActive}
        setLoginHiddent={setLoginHiddent}
        setRegisterActive={setRegisterActive}
      ></Login>

      {/* Register Components Automatite None Visibilitie*/}
      <Register
        setLoginActive={setLoginActive}
        setRegisterHiddent={setRegisterHiddent}
        isRegisterActive={isRegisterActive}
      ></Register>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default Default;
