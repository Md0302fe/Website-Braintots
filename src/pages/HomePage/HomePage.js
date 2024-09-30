import React, { useEffect, useRef, useState } from "react";

import "./HomePage";

import * as ProductServices from "../../services/ProductServices";
import Category from "../../components/CategoryComponent/Category";
import Loading from "../../components/LoadingComponent/Loading";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search_data);
  const [stateProduct, setStateProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const refSearch = useRef();

  // Get all product
  const fetchGetAllProduct = async (searchProduct) => {
    const res = await ProductServices.getAllProduct(searchProduct);
    if (searchProduct?.length > 0 || refSearch.current) {
      setStateProduct(res?.data);
    } else {
      return res;
    }
  };

  console.log("Load data > 0 : ", stateProduct);

  // usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const { isLoading, data: products } = useQuery({
    queryKey: ["product"],
    queryFn: fetchGetAllProduct,
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProduct(products?.data);
    }
  }, [products]);

  //Effect when searchProduct change
  useEffect(() => {
    // Lần đầu hook này được gọi , refSearch đang = undefine => không chạy vòng if lần đầu
    if (refSearch.current) {
      setLoading(true);
      fetchGetAllProduct(searchDebounce);
    }
    // sau khi loại bỏ lần đầu chạy set lại giá trị useRef = true => lần sau chạy sẽ vào if
    refSearch.current = true;
    setLoading(false);
  }, [searchDebounce]);

  return (
    <div className="homepage-container flex-center-center">
      <div className="homepage-wrapper Width">
        {/* main-content-banner */}
        {/* <HomePageBannerTop className="homepage-banner-top"></HomePageBannerTop> */}
        <hr />
        <Loading isPending={isLoading || loading}>
          <Category products={stateProduct}></Category>
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
