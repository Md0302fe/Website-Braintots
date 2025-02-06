import React, { useEffect, useState } from "react";
import "./styles";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/useMutationHook";

import { convertPrice } from "./../../ultils";

import * as OrderServices from "../../services/OrderServices";
import Loading from "../../components/LoadingComponent/Loading";

import LayoutTitlePage from "../../assets/page-title-bg.jpg";
import EmptyOrder from "../../assets/images/emtpy-card.png";

import {
  WrapperContent,
  WrapperProfileTitle,
  WrapperProfileUser,
} from "./styles";

const Orders = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);

  const fetchGetAllOrder = async () => {
    // call api herre
    setLoading(true);
    // data request
    const res = await OrderServices.getAllOrder(user.id, limit);
    return res.data;
  };

  // Handle Cancel Order
  const HandleCancelOrder = (orderId) => {
    mutationDeleteOrder.mutate(
      { orderId: orderId },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  // Mutation - Delete Order
  const mutationDeleteOrder = useMutationHooks((data) => {
    // call api delete order in system
    const res = OrderServices.cancelOrder(data.orderId);
    return res;
  });
  const { isPending, isSuccess, data } = mutationDeleteOrder;

  console.log("data => ", data);

  useEffect(() => {
    if (isSuccess) {
      const messageText = data.message;
      if (data.status === "OK") {
        toast.success(messageText);
      } else {
        toast.error(messageText);
      }
    }
  }, [isPending, isSuccess, data]);

  // Usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchGetAllOrder,
    retry: 1,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const { isLoading, data: orders } = queryOrder;

  const handleClickImageProduct = (id) => {
    navigate(`/Product-Detail/${id}`);
  };

  const renderOrders = () => {
    if (isLoading) {
      return <Loading isPending={true}></Loading>;
    }
    if (!orders || orders.length === 0) {
      return (
        <div className="cursor-pointer w-full flex justify-center ">
          <img src={EmptyOrder} alt="Emtpty - Order" className="size-96" />
        </div>
      );
    }
    return orders.map((order) => (
      <Loading isPending={isLoading}>
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-1">
          <div className="flex justify-end uppercase font-bold  border-b-[1px] border-gray-200 pb-3">
            <p
              className={`${
                order?.status === "Đang chờ xác nhận"
                  ? "text-orange-500"
                  : order.status === "Đang giao"
                  ? "text-yellow-500"
                  : order?.status === "Đã giao"
                  ? "text-green-600"
                  : "text-gray-500"
              }
            }`}
            >
              {order?.status}
            </p>
          </div>
          {renderItems(order)}
          {/* total price */}
          <div className="flex ">
            {/* right */}
            <div className="w-full flex justify-end items-center ">
              <div className="w-full flex justify-end items-center gap-3">
                <div className="border-2 py-2 px-6 border-gray-100 cursor-pointer hover:border-black hover:bg-slate-100">
                  Liên hệ
                </div>
                {order?.status === "Đang chờ xác nhận" && (
                  <Loading isPending={isPending}>
                    <div
                      onClick={() => HandleCancelOrder(order._id)}
                      className="border-2 py-2 px-6 border-gray-100 cursor-pointer hover:border-black hover:bg-slate-100"
                    >
                      Hủy đơn hàng
                    </div>
                  </Loading>
                )}
              </div>
            </div>
            {/* left */}
            <div className="w-[60%] flex justify-end ">
              <div className="border-t-2 border-black pt-3">
                <p className="font-mono text-black text-lg">
                  Số tiền cần trả :{" "}
                  <span className="text-red-400">
                    {convertPrice(order.totalPrice)} VNĐ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Loading>
    ));
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
            className="w-[80px] h-[80px] rounded-lg cursor-pointer"
            onClick={() => handleClickImageProduct(item?.product)}
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

  return (
    <div className="User-Profile Container flex-center-center">
      <div className="Wrapper Width">
        <WrapperProfileTitle>THÔNG TIN ĐƠN HÀNG</WrapperProfileTitle>
        <Loading isPending={false}>
          <WrapperContent className="pt-3">
            <WrapperProfileUser>
              <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4 flex flex-row w-full justify-between items-center min-h-[60px]">
                      <div className="flex flex-row items-center">
                        <MDBBreadcrumbItem>
                          <span
                            onClick={() => navigate("/")}
                            className="cursor-pointer hover:border-b hover:border-black transition-all duration-200"
                          >
                            Trang chủ
                          </span>
                        </MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Đơn hàng</MDBBreadcrumbItem>
                      </div>
                    </MDBBreadcrumb>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </WrapperProfileUser>
          </WrapperContent>

          <div className="min-h-[50vh]">
            <div
              className="my-1 w-full h-[50px] text-center mb-4"
              style={{ backgroundImage: `url(${LayoutTitlePage})` }}
            >
              <h1 className="text-3xl font-semibold leading-[50px] text-black relative ">
                Đơn Hàng
              </h1>
            </div>
            <div className="View-Orders-Container w-full flex items-center justify-center">
              <div className="Width flex justify-center">
                <Row className="Wrapper w-[90%] Layout">
                  <Col span={24}>
                    {/* render product here */}
                    <div className="flex flex-col w-full">
                      {/* item here */}
                      {renderOrders()}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default Orders;
