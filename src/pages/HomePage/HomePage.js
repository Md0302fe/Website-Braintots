import React from "react";
import "./HomePage.scss";
import Category from "../../components/Category/Category";

const HomePage = () => {
  return (
    <div className="homepage-container flex-center-center">
      <div className="homepage-wrapper Width">
        {/* main-content-banner */}
        <div className="homepage-banner-top"></div>
        <hr />
        <Category></Category>
      </div>
    </div>
  );
};

export default HomePage;
