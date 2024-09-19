import React from "react";
import { WrapperContentProfile, WrapperHeader } from "./styles";

const ProfilePage = () => {
  return (
    <div className="User-Profile Container flex-center-center">
      <WrapperHeader className="Wrapper Width">
        <h1>THÔNG TIN NGƯỜI DÙNG</h1>
      </WrapperHeader>
      <WrapperContentProfile className="text-2xl font-bold mb-4">
        <h1>THÔNG TIN NGƯỜI DÙNG</h1>
      </WrapperContentProfile>
    </div>
  );
};

export default ProfilePage;
