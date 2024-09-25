import axios from "axios";
import { axiosJWT } from "./UserServices";

// POST CREATE PRODUCT
export const createProduct = async (data) => {
  // data ở phía sau đường link == truyền data dưới dạng object body
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};

// GET ALL PRODUCT
export const getAllProduct = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`,
    data
  );
  return res.data;
};

// GET DETAILS PRODUCT BY ID
export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/details/${id}`
  );
  return res.data;
};

// POST UPDATE PRODUCT BY ID
export const upDateProducts = async (id, access_token, data) => {
  try {
    // thông qua id , và access_token chỉ cho phép update product bởi admin.
    const res = await axiosJWT.put(
      `${process.env.REACT_APP_API_URL}/product/update/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log("error :", error);
  }
};
