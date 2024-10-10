import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "../App";

import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProfilePage from "../pages/Profile.js/ProfilePage";
import ProductType from "../pages/ProductType/ProductType";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ManageUser from "../components/Admin/Content/User/AdminUser";
import Product from "../components/Admin/Content/Product/AdminProduct";
import Dashboard from "../components/Admin/Content/Dashboard/Dashboard";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "../components/Admin/Admin";
import Categories from "../components/Admin/Content/Product/ProductType";
import ProductTypePage from "../pages/ProductTypePage/ProductTypePage";

const Router = () => {
  return (
    <>
      <Routes>
        {/* Sử dụng nested route bao bọc các outlet cần hiển thị : LayoutHeader*/}
        <Route path="/" element={<App />}>
          {/* Sử dụng index route chỉ dẫn trang mặc định cần hiển thị*/}
          <Route index element={<HomePage />} />
          <Route path="/Order" element={<OrderPage />} />
          <Route path="/Type" element={<ProductType />} />
          <Route path="/Products" element={<ProductsPage />} />
          {/* muốn truyền thêm tham số (params) -> /:params (sau dấu : là tên biến muốn truyền) */}
          <Route path="/Product-Detail/:id" element={<ProductDetailPage />} />
          <Route path="/Profile-user" element={<ProfilePage />} />
          <Route path="/Product-type/:id" element={<ProductTypePage />} />
        </Route>

        {/* admin-page  : LayoutAdmin*/}
        <Route path="/system/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-products" element={<Product />} />
          <Route path="manage-categories" element={<Categories />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Router;
