import React, { useState } from "react";

import "./HomPage.scss";

import * as ProductServices from "../../services/ProductServices";
import Category from "../../components/CategoryComponent/Category";
import Loading from "../../components/LoadingComponent/Loading";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

import Subnav from "../../components/HeaderComponent/Subnav";

const HomePage = () => {
  // Lấy thông tin search của người dùng từ redux
  // const searchProduct = useSelector((state) => state?.product?.search_data);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(4);
  // const searchDebounce = useDebounce(searchProduct, 500);

  // Get all product
  const fetchGetAllProduct = async () => {
    setLoading(true);
    // const limit = context?.queryKey && context?.queryKey[1];
    // const searchProduct = context?.queryKey && context?.queryKey[2];
    const res = await ProductServices.getAllProduct();
    setLoading(false);
    return res;
  };

  // Usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const { isLoading, data: products } = useQuery({
    queryKey: ["product"],
    queryFn: fetchGetAllProduct,
    // retry: 1,
    // retryDelay: 1000,
    keepPreviousData: true,
  });

  const handleLoadmore = () => {
    setLoading(true);
    setLimit((prev) => prev + 4);
  };

  return (
    <div className="homepage-container flex-center-center">
      <div className="homepage-wrapper Width">
        {/* main-content-banner */}
        {/* <HomePageBannerTop className="homepage-banner-top"></HomePageBannerTop> */}

        {/* Sub-Nav */}
        <Subnav></Subnav>
        <hr />

        {/* Main-Content */}
        <Loading isPending={isLoading || loading}>
          <Category products={products?.data}></Category>
          <div className="Btn-loadmore">
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
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default HomePage;

/*
- useQuery từ thư viện @tanstack/react-query được sử dụng để quản lý việc gọi API và caching dữ liệu.
- cách dùng : useQuery([...key] , callback call api).
- Khi component HomePage render lần đầu, useQuery sẽ tự động thực thi hàm fetchGetAllProduct để lấy dữ liệu sản phẩm 
bằng cách gọi đến hàm ProductServices.getAllProduct().

- Sau khi API trả về dữ liệu, useQuery sẽ quản lý trạng thái loading (isLoading) và dữ liệu (data),
từ đó giúp component xử lý render dựa trên dữ liệu nhận được.

==> Tóm lại, hàm fetchGetAllProduct sẽ tự động được gọi mỗi khi component HomePage render lần đầu (hoặc khi cache hết hạn),
không cần bạn phải gọi nó thủ công.
*/
