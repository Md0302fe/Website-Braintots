import React from "react";
import Header from "./Header/Header";
import Navigation from "./Header/Navigation";
import Subnav from "./Header/Subnav";

const Default = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <Navigation></Navigation>
      <Subnav></Subnav>
      {children}
    </div>
  );
};

export default Default;
