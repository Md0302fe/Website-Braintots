import React, { useState } from "react";

import { Col, Row } from "antd";
import { InputNumber } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "./../../ultils";
import { removeToCart } from "../../redux/slides/orderSlides";
import { onChangeAmount } from "../../redux/slides/orderSlides";

import Loading from "../LoadingComponent/Loading";
import LayoutTitlePage from "../../assets/page-title-bg.jpg";

const ProductDetailComponent = ({ idProduct }) => {
  // dispath
  const dispath = useDispatch();
  // redux user
  // properties - handle form login Active
  const [isPending, setIsPending] = useState(false);
  // redux
  const orderItems = useSelector((state) => state?.order?.orderItems);

  const handleReloadCart = () => {};

  const handleOnChange = (value, item) => {
    dispath(onChangeAmount({ amount: value, idProduct: item.product }));
  };

  const handleDelete = (idProduct) => {
    setTimeout(() => {
      dispath(removeToCart({ idProduct }));
    }, 1000);
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
            className="w-[80px] h-[80px] rounded-lg"
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
                        className="flex justify-center items-center uppercase w-[80%] h-[40px] bg-[#ECECEC] text-[#3E3E3E] cursor-pointer"
                        onClick={() => handleReloadCart}
                      >
                        Cập nhật giỏ hàng
                      </div>
                    </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ProductDetailComponent;
