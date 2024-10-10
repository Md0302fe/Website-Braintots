const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); // Tải các biến môi trường từ tệp .env vào process.env.

// access token
const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "1d",
  });
  return access_token;
};

// refresh token
const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return refresh_token;
};

// Refresh Token Service => Gia hạn lại token đã hết hạn
const refreshTokenJwtService = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authentication error at refreshTokenJwtService",
          });
        } else {
          // tạo lại 1 access token dựa trên refresh token gia hạn
          const access_token = await genneralAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin,
          });
          resolve({
            status: "OK",
            message: "Refresh token success",
            access_token,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
};

// Tại sao cần tạo access_token và refresh_token khi đăng nhập thành công?

/*
  Chức năng: Được sử dụng để xác thực người dùng trong các yêu cầu tiếp theo. 
  Mỗi lần người dùng gửi yêu cầu đến server (ví dụ: lấy dữ liệu, tạo mới, v.v.), 
  access_token được gửi kèm để xác thực rằng người dùng đã đăng nhập.
  Thời gian sống ngắn: Thường có thời gian sống ngắn (ví dụ: 15 phút, 30 phút). 
  Điều này đảm bảo rằng nếu token bị rò rỉ, hacker chỉ có thể truy cập trong một thời gian giới hạn.
*/
