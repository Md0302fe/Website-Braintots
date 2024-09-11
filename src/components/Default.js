import React from "react";
import Header from "./Header/Header";
import Navigation from "./Header/Navigation";
import Subnav from "./Header/Subnav";
import { useState } from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

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
        isLoginActive={isLoginActive}
        isRegisterActive={isRegisterActive}
      ></Register>
    </div>
  );
};

export default Default;
