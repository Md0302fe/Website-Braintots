import React, { Children } from "react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Loading from "../../../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";

import priceImage from "../../../../assets/VND.png";

import * as OrderServices from "../../../../services/OrderServices";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../../../ultils";
import { useNavigate } from "react-router-dom";

const DashboardComponent = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    numberOrders: 0,
    inventory: 10,
    revenue1Days: 0,
    revenue7Days: 0,
    revenue30Days: 0,
  });

  const [limit, setLimit] = useState(12);

  const navigate = useNavigate();

  //  Get danh sách đơn hàng trong hệ thống
  const fetchGetAllOrder = async () => {
    // call api herre
    setLoading(true);
    // data request
    const res = await OrderServices.getAllOrders(limit);
    return res.data;
  };

  // Usequery TỰ GET DỮ LIỆU TỪ PHÍA BE NGAY LẦN ĐẦU RENDER THIS COMPONENT.
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchGetAllOrder,
    retry: 1,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const { isLoading, data: orders } = queryOrder;

  useEffect(() => {
    setLoading(true);
    if (!isLoading) {
      console.log("orders => ", orders);
      setStats((prev) => ({
        ...stats,
        numberOrders: orders?.length,
        revenue1Days: totalPrices("revenue1Days", orders),
        revenue7Days: totalPrices("revenue7Days", orders),
        revenue30Days: totalPrices("revenue30Days", orders),
      }));

      setRecentOrders(orders);
    }
    setLoading(false);
  }, [isLoading, orders]);

  const totalPrices = (day, orders) => {
    if (!Array.isArray(orders) || orders?.length === 0) return 0;

    const now = new Date();
    let startDate;

    if (day === "revenue1Days") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
    } else if (day === "revenue7Days") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
    } else if (day === "revenue30Days") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30);
    } else {
      return 0;
    }

    return orders
      .filter((order) => new Date(order.createdAt) >= startDate) // Filter Time
      .reduce((acc, order) => acc + order.totalPrice, 0); // Sum
  };
  console.log();
  // Dữ liệu mẫu cho các đơn hàng gần nhất

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Braintots Xin Chào</h1>

      <Loading isPending={isLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Số đơn hàng */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-800">Số Đơn Hàng</h2>
            <p className="text-2xl font-bold mt-2 text-blue-800">
              {stats.numberOrders}
            </p>
          </div>

          {/* Số lượng hàng tồn kho */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-800">
              Hàng Trong Kho
            </h2>
            <p className="text-2xl font-bold mt-2 text-green-800">
              {stats.inventory}
            </p>
          </div>

          {/* Tổng doanh thu trong 1 ngày */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-yellow-800">
              Doanh Thu Ngày
            </h2>
            <p className="text-2xl font-bold mt-2 text-yellow-800">
              {convertPrice(stats.revenue1Days)} VNĐ
            </p>
          </div>

          {/* Tổng doanh thu trong 7 ngày */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-purple-800">
              Doanh Thu Tuần
            </h2>
            <p className="text-2xl font-bold mt-2 text-purple-800">
              {convertPrice(stats.revenue7Days)} VNĐ
            </p>
          </div>

          {/* Tổng doanh thu trong 1 tháng */}
          <div className="bg-red-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-800">
              Doanh Thu Trong Tháng
            </h2>
            <p className="text-2xl font-bold mt-2 text-red-800">
              {convertPrice(stats.revenue30Days)} VNĐ
            </p>
          </div>
        </div>
      </Loading>

      {/* Danh sách đơn hàng gần nhất */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Đơn Hàng Gần Nhất</h2>
          <h2
            className="hover:border-b-2 hover:border-solid cursor-pointer"
            onClick={() => navigate("manage-orders")}
          >
            Quản lý đơn
          </h2>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Khách Hàng
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Số Tiền
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Trạng Thái
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders?.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 font-mono">
                  {index}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 font-extralight">
                  {order.shippingAddress.fullName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 font-extralight">
                  <div className="flex items-center ">
                    {order.totalPrice}
                    <img src={priceImage} alt="" className="size-12" />
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 font-extralight">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Đã giao"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Đang giao"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardComponent;
