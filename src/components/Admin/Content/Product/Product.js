import React, { useState } from "react";
import "./Product.scss";
import { Button, InputNumber, Modal, Rate, Upload } from "antd";
import { BsPersonAdd } from "react-icons/bs";
import TableProduct from "./TableProduct";

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getBase64 } from "../../../../ultils";
import { BiImageAdd } from "react-icons/bi";

// services
import * as ProductServices from "../../../../services/ProductServices";
import { useMutationHooks } from "../../../../hooks/useMutationHook";
import { toast } from "react-toastify";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    masanpham: "",
    type: "",
    countInStock: "",
    price: "",
    image: "",
    description: "",
    rating: "",
  });

  // Mutation
  const mutation = useMutationHooks((data) =>
    ProductServices.createProduct(data)
  );

  const { isPending, data, isSuccess } = mutation;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("data rest ", data)

  // Submit Form Add New Product
  const onFinish = (values) => {
    console.log("state", state);
    mutation.mutate(state);
    if (data?.status !== "Error") {
      toast.error(data?.message);
    } else {
      toast.success(data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {};
  const handleOnChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeAvatar = async (info) => {
    // C2: getBase64
    try {
      const file = info?.fileList[0];
      if (!file?.url && !file?.preview) {
        file.preview = await getBase64(file?.originFileObj);
      }
      setState((prev) => ({
        ...prev,
        image: file.preview,
      }));
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="Wrapper-Admin-User">
      <div className="Main-Content">
        <h5 className="content-title">quản lý sản phẩm </h5>
        <div className="content-addUser">
          <Button onClick={showModal}>
            <BsPersonAdd></BsPersonAdd>
          </Button>
        </div>
        <div className="content-main-table-user">
          <TableProduct></TableProduct>
        </div>
      </div>
      {/* Modal Add New Product */}

      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="OK"
      >
        <hr />
        <div className="Modal-Form-AddNewProduct">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên sản phẩm !",
                },
              ]}
            >
              <Input
                value={state.name}
                onChange={(event) => handleOnChange(event.target.value, "name")}
                placeholder="Tên sản phẩm"
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Phân loại"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền loại sản phẩm !",
                },
              ]}
            >
              <Input
                value={state.type}
                placeholder="Loại sản phẩm"
                onChange={(event) => handleOnChange(event.target.value, "type")}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số lượng sản phẩm !",
                },
              ]}
            >
              {/* InputNumber chỉ trả về giá trị trực tiếp khi thay đổi */}
              <InputNumber
                value={state.countInStock}
                placeholder="Số lượng"
                onChange={(value) => handleOnChange(value, "countInStock")}
              />
            </Form.Item>

            <Form.Item
              label="Giá "
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền giá sản phẩm !",
                },
              ]}
            >
              {/* InputNumber chỉ trả về giá trị trực tiếp khi thay đổi */}
              <InputNumber
                placeholder="Số lượng"
                value={state.price}
                onChange={(value) => handleOnChange(value, "price")}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mô tả sản phẩm !",
                },
              ]}
            >
              <TextArea
                placeholder="Mô tả sản phẩm"
                rows={4}
                value={state.description}
                onChange={(event) =>
                  handleOnChange(event.target.value, "description")
                }
              />
            </Form.Item>

            <Form.Item
              label="Đánh giá"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Vui lòng đánh giá sản phẩm !",
                },
              ]}
            >
              <Rate
                value={state.rating}
                onChange={(value) => handleOnChange(value, "rating")}
                name="rating"
              />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Upload.Dragger
                listType="picture"
                showUploadList={{ showRemoveIcon: true }}
                accept=".png, .jpg, .jpeg, .gif, .webp, .avif, .esp"
                maxCount={1}
                beforeUpload={(file) => {
                  return false;
                }}
                onChange={(event) => handleChangeAvatar(event)}
              >
                <div className="flex-center-center">
                  Upload File Image
                  <BiImageAdd
                    style={{ marginLeft: "10px", fontSize: " 20px" }}
                  ></BiImageAdd>
                </div>
                <br />
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              label="Mã sản phẩm"
              name="masanpham"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mã sản phẩm !",
                },
              ]}
            >
              <Input
                value={state.name}
                onChange={(event) =>
                  handleOnChange(event.target.value, "masanpham")
                }
                name="masanpham"
                placeholder="Mã duy nhất"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ display: "block" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
