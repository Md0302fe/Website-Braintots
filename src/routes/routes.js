import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductType from "../pages/ProductType/ProductType";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import ProfilePage from "../pages/Profile.js/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";

const routes = [
  // Home Page
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  // Order Page
  {
    path: "/Order",
    page: OrderPage,
    isShowHeader: true,
  },
  // Products
  {
    path: "/Products",
    page: ProductsPage,
    isShowHeader: true,
  },
  // Product Following Types
  {
    path: "/Type",
    page: ProductType,
    isShowHeader: true,
  },

  // Product Details
  {
    path: "/Detail",
    page: ProductDetailPage,
    isShowHeader: true,
  },

  // Product Details
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },

  // System/Admin
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },

  // All Link
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];

export default routes;
