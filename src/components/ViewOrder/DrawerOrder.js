import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../ultils";

const DrawerOrder = ({ orders, setDrawerUp }) => {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    setDrawerUp(false);
    navigate("/View-orders");
  };

  const handlePayment = () => {
    setDrawerUp(false);
    navigate("/Payment");
  };

  const totalPrice = useMemo(() => {
    const total = orders.reduce((acc, order) => acc + order.price, 0);
    return total;
  }, [orders]);

  const renderOrderCart = () => {
    return orders?.map((order) => (
      <div key={order?.product} className="flex justify-start mb-2">
        <div
          className="size-12  mr-6"
          style={{
            backgroundImage: `url(${order?.image})`,
            backgroundSize: "cover",
          }}
        ></div>
        <span>{order?.name}</span>
      </div>
    ));
  };

  return (
    <div className="p-4">
      {renderOrderCart()}
      <div className="py-3"></div>
      <hr />
      <div className="flex w-full justify-between items-center py-3">
        <h1 className="">TỔNG THU</h1>
        <div className="text-[#DD3535] flex items-center gap-2">
          <h1 className="text-xl font-semibold">{convertPrice(totalPrice)}</h1>
          <span className="border-b-2 border-b-[#DD3535]">đ</span>
        </div>
      </div>
      <hr />
      <div className="flex flex-col py-2 gap-3">
        <button
          className="py-[10px] bg-gray-200"
          onClick={() => handleViewOrder()}
        >
          XEM GIỎ HÀNG
        </button>
        <button
          className="py-[10px] bg-[#DD3535] text-white"
          onClick={() => handlePayment()}
        >
          THANH TOÁN
        </button>
      </div>
    </div>
  );
};

export default DrawerOrder;
