import { Modal } from "antd";
import React from "react";

const ModalComponent = ({ title = "Modal", isOpen = false, isCancel, children, ...rest }) => {
  return (
    <>
      <Modal title={title} open={isOpen} onCancel={isCancel} {...rest}>
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
