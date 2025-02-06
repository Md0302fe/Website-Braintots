import axios from "axios";
import { axiosJWT } from "./UserServices";

// POST Create Order
export const createOrder = async (data) => {
  console.log("data => ", data);
  console.log("Url => ", `${process.env.REACT_APP_API_URL}/order/create`);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data
  );
  console.log("response => : ", res);
  return res?.data;
};

// POST Get All Order
export const getAllOrder = async (userId, limit) => {
  const dataRequest = {
    userId: userId,
    limitPage: limit,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/get-orders`,
    dataRequest
  );
  return res?.data;
};

// POST Get All Order
export const getAllOrders = async (userId, limit) => {
  const dataRequest = {
    userId: userId,
    limitPage: limit,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/get-all-orders`,
    dataRequest
  );
  return res?.data;
};

// POST Get All Order
export const getAllDeleveringOrders = async (userId, limit) => {
  const dataRequest = {
    userId: userId,
    limitPage: limit,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/get-delivering-orders`,
    dataRequest
  );
  return res?.data;
};

// POST Get All Order
export const getAllSuccessOrders = async (userId, limit) => {
  const dataRequest = {
    userId: userId,
    limitPage: limit,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/get-success-orders`,
    dataRequest
  );
  return res?.data;
};



// POST Delete Order
export const cancelOrder = async (orderId) => {
  const dataRequest = {
    orderId,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/cancel`,
    dataRequest
  );
  return res.data;
};

// Put Accept Order
export const acceptOrder = async (orderId, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/order/update/${orderId}`,
    {},
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// Put Accept Order
export const deliveringSuccess = async (orderId, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/order/delivering-success/${orderId}`,
    {},
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// POST CREATE ORDER
export const listOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res?.data;
};

// GET ORDER DETAILS
export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/details/${id}`
  );

  return res?.data;
};
