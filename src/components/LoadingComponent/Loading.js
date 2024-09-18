import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ children, isPending, delay = 300 }) => {
  return (
    <Spin
      spinning={isPending} // Đặt spinning dựa trên isLoading từ mutation
      delay={delay}
      indicator={<LoadingOutlined spin />}
    >
      {children}
    </Spin>
  );
};

export default Loading;
