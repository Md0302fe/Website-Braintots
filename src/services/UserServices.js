import axios from "axios";
// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userLogin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

export const userRegister = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};
