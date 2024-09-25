import axios from "axios";

export const axiosJWT = axios.create();

export const userLogin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res?.data;
};

export const userRegister = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res?.data;
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
    return res?.data;
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
  return res?.data;
};

export const logoutUser = async () => {
  // gọi api / clearCookie("refresh_token") ;
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};

export const updateUser = async (data) => {
  // gọi api / clearCookie("refresh_token") ;
  console.log("data userservices ", data.data);
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${data.id}`,
    data.data,
    {
      headers: {
        token: `Bearer ${data.access_token}`,
      },
    }
  );
  console.log("res data", res);
  return res?.data;
};

// -----------------------FUNCTION---------------------- //
/* 
Gọi API update-user: Khi bạn gọi API update-user, nếu token vẫn hợp lệ, yêu cầu sẽ được gửi đi ngay lập tức.

Token hết hạn: Nếu token đã hết hạn (thường trả về mã lỗi 401 - Unauthorized),
interceptor mà bạn đã cấu hình sẽ tự động can thiệp.

Refresh token: Interceptor kiểm tra và gọi API để refresh token (thông qua refresh token).
Sau khi có token mới, interceptor sẽ tự động thêm token mới vào request ban đầu (/user/update-user/:id)
và gửi lại yêu cầu.

*/
