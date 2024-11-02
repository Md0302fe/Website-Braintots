import React, { useMemo, useState } from "react";

import { Col, Row , Badge } from "antd";
import { InputNumber } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "./../../ultils";
import { removeToCart } from "../../redux/slides/orderSlides";
import { onChangeAmount } from "../../redux/slides/orderSlides";
import { useNavigate } from "react-router-dom";

import Loading from "../LoadingComponent/Loading";
import LayoutTitlePage from "../../assets/page-title-bg.jpg";

const ProductDetailComponent = ({ idProduct }) => {
  const user = useSelector((state) => state.user)
  // dispath
  const dispath = useDispatch();
  // redux user
  // properties - handle form login Active
  const [isPending, setIsPending] = useState(false);
  // redux
  const orderItems = useSelector((state) => state?.order?.orderItems);
  const handleReloadCart = () => {};
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/Payment')
    console.log("user ", user);
  }

  const toTalPrice = useMemo(() => {
    const total = orderItems.reduce(
      (acc, order) => acc + order.price * order.amount,
      0
    );
    return total;
  }, [orderItems]);

  const handleOnChange = (value, item) => {
    dispath(onChangeAmount({ amount: value, idProduct: item.product }));
  };

  const handleDelete = (idProduct) => {
    setTimeout(() => {
      dispath(removeToCart({ idProduct }));
    }, 1000);
  };

  const handleClickImageProduct = (id) => {
    navigate(`/Product-Detail/${id}`);
  };

  const renderOrders = () => {
    return orderItems?.map((item) => (
      <div
        key={item?.product}
        className="w-full flex mb-3 mt-3 text-black items-center"
      >
        <div className="w-[50%] flex justify-start items-center gap-3">
          <AiOutlineDelete
            className="size-5 cursor-pointer"
            onClick={() => handleDelete(item?.product)}
          ></AiOutlineDelete>
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
        <div className="w-[20%] text-center">{convertPrice(item?.price)}</div>
        <div className="w-[20%] text-center">
          <InputNumber
            min={1}
            max={20}
            controls={true}
            defaultValue={item.amount}
            onChange={(value) => handleOnChange(value, item)}
            className="text-center"
          />
        </div>
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
    <Loading isPending={isPending}>
      <div className="min-h-screen">
        <div
          className="my-1 w-full h-[100px] text-center"
          style={{ backgroundImage: `url(${LayoutTitlePage})` }}
        >
          <h1 className="text-3xl font-semibold leading-[100px] text-black relative">
            GIỎ HÀNG
          </h1>
        </div>
        <div className="View-Orders-Container w-full flex items-center justify-center">
          <div className="Width flex justify-center">
            <Row className="Wrapper w-[90%] Layout">
              {/* Left Col Content */}
              <Col span={24} className="Left-Col text-[18px] uppercase">
                <div className="w-full flex mb-3 mt-5 font-semibold text-black items-center">
                  <div className="w-[50%] text-center">
                    <span>sản phẩm</span>
                  </div>
                  <div className="w-[20%] text-center">Giá</div>
                  <div className="w-[20%] text-center">Số Lượng</div>
                  <div className="w-[10%] text-center">Tổng</div>
                </div>
                <hr />
              </Col>

              <Col span={24}>
                {/* render product here */}
                <div className="flex flex-col w-full">
                  {/* item here */}
                  {renderOrders()}
                </div>
              </Col>

              <Col className="w-full">
                <div className="w-full my-5"></div>
                <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-row w-[35%] justify-between">
                    <input
                      className="pl-4 w-[60%] border border-b-slate-500"
                      placeholder="Mã ưi đãi"
                    ></input>
                    <div className="flex justify-center items-center uppercase w-[125px] h-[40px] bg-black text-white cursor-pointer">
                      áp dụng
                    </div>
                  </div>
                  <div className="flex flex-row w-[30%] justify-end">
                    <div
                      className="flex justify-center items-center uppercase w-[80%] h-[40px] bg-[#ECECEC] text-[#3E3E3E] cursor-pointer transition-all duration-100 hover:bg-[#3E3E3E] hover:text-white"
                      onClick={() => handleReloadCart}
                    >
                      Cập nhật giỏ hàng
                    </div>
                  </div>
                </div>
              </Col>

              <div className="w-full flex justify-end items-end flex-col p-3 mt-[50px]">
                <div className="w-[50%] flex flex-col justify-center items-center">
                  <h1 className="uppercase mb-3 text-2xl font-semibold  text-black">
                    cộng giỏ hàng
                  </h1>
                  <div className="w-[90%] flex flex-col gap-4 py-3 px-3">
                    <div className="bg-[#f8f8f8] flex flex-col gap-4 py-3 px-3 min-w-[300px]">
                      <div className="w-full flex justify-between items-center py-[15px] px-[10px] text-[14px] font-[500] text-black">
                        <span>Tạm tính</span>
                        <span className="flex items-center justify-center gap-2  text-black">
                          {convertPrice(toTalPrice)}
                          <span className="text-xs">₫</span>
                        </span>
                      </div>
                      <div className="w-full flex justify-between items-center py-[15px] px-[10px] text-[22px] font-semibold text-black">
                        <h1>TỔNG</h1>
                        <h1 className="flex items-center justify-center gap-2">
                          {convertPrice(toTalPrice)}
                          <span className="text-sm">₫</span>
                        </h1>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center h-[50px] bg-[#DD3535] text-white cursor-pointer hover:opacity-80"
                    onClick={() => handlePayment()}
                    >
                      <button className="uppercase">
                        tiến hành thanh toán
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ProductDetailComponent;
