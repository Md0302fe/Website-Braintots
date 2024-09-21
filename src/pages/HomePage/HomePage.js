import React from "react";
import "./HomePage";
import Category from "../../components/CategoryComponent/Category";
import { useQuery } from "@tanstack/react-query";

import * as ProductServices from "../../services/ProductServices";

const HomePage = () => {
  const fetchGetAllProduct = async () => {
    const res = await ProductServices.getAllProduct();
    return res;
  };

  // usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const { isLoading, data: product } = useQuery({
    queryKey: ["product"],
    queryFn: fetchGetAllProduct,
    retry: 3,
    retryDelay: 1000,
  });


  return (
    <div className="homepage-container flex-center-center">
      <div className="homepage-wrapper Width">
        {/* main-content-banner */}
        {/* <HomePageBannerTop className="homepage-banner-top"></HomePageBannerTop> */}
        <hr />
        <Category product={product}></Category>
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
