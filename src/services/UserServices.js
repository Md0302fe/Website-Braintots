import axios from "axios";

export const axiosJWT = axios.create();

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

export const getDetailsUser = async (id, access_token) => {
  // thông qua id , và access_token chỉ cho phép get dữ liệu của only user này
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/user/detail-user/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("getDetailsUser error at Userservices :", error);
  }
};

export const refreshToken = async () => {
  // thông qua id , và access_token chỉ cho phép get dữ liệu của only user này
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  // gọi api / clearCookie("refresh_token") ;
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};
