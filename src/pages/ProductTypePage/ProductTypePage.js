import React, { useEffect, useState } from "react";

import "./ProductTypePage.scss";

import * as ProductServices from "../../services/ProductServices";
import Category from "../../components/CategoryComponent/Category";
import Loading from "../../components/LoadingComponent/Loading";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import { Pagination } from "antd";

const ProductTypePage = (props) => {
  // Lấy thông tin search của người dùng từ redux
  const searchProduct = useSelector((state) => state?.product?.search_data);
  const searchDebounce = useDebounce(searchProduct, 500);

  const params = useParams();
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProducts] = useState();
  const id = params?.id;

  const [panigate, setPanigate] = useState({
    currentPage: 0,
    totalItems: 1,
    size: 8,
  });

  const fetchProductByTyped = async (idP, currentPage, limit) => {
    const res = await ProductServices.getProductType(idP, currentPage, limit);
    if (res?.status === "OK") {
      setListProducts(res.data);
      setPanigate({ ...panigate, totalItems: res?.totalItems });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductByTyped(id, panigate?.currentPage, panigate?.size);
    }
  }, [id, panigate?.currentPage]);

  // handlePaginate
  const handlePaginate = (current, pageSize) => {
    //current : page hiện tại - pageSize : số lượng phần tử hiện trên trang (default = limit)
    setPanigate({ ...panigate, currentPage: current - 1, size: pageSize });
  };

  // Get all product
  const fetchGetAllProduct = async (context) => {
    setLoading(true);
    const limit = context?.queryKey && context?.queryKey[1];
    const searchProduct = context?.queryKey && context?.queryKey[2];
    const res = await ProductServices.getAllProduct(searchProduct, limit);
    setLoading(false);
    return res;
  };

  // Usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const { isLoading, data: products } = useQuery({
    queryKey: ["product", limit, searchDebounce],
    queryFn: fetchGetAllProduct,
    retry: 1,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  return (
    <Loading isPending={isLoading || loading}>
      <div className="homepage-container flex-center-center">
        <div className="homepage-wrapper Width">
          <hr />
          {/* Main-Content */}
          <Category products={listProduct}></Category>
          {/* Btn LoadMore */}

          <Pagination
            className="Paginate"
            // page hiện tại : mặc định = 1
            defaultCurrent={panigate.currentPage + 1}
            // totalItems
            total={panigate?.totalItems}
            onChange={(current, pageSize) => handlePaginate(current, pageSize)}
          />

          {/* <div className="Btn-loadmore">
            <button
              className={`btn-leadmore ${
                products?.totalItems <= limit || products?.data?.length <= 0
                  ? "disable"
                  : ""
              }`}
              onClick={handleLoadmore}
              disabled={
                products?.totalItems <= limit || products?.data?.length <= 0
              }
            >
              Xem thêm
            </button>
          </div> */}
        </div>
      </div>
    </Loading>
  );
};

export default ProductTypePage;
