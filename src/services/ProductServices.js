import axios from "axios";

// GET ALL PRODUCT
export const getAllProduct = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`,
    data
  );
  return res.data;
};
