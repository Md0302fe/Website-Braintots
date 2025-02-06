/* eslint-disable no-unused-vars */
import "./Orders.scss";
import React, { useEffect, useRef, useState } from "react";
import TableOrders from "./TableOrders";
import Highlighter from "react-highlight-words";
import { Form, Input, Modal, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoIosRemove } from "react-icons/io";
import { Button } from "antd";
// services
import { useMutationHooks } from "../../../../hooks/useMutationHook";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

// Loading
import Loading from "../../../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../../../ModalComponent/ModalComponent";
// import { useSelector } from "react-redux"; Need to fix

import * as OrderServices from "../../../../services/OrderServices";
import { convertPrice, converDateString } from "../../../../ultils";

// OrderServices
const DeleveringOrders = () => {
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

  const [loading, setLoading] = useState(false);

  const [panigate, setPanigate] = useState({
    currentPage: 0,
    totalItems: 1,
    size: 4,
  });

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

  const [limit, setLimit] = useState(12);

  //  Get danh sách đơn hàng trong hệ thống
  const fetchGetAllOrder = async () => {
    // call api herre
    setLoading(true);
    // data request
    const res = await OrderServices.getAllDeleveringOrders(limit);
    return res.data;
  };

  // Usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const queryOrder = useQuery({
    queryKey: ["orders-delivering"],
    queryFn: fetchGetAllOrder,
    retry: 1,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const { isLoading, data: orders } = queryOrder;

  const products = queryOrder?.data;

  //  State Details quản lý products khi có req edit
  const [stateDetails, setStateDetails] = useState({
    createdAt: "",
    deliveredAt: "",
    isDelivered: "",
    isPaid: "",
    itemsPrice: "",
    orderItems: [],
    paymentMethod: "",
    shippingAddress: [],
    shippingPrice: 0,
    status: "",
    taxPrice: 0,
    totalPrice: 0,
    user: {},
  });

  // Fetch : Get Product Details
  const fetchGetProductDetails = async ({ id }) => {
    // call api get product details by id
    const res = await OrderServices.getDetailsProduct(id);
    // Get respone từ api và gán vào state update details
    if (res?.status === "OK" && res?.data) {
      setStateDetails({
        createdAt: res?.data.createdAt,
        deliveredAt: res?.data.deliveredAt,
        isDelivered: res?.data.isDelivered,
        countInStock: res?.data.countInStock,
        isPaid: res?.data.isPaid,
        itemsPrice: res?.data.itemsPrice,
        orderItems: res?.data.orderItems,
        paymentMethod: res?.data.paymentMethod,
        shippingAddress: res?.data.shippingAddress,
        shippingPrice: res?.data.shippingPrice,
        status: res?.data.status,
        taxPrice: res?.data.taxPrice,
        totalPrice: res?.data.totalPrice,
        updatedAt: res?.data?.updatedAt,
        user: res?.data?.user,
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
          queryOrder.refetch();
        },
      }
    );
  };

  // Mutation - Update Product
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, dataUpdate } = data;
    const selectedType = dataUpdate?.type;
    // remember return . tránh việc mutationUpdate không trả về data
    //return OrderServices.upDateProducts(id, token, dataUpdate);
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
    // return OrderServices.deleteProduct(id, token);
  });
  const {
    data: deleteRespone,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = mutationDelete;

  // handlePaginate
  const handlePaginate = (current, pageSize) => {
    //current : page hiện tại - pageSize : số lượng phần tử hiện trên trang (default = limit)
    setPanigate({ ...panigate, currentPage: current - 1, size: pageSize });
  };

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

  // UseEffect - HANDLE Notification success/error UPDATE PRODUCT
  // useEffect(() => {
  //   if (isSuccessUpdate) {
  //     if (dataRes?.status === "OK") {
  //       toast.success(dataRes?.message);
  //       handleCancelUpdate();
  //     } else {
  //       toast.error(dataRes?.message);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSuccessUpdate, isErrorUpdate]);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

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
      discount: "",
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

  // Mutation - Delete Order
  const mutationDeleteOrder = useMutationHooks((data) => {
    // call api delete order in system
    const res = OrderServices.cancelOrder(data.orderId);
    return res;
  });
  const { isPending, isSuccess, data } = mutationDeleteOrder;

  useEffect(() => {
    if (isSuccess) {
      setIsDrawerOpen(false);
      const messageText = data.message;
      console.log("data ==>", data);
      if (data.status === "OK") {
        toast.success(messageText);
      } else {
        toast.error(messageText);
      }
    }
  }, [isPending, isSuccess, data]);

  const HandleAcceptOrder = (orderId) => {
    mutationsAcceptOrder.mutate(
      { orderId: orderId, access_token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  // Mutation - Delete Order
  const mutationsAcceptOrder = useMutationHooks((data) => {
    // call api delete order in system
    const res = OrderServices.deliveringSuccess(data.orderId, data.access_token);
    return res;
  });

  const {
    isPending: isPendingAccept = false,
    isSuccess: isSuccessAccept = false,
    data: dataAccept = null,
  } = mutationsAcceptOrder || {};
  console.log(stateDetails);
  useEffect(() => {
    if (isSuccessAccept) {
      setIsDrawerOpen(false);
      const messageText = dataAccept?.message;
      if (dataAccept?.status === "OK") {
        toast.success(messageText);
      } else {
        toast.error(messageText);
      }
    }
  }, [isPendingAccept, isSuccessAccept, dataAccept]);

  // DATA FROM PRODUCTS LIST
  const tableData =
    products?.length &&
    products?.map((product) => {
      return {
        ...product,
        key: product._id,
      };
    });

  // Actions
  const renderAction = () => {
    return (
      <div className="">
        <button
          onClick={handleDetailsProduct}
          className="px-3 py-1 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Xem đơn
        </button>
      </div>
    );
  };

  const renderItems = (order) => {
    const { orderItems } = order;
    if (!orderItems || orderItems.length === 0) {
      return <div>Hiện không có sản phẩm nào</div>;
    }

    return orderItems.map((item) => (
      <div
        key={item?.product}
        className="w-full flex mb-3 mt-1 text-black items-center justify-between"
      >
        <div className="w-[50%] flex justify-start items-center gap-3 mt-2 mb-2">
          <div
            className="w-[50px] h-[50px] rounded-lg cursor-pointer"
            // onClick={() => handleClickImageProduct(item?.product)}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
            }}
          ></div>
          <span className="font-mono">{item.name}</span>
        </div>
        <div className="w-[20%] text-center">{item.amount}</div>
        <div className="w-[10%] text-center font-semibold flex items-center justify-center">
          {convertPrice(item.price * item.amount)}
          <span className="text-xs ml-1 text-[#ff4d4f] border-b border-[#ff4d4f]">
            đ
          </span>
        </div>
      </div>
    ));
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
      title: "Mã đơn hàng",
      dataIndex: "key",
      key: "key",
      ...getColumnSearchProps("key"),
      sorter: (a, b) => a.key.length - b.key.length,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "orderItems", // Để lấy mảng
      key: "orderItemName",
      sorter: (a, b) =>
        (a.orderItems?.[0]?.name || "").localeCompare(
          b.orderItems?.[0]?.name || ""
        ),
      render: (orderItems) => orderItems?.[0]?.name || "Không có dữ liệu", // Kiểm tra mảng rỗng tránh lỗi
    },

    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Đang chờ xác nhận",
          value: "Đang chờ xác nhận",
        },
        {
          text: "Đang giao",
          value: "Đang giao",
        },
        {
          text: "Đã giao",
          value: "Đã giao",
        },
        {
          text: "Đã hủy",
          value: "Đã hủy",
        },
      ],
      onFilter: (value, record) => {
        return value.includes(record?.status);
      },
      render: (status) => {
        let color = "";
        switch (status) {
          case "Đang chờ xác nhận":
            color = "orange";
            break;
          case "Đang giao":
            color = "#FFCC00";
            break;
          case "Đã giao":
            color = "green";
            break;
          case "Đã hủy":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
      },
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
        <h5 className="content-title mb-3">Quản lý đơn vận chuyển</h5>
        <div className="content-main-table-user">
          <TableOrders
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
          ></TableOrders>
        </div>
      </div>

      {/* DRAWER - Update Product */}
      <DrawerComponent
        title="Chi tiết đơn hàng"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
        width="60%"
        forceRender
        closeIcon={customCloseIcon}
      >
        {/* truyền 2 isPending : 1 là load lại khi getDetailsProduct / 2 là load khi update product xong */}
        <Loading isPending={isLoadDetails || isPendingUpDate}>
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-1">
            <div className="flex justify-end uppercase font-bold  border-b-[1px] border-gray-200 pb-3">
              <p className="text-orange-500">{stateDetails?.status}</p>
            </div>
            <div className="py-3">
              <h2 className="uppercase text-xl text-blue-500">
                Thông tin giao hàng
              </h2>
              <h2 className="text-lg">
                Tên người nhận : {stateDetails?.shippingAddress?.fullName}
              </h2>
              <h2 className="text-lg">
                Số điện thoại người nhận : 0
                {stateDetails?.shippingAddress?.phone}
              </h2>
              <h2 className="text-lg">
                Địa chỉ người nhận : {stateDetails?.shippingAddress?.address}
              </h2>
              <h2 className="text-lg">
                Thanh toán :{" "}
                {stateDetails?.isPaid === false
                  ? "Chưa thanh toán"
                  : "Đã thanh toán"}
              </h2>
            </div>
            {renderItems(stateDetails)}
            <div className="flex ">
              {/* left */}
              <div className="w-[60%] flex justify-end ">
                <div className="border-t-2 border-black pt-3">
                  <p className="font-mono text-black text-lg">
                    Cước phí vận chuyển :{" "}
                    <span className="text-red-400">
                      {convertPrice(stateDetails.shippingPrice)} VNĐ
                    </span>
                  </p>
                  <p className="font-mono text-black text-lg">
                    Tổng tiền cần thu :{" "}
                    <span className="text-red-500">
                      {convertPrice(stateDetails.totalPrice)} VNĐ
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end items-end flex-col">
                <div className="w-full flex justify-end items-end gap-3 flex-col">
                  {stateDetails?.status === "Đang giao" && (
                    <>Ngày nhận đơn: {converDateString(stateDetails?.updatedAt)}</>
                  )}
                </div>
                <Loading isPending={isPendingAccept}>
                  <div
                    onClick={() => HandleAcceptOrder(rowSelected)}
                    className="border-2 py-2 flex items-end justify-end px-2 text-center border-green-500 cursor-pointer bg-green-300 hover:border-green-600 hover:bg-slate-100"
                  >
                    Xác nhận thành công
                  </div>
                </Loading>
              </div>
            </div>
          </div>
        </Loading>
      </DrawerComponent>

      {/* TOAST - Notification */}
      <ToastContainer
        hideProgressBar={false}
        position="top-right"
        newestOnTop={false}
        pauseOnFocusLoss
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
        rtl={false}
        draggable
      />

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

export default DeleveringOrders;
