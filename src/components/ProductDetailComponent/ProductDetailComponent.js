import React, { useState, useEffect } from "react";
import "./ProductDetailComponent.scss";

import { Col, Row } from "antd";
import { FaStar } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { addToCart } from "../../redux/slides/orderSlides";

import * as ProductServices from "../../services/ProductServices";
import Loading from "../LoadingComponent/Loading";
import { convertPrice } from "../../ultils";

const ProductDetailComponent = ({ idProduct }) => {
  // dispath
  const dispath = useDispatch();
  // redux user
  const user = useSelector((state) => state.user);

  // properties - handle form login Active
  const { setLoginActive, setActiveForm, setDrawerUp } = useOutletContext();

  const [isDiscount, setIsDiscount] = useState(false);

  // Fetch : Get Product Details
  const fetchGetProductDetails = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getDetailsProduct(id);
    return res.data;
  };

  const handleClickAddToCard = () => {
    if (!user?.id) {
      setLoginActive();
      setActiveForm(true);
    } else {
      dispath(
        addToCart({
          orderItem: {
            name: productDetail?.name,
            amount: 1,
            image: productDetail?.image,
            price: productDetail?.priceAfterDiscount,
            product: productDetail?._id,
          },
        })
      );
      setDrawerUp(true);
    }
  };

  // useQuery / get dữ liệu về khi enable : !!idProduct (trả về true nếu khác undefined và null)
  // nếu muốn truyền params vào hàm queryFn thì nên truyền theo kiểu lấy context ra và get -> đừng truyền thẳng.
  const { isLoading, data: productDetail } = useQuery({
    queryKey: ["detailProduct", idProduct],
    queryFn: fetchGetProductDetails,
    enabled: !!idProduct,
  });

  useEffect(() => {
    if (productDetail) {
      if (
        productDetail.priceAfterDiscount &&
        productDetail.priceAfterDiscount < productDetail.price
      ) {
        setIsDiscount(true);
      } else {
        setIsDiscount(false);
      }
    }
  }, [productDetail]);

  const renderStar = (rate) => {
    // array chứa dữ liệu render
    const render = [];
    for (let i = 0; i < rate; i++) {
      // sau mỗi vòng lặp push data vào render[]
      render.push(
        <FaStar
          key={i}
          style={{ fontSize: "16px", color: "rgba(255,208,0,1" }}
        ></FaStar>
      );
    }
    return render;
  };

  return (
    <Loading isPending={isLoading}>
      <div className="Product-Detail-Container">
        <Row className="Wrapper Layout ">
          {/* Left Col Content */}
          <Col span={12} className="Left-Col flex items-center flex-col">
            <div
              className="Image-Product_Detail"
              style={{ backgroundImage: `url(${productDetail?.image})` }}
            ></div>
            <div className="ExtraImage-Product_Detail flex-center-center">
              {/* extra image below */}
              <div className="extra"></div>
              <div className="extra"></div>
              <div className="extra"></div>
            </div>
          </Col>
          {/* Right Col Content */}
          <Col span={12} className="Right-Col">
            <div className="title">{productDetail?.name}</div>
            <div className="text-[26px]">
              {isDiscount ? (
                <div className="flex flex-col">
                  <span className="line-through text-sm">
                    {convertPrice(productDetail?.price)}đ
                  </span>
                  <span className="pl-3 text-[#DD3535]">
                    {convertPrice(productDetail?.priceAfterDiscount)}đ
                  </span>
                </div>
              ) : (
                <span className="text-black">
                  {convertPrice(productDetail?.price)}đ
                </span>
              )}
            </div>
            {/* main info product details */}
            <div className="product-detail-info">
              <div className="product-des-info">
                {productDetail?.description}
              </div>
              <div className="product-status cursor-pointer">
                {productDetail?.countInStock > 0 && <span>sẳn có</span>}
                <span className="countInStock">
                  {productDetail?.countInStock}
                </span>
              </div>
              <button className="btn-addCart" onClick={handleClickAddToCard}>
                thêm vào giỏ hàng
              </button>
              <div className="flex flex-row">{renderStar(productDetail?.rating)}</div>
            </div>
            {/* sub info product detail */}
            <div className="product-detail-subinfo">
              <div className="info-hotline"></div>
              <div className="favorite flex-center-center cursor-pointer">
                <BiHeart></BiHeart>
                <span>Thêm yêu thích</span>
              </div>
              <div className="info-transfer flex-center-center">
                <div className="trans-items">
                  <div className="trans-items-shipping icons"></div>
                  <div className="trans-items-right">
                    <h2>Miễn phí giao hàng trong Tp HCM</h2>
                    <span>(Sản phẩm trên 690.000đ)</span>
                  </div>
                </div>
                <div className="trans-items">
                  <div className="trans-items-calendar icons"></div>
                  <div className="trans-items-right">
                    <h2>Đổi Trả Dễ Dàng</h2>
                    <span>
                      (Đổi trả trong vòng 3 ngày nếu có lỗi từ nhà sản xuất)
                    </span>
                  </div>
                </div>
                <div className="trans-items">
                  <div className="trans-items-Phone icons"></div>
                  <div className="trans-items-right">
                    <h2>Tổng Đài Bán Hàng 033 309 0XXX</h2>
                    <span>(Hỗ trợ tư vấn từ 8h30 - 21h30 mỗi ngày)</span>
                  </div>
                </div>
              </div>
              <div className="product-code text">
                Mã : <span> {productDetail?.masanpham}</span>
              </div>
              <div className="share flex-center-center text">
                <span>Chia sẻ:</span>
                <div className="share-link flex-center-center">
                  <a href="/" className="share-link-items">
                    <CgFacebook></CgFacebook>
                  </a>
                  <a href="/" className="share-link-items">
                    <BsTwitter></BsTwitter>
                  </a>
                  <a href="/" className="share-link-items">
                    <AiOutlineMail></AiOutlineMail>
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default ProductDetailComponent;
