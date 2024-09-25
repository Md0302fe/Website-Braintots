import "./Product.scss";
import React, { useEffect, useState } from "react";
import TableProduct from "./TableProduct";
import TextArea from "antd/es/input/TextArea";

import { Form, Input } from "antd";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

import { BsPersonAdd } from "react-icons/bs";
import { getBase64 } from "../../../../ultils";
import { Button, InputNumber, Modal, Rate, Upload } from "antd";

// services
import * as ProductServices from "../../../../services/ProductServices";
import { useMutationHooks } from "../../../../hooks/useMutationHook";
import { toast } from "react-toastify";

// Loading
import Loading from "../../../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../../DrawerComponent/DrawerComponent";
// import { useSelector } from "react-redux"; Need to fix

// ProductServices

const Product = () => {
  // gọi vào store redux get ra user
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [form] = Form.useForm();

  //  State quản lý khi người dùng tạo mới sản phẩm
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

  // Handle Edit Detail Product
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  // -------------------------------------------------

  // Mutation - Create Product
  const mutation = useMutationHooks((data) =>
    ProductServices.createProduct(data)
  );
  const { isPending, data, isSuccess, isError } = mutation;

  // GET ALL PRODUCT FROM DB
  const fetchGetAllProduct = async () => {
    const res = await ProductServices.getAllProduct();
    return res;
  };

  // usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER COMPONENT Này (Hiển thị list sản phẩm).
  const { isLoading, data: products } = useQuery({
    queryKey: ["product"],
    queryFn: fetchGetAllProduct,
    retry: 1,
    retryDelay: 1000,
  });

  // Submit Form Add New Product
  const onFinish = () => {
    mutation.mutate(state);
  };

  // useEffect - HANDLE Notification success/error CREATE PRODUCT
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      toast.success(data?.message);
      handleCancel();
    } else {
      toast.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // CANCEL MODAL
  const handleCancel = () => {
    setIsModalOpen(false);
    setState({
      name: "",
      masanpham: "",
      type: "",
      countInStock: "",
      price: "",
      image: "",
      description: "",
      rating: "",
    });
    form.resetFields();
  };

  // ONCHANGE FIELDS
  const handleOnChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CHANGE AVATAR - GET IMG
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

  // DATA FROM PRODUCTS LIST
  const tableData =
    products?.data?.length &&
    products?.data.map((product) => {
      return { ...product, key: product._id };
    });

  // Actions
  const renderAction = () => {
    return (
      <div
        className="flex-center-center"
        style={{ justifyContent: "space-around" }}
      >
        <AiOutlineEdit
          style={{ fontSize: "24px", color: "blueviolet", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
        <AiOutlineDelete
          style={{ fontSize: "24px", color: "red", cursor: "pointer" }}
        />
      </div>
    );
  };

  // COLUMNS DATA TABLE
  const columns = [
    {
      title: "Tên SP",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "countInStock",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Vote",
      dataIndex: "rating",
    },
    {
      title: "Loại SP",
      dataIndex: "type",
    },
    {
      title: "Mã SP",
      dataIndex: "masanpham",
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  return (
    <div className="Wrapper-Admin-User">
      <div className="Main-Content">
        <h5 className="content-title">Quản lý sản phẩm</h5>
        <div className="content-addUser">
          <Button onClick={showModal}>
            <BsPersonAdd></BsPersonAdd>
          </Button>
        </div>

        <div className="content-main-table-user">
          <TableProduct
            columns={columns}
            isLoading={isLoading}
            data={tableData}
            setRowSelected={setRowSelected}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          ></TableProduct>
        </div>
      </div>
      {/* Modal Add New Product */}
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={onFinish}
        okText="OK"
      >
        <hr />
        <div className="Modal-Form-AddNewProduct">
          <Loading isPending={isPending}>
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
              autoComplete="on"
              form={form}
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
                  onChange={(event) =>
                    handleOnChange(event.target.value, "name")
                  }
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
                  onChange={(event) =>
                    handleOnChange(event.target.value, "type")
                  }
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
          </Loading>
        </div>
      </Modal>

      {/* DRAWER - COMPONENT */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        placement="right"
        width="50%"
      ></DrawerComponent>
    </div>
  );
};

export default Product;