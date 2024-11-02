import React, { useState, useMemo } from "react";
import logo from "../../assets/logo.png";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Form } from "antd";
import { convertPrice } from "./../../ultils";

import image from "../../assets/Labubu.png";

const Payment = () => {
  const user = useSelector((state) => state.user);
  const orderItems = useSelector((state) => state?.order?.orderItems);

  // LƯU Ý PAYMENT NÀY : USER trên redux sẽ được gọi về (thông tin trong account người dùng)
  // lấy thông tin trong màn này của user sẽ được set vào order(model) , save id người dùng vào có gì
  // có thể contact ngược lại nếu thông tin ở màn này người dùng nhập sai.
  const navigate = useNavigate();
  const [stateUser, setStateUser] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    moreInfo: "",
  });

  // use useLocations để nhận biết được trang payment đang gọi tới trang /Profile-user
  // navigate("/link..." , {state : { formPayment :true}});
  const handleUpdateInfo = () => {
    navigate("/Profile-user", { state: { fromPayment: true } });
  };

  const renderOrders = () => {
    return orderItems.map((item) => (
      <div
        className="flex w-full justify-between items-center border-b min-h-20"
        style={{ borderColor: "rgba(0, 0, 0, .05)" }}
      >
        <div className="flex items-center">
          <Badge count={item.amount} size="small">
            <div
              className="size-12 rounded-md mr-3"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
              }}
            ></div>
          </Badge>
          <span className="text-[14px] text-[#424242] font-sans">
            {item.name}
          </span>
        </div>
        <div className="text-[#949494] text-[14px] flex items-center gap-1">
          {convertPrice(item.price)}
          <span className="text-[12px]">đ</span>
        </div>
      </div>
    ));
  };

  const toTalPrice = useMemo(() => {
    const total = orderItems.reduce(
      (acc, order) => acc + order.price * order.amount,
      0
    );
    return total;
  }, [orderItems]);

  // prev => ({...prev,})
  useState(() => {
    setStateUser((prev) => ({
      ...prev,
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
    }));
  }, [user]);

  const handleOnChangeInfo = (value, name) => {
    setStateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {};
  // Submit Form Update Product
  const onFinishUpdate = () => {};

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="Width flex justify-between">
        {/* The left part */}
        <div className="w-[48%] relative flex flex-col">
          <div
            className="w-[22rem] h-[12rem] relative left-[-40px]"
            style={{ backgroundImage: `url(${logo})`, backgroundSize: "cover" }}
          ></div>
          <div className="text-[#202020] text-[14px] flex justify-start items-center gap-3 min-h-[30px]">
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:border-b hover:border-black transition-all duration-200"
            >
              Trang chủ{" "}
            </span>
            <span
              onClick={() => navigate("/View-orders")}
              className="cursor-pointer hover:border-b hover:border-black transition-all duration-200"
            >
              / Giỏ hàng{" "}
            </span>
            <span
              onClick={() => handleConfirm}
              className="cursor-pointer hover:border-b hover:border-black transition-all duration-200"
            >
              / Thanh toán{" "}
            </span>
          </div>
          <div className="uppercase text-[22px] text-[#1B1919] font-semibold my-4 tracking-widest">
            chi tiết đơn hàng
          </div>
          {/* form */}
          <Form>
            <div>
              <div className="mb-4">
                <div className="w-[100%] min-h-[45px] border border-solid border-[#ccc] text-[14px] py-[6] px-3 text-black flex items-center justify-start">
                  {stateUser?.name}
                </div>
              </div>
              <div className="flex justify-between items-center my-4">
                <div className="w-[48%] min-h-[45px] border border-solid border-[#ccc] text-[14px] py-[6] px-3 text-black flex items-center justify-start">
                  {stateUser?.phone}
                </div>
                <div className="w-[48%] min-h-[45px] border border-solid border-[#ccc] text-[14px] py-[6] px-3 text-black flex items-center justify-start">
                  {stateUser?.email}
                </div>
              </div>
              <div className="my-4">
                <div className="w-[100%] min-h-[45px] border border-solid border-[#ccc] text-[14px] py-[6] px-3 text-black flex items-center justify-start">
                  {stateUser?.address}
                </div>
              </div>
              <div className="flex flex-row w-full justify-end">
                <div
                  className="flex justify-center items-center uppercase w-[48%] h-[40px] bg-[#ECECEC] text-[#3E3E3E] cursor-pointer rounded-sm transition-all duration-200 hover:bg-[#3E3E3E] hover:text-white"
                  onClick={() => handleUpdateInfo()}
                >
                  Cập nhật thông tin
                </div>
              </div>

              <div className="my-3 w-full">
                <h1 className="py-4 text-black font-semibold text-xl">
                  Thông tin thêm
                </h1>
                <textarea
                  onChange={(event) =>
                    handleOnChangeInfo(event.target.value, "moreInfo")
                  }
                  type="TextArea"
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm  giao hàng chi tiết hơn."
                  className="w-full border border-[#ccc] py-2 px-2"
                />
              </div>
            </div>
          </Form>
        </div>
        {/* The righy part */}
        <div className="w-[48%] flex justify-start pt-10 border-l border-[#ccc] pl-3">
          <div className="w-full px-3 flex flex-col gap-3">
            {/* render items */}
            {renderOrders()}
            {/* tạm tính */}
            <div
              className="flex w-full justify-between items-center border-b min-h-14"
              style={{ borderColor: "rgba(0, 0, 0, .05)" }}
            >
              <div className="flex items-center text-[14px]">Tạm tính</div>
              <div className="text-[#949494] text-[14px] flex items-center gap-1">
                {convertPrice(toTalPrice)}
                <span className="text-[12px]">đ</span>
              </div>
            </div>
            {/* Tổng cộng */}
            <div
              className="flex w-full justify-between items-center border-b min-h-14"
              style={{ borderColor: "rgba(0, 0, 0, .05)" }}
            >
              <div className="flex items-center text-[14px] uppercase">
                Tổng cộng
              </div>
              <div className="text-[#DD3535] text-[14px] flex items-center gap-1 font-semibold">
                {convertPrice(toTalPrice)}
                <span className="text-[12px]">đ</span>
              </div>
            </div>
            {/* Mã giảm giá */}

            <div
              className="flex w-full justify-between items-center border-b min-h-20 "
              style={{ borderColor: "rgba(0, 0, 0, .05)" }}
            >
              <div className="flex flex-row w-[100%] justify-between">
                    <input
                      className="pl-4 w-[60%] border border-b-slate-500"
                      placeholder="Mã ưi đãi"
                    ></input>
                    <div className="flex justify-center items-center uppercase w-[125px] h-[40px] bg-black text-white cursor-pointer transition-all duration-200 hover:opacity-80">
                      áp dụng
                    </div>
                  </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
