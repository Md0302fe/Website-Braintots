import axios from "axios";

// GET ALL PRODUCT
export const getAllProduct = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`,
    data
  );
  return res.data;
};

// POST CREATE PRODUCT
export const createProduct = async (data) => {
  // data ở phía sau đường link == truyền data dưới dạng object body
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};
