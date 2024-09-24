import React from "react";
import "./User.scss";
import { Button } from "antd";
import { BsPersonAdd } from "react-icons/bs";
import TableUser from "./TableUser";

const UserComponent = () => {
  return (
    <div className="Wrapper-Admin-User">
      <div className="Main-Content">
        <h5 className="content-title">quản lý người dùng</h5>
        <div className="content-addUser">
          <Button>
            <BsPersonAdd></BsPersonAdd>
          </Button>
        </div>
        <div className="content-main-table-user">
          <TableUser></TableUser>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
