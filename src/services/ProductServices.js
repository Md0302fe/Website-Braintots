import axios from "axios";

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
