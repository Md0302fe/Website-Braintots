import "./Product.scss";
import React, { useEffect, useRef, useState } from "react";
import TableProduct from "./TableProduct";
import TextArea from "antd/es/input/TextArea";
import Highlighter from "react-highlight-words";

import { Form, Input, Select, Space } from "antd";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import { IoIosRemove } from "react-icons/io";

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
import { useSelector } from "react-redux";
import ModalComponent from "../../../ModalComponent/ModalComponent";
// import { useSelector } from "react-redux"; Need to fix

// ProductServices

const Product = () => {
  // gọi vào store redux get ra user
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadDetails, setIsLoadDetails] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const user = useSelector((state) => state.user);

  //  Search Props
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

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
  //  State Details quản lý products khi có req edit
  const [stateDetails, setStateDetails] = useState({
    name: "",
    masanpham: "",
    type: "",
    countInStock: "",
    price: "",
    image: "",
    description: "",
    rating: "",
  });

  // Fetch : Get Product Details
  const fetchGetProductDetails = async ({ id }) => {
    // call api get product details by id
    const res = await ProductServices.getDetailsProduct(id);
    // Get respone từ api và gán vào state update details
    if (res?.data) {
      setStateDetails({
        name: res?.data.name,
        masanpham: res?.data.masanpham,
        type: res?.data.type?.name,
        countInStock: res?.data.countInStock,
        price: res?.data.price,
        image: res?.data.image,
        description: res?.data.description,
        rating: res?.data.rating,
      });
    }
    setIsLoadDetails(false);
    return res;
  };

  // Handle Click Btn Edit Detail Product : Update product
  const handleDetailsProduct = () => {
    setIsDrawerOpen(true);
  };

  // Handle Confirm Delete Product
  const handleConfirmDelete = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  // Mutation - Update Product
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, dataUpdate } = data;
    // remember return . tránh việc mutationUpdate không trả về data
    return ProductServices.upDateProducts(id, token, dataUpdate);
  });
  const {
    data: dataRes,
    isError: isErrorUpdate,
    isPending: isPendingUpDate,
    isSuccess: isSuccessUpdate,
  } = mutationUpdate;

  // Mutation - Delete Product
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    return ProductServices.deleteProduct(id, token);
  });
  const {
    data: deleteRespone,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = mutationDelete;

  // Handle each time rowSelected was call
  useEffect(() => {
    if (rowSelected) {
      if (isDrawerOpen && isOpenDelete === false) {
        setIsLoadDetails(true);
        fetchGetProductDetails({ id: rowSelected });
      }
    }
  }, [rowSelected, isDrawerOpen, isOpenDelete]);

  // Handle Notification and set loading for delete function
  useEffect(() => {
    if (isSuccessDelete) {
      if (deleteRespone?.status === "OK") {
        setIsOpenDelete(false);
        toast.success(deleteRespone?.message);
      } else {
        toast.success(deleteRespone?.message);
        setIsOpenDelete(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessDelete]);

  // Update stateDetails for form
  useEffect(() => {
    formUpdate.setFieldsValue(stateDetails);
  }, [formUpdate, stateDetails]);
  // handle Notification update product

  // -------------------------------------------------\\
  // Mutation - Create Product
  const mutation = useMutationHooks((data) => {
    const res = ProductServices.createProduct(data.data);
    return res;
  });
  const { isPending: isPendingCreate, data, isSuccess, isError } = mutation;

  // GET ALL PRODUCT AND CATEGORY LIST FROM DB
  const fetchAllProductAndListCategory = async () => {
    const products = await ProductServices.getAllProduct();
    // call api get all category list
    const categoryList = await ProductServices.getAllCategory();
    return {
      products: products,
      categories: categoryList,
    };
  };

  // Usequery tự động call api lấy dữ liệu ngay lần đầu components này được render.
  const queryProduct = useQuery({
    queryKey: ["product"],
    queryFn: fetchAllProductAndListCategory,
  });
  // kết quả trả về sau khi useQuery thực thi
  const { isLoading, data: queryData } = queryProduct;
  // tách 2 biến kết quả của useQuery.
  const products = queryData?.products;
  const categories = queryData?.categories;

  const onFinish = () => {
    mutation.mutate(
      { data: state },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  // Submit Form Update Product
  const onFinishUpdate = () => {
    mutationUpdate.mutate(
      // params 1: Object {chứa thông tin của }
      {
        id: rowSelected,
        token: user?.access_token,
        dataUpdate: stateDetails,
      },
      // callback onSettled : đây là 1 chức năng của useQuery giúp tự động gọi hàm get lại danh sách sản phẩm (cập nhật list mới nhất)
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  // UseEffect - HANDLE Notification success/error CREATE PRODUCT
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "OK") {
        toast.success(data?.message);
        setIsModalOpen(false);
      } else {
        toast.error(data?.message);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  // UseEffect - HANDLE Notification success/error UPDATE PRODUCT
  useEffect(() => {
    if (isSuccessUpdate) {
      if (dataRes?.status === "OK") {
        toast.success(dataRes?.message);
        handleCancelUpdate();
      } else {
        toast.error(dataRes?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdate, isErrorUpdate]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // CANCEL MODAL - Close Modal
  const handleCancel = () => {
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
    formCreate.resetFields();
    setIsModalOpen(false);
  };

  // CANCEL MODAL - DELETE PRODUCT
  const handleCancelDelete = () => {
    setIsOpenDelete(false);
  };

  // CANCEL MODAL - Close Modal - CLOSE FORM UPDATE
  const handleCancelUpdate = () => {
    setStateDetails({
      name: "",
      masanpham: "",
      type: "",
      countInStock: "",
      price: "",
      image: "",
      description: "",
      rating: "",
    });
    formUpdate.resetFields();
    setIsDrawerOpen(false);
  };

  // ONCHANGE FIELDS - CREATE
  const handleOnChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ONCHANGE FIELDS - UPDATE
  const handleOnChangeDetails = (value, name) => {
    setStateDetails((prev) => ({
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

  // CHANGE AVATAR - UPDATE
  const handleChangeAvatarDetails = async (info) => {
    // C2: getBase64
    try {
      const file = info?.fileList[0];
      if (!file?.url && !file?.preview) {
        file.preview = await getBase64(file?.originFileObj);
      }
      setStateDetails((prev) => ({
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
      return {
        ...product,
        key: product._id,
        type: product?.type?.name || "chưa phân loại",
      };
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
          onClick={() => setIsOpenDelete(true)}
        />
      </div>
    );
  };

  // render Category List
  const renderCategory = () => {
    // đảm bảo categories có data và data != rỗng
    if (categories?.data?.length > 0) {
      // nhớ trả về nếu không nó méo render ra gì cả
      return categories?.data?.map((category) => (
        <Select.Option key={category._id} value={category._id}>
          {category.name}
        </Select.Option>
      ));
    }
  };

  const customCloseIcon = (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5%",
        color: "white",
      }}
    >
      <span style={{ textTransform: "uppercase" }}>Đóng</span>
      <IoIosRemove style={{ marginRight: 8, fontSize: "22px" }} />
    </span>
  );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Customize Filter Search Props
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // COLUMNS DATA TABLE
  const columns = [
    {
      title: "Tên SP",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Số lượng",
      dataIndex: "countInStock",
      key: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<= ",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Vote",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: "1*",
          value: "1",
        },
        {
          text: "2*",
          value: "2",
        },
        {
          text: "3*",
          value: "3",
        },
        {
          text: "4*",
          value: "4",
        },
        {
          text: "5*",
          value: "5",
        },
      ],
      onFilter: (value, record) => {
        return value.includes(record?.rating);
      },
    },
    {
      title: "Loại SP",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Mã SP",
      dataIndex: "masanpham",
      key: "masanpham",
      ...getColumnSearchProps("masanpham"),
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
      {/* MODAL - Add New Product */}
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="OK"
        footer={null}
        forceRender
      >
        <hr />
        <div className="Modal-Form-AddNewProduct">
          <Loading isPending={isPendingCreate}>
            <Form
              name="create-form"
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
              form={formCreate}
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
                    message: "Vui lòng phân loại sản phẩm!",
                  },
                ]}
              >
                <Select onChange={(value) => handleOnChange(value, "type")}>
                  {/* render ra categoryList options*/}
                  {renderCategory()}
                </Select>
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
                  Tạo Sản Phẩm
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </div>
      </Modal>

      {/* DRAWER - Update Product */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
        width="40%"
        forceRender
        closeIcon={customCloseIcon}
      >
        {/* truyền 2 isPending : 1 là load lại khi getDetailsProduct / 2 là load khi update product xong */}
        <Loading isPending={isLoadDetails || isPendingUpDate}>
          <Form
            name="update-form"
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
            onFinish={onFinishUpdate}
            autoComplete="on"
            form={formUpdate}
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
                value={stateDetails.name}
                onChange={(event) =>
                  handleOnChangeDetails(event.target.value, "name")
                }
                placeholder="Tên sản phẩm"
              />
            </Form.Item>

            {/* NEW */}
            <Form.Item
              label="Phân loại"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng phân loại sản phẩm!",
                },
              ]}
            >
              <Select
                value={stateDetails.type}
                onChange={(value) => handleOnChangeDetails(value, "type")}
              >
                {/* render ra categoryList options*/}
                {renderCategory()}
              </Select>
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
                value={stateDetails.countInStock}
                placeholder="Số lượng"
                onChange={(value) =>
                  handleOnChangeDetails(value, "countInStock")
                }
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
                placeholder="Giá"
                value={stateDetails.price}
                onChange={(value) => handleOnChangeDetails(value, "price")}
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
                value={stateDetails.description}
                onChange={(event) =>
                  handleOnChangeDetails(event.target.value, "description")
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
                value={stateDetails.rating}
                onChange={(value) => handleOnChangeDetails(value, "rating")}
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
                onChange={(event) => handleChangeAvatarDetails(event)}
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
                value={stateDetails.name}
                onChange={(event) =>
                  handleOnChangeDetails(event.target.value, "masanpham")
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
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      {/* Modal Confirm Delete Product */}
      <ModalComponent
        title="Xóa sản phẩm"
        open={isOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
      >
        <Loading isPending={isPendingDelete}>
          <div>Bạn có chắc muốn xóa sản phẩm không ?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default Product;
