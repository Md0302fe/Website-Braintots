import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "../App";

import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProfilePage from "../pages/Profile.js/ProfilePage";
import UserOrder from "../pages/UserOrder.js/UserOrderPage";
import ProductType from "../pages/ProductType/ProductType";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ManageUser from "../components/Admin/Content/User/AdminUser";
import Product from "../components/Admin/Content/Product/AdminProduct";
import Dashboard from "../components/Admin/Content/Dashboard/Dashboard";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";

import Orders from "../components/Admin/Content/Orders/AdminOrders"
import DeleveringOrders from "../components/Admin/Content/Orders/DeleveringOrders"
import SuccessOrders from "../components/Admin/Content/Orders/SuccessOrders"
import ViewOrder from "../components/ViewOrder/ViewOrder";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "../components/Admin/Admin";
import Categories from "../components/Admin/Content/Product/ProductType";
import ProductTypePage from "../pages/ProductTypePage/ProductTypePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import IntroductionPage from "../pages/IntroductionPage/IntroductionPage";

import ContactPage from "../pages/ContactPage/ContactPage";
import KidsBlogPage from "../pages/KidsBlogPage/KidsBlogPage";

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
          <Route path="/Product-type/:id" element={<ProductTypePage />} />
          <Route path="/infomation-order" element={<UserOrder />} />
          <Route path="/Profile-user" element={<ProfilePage />} />
          <Route path="/View-orders" element={<ViewOrder />} />

          {/* New route for ContactPage */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/kids-blog" element={<KidsBlogPage />} />
          <Route path="/Introduction" element={<IntroductionPage />} />
        </Route>

        {/* payment routes */}
        <Route path="/Payment" element={<PaymentPage />} />

        {/* admin-page  : LayoutAdmin*/}
        <Route path="/system/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-products" element={<Product />} />
          <Route path="manage-categories" element={<Categories />} />

          <Route path="manage-orders" element={<Orders />} />
          <Route path="manage-shippings" element={<DeleveringOrders />} />
          <Route path="manage-success-orders" element={<SuccessOrders />} />


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
