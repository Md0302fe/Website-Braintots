const jwt = require("jsonwebtoken"); // import jsonwebtoken
const dotenv = require("dotenv");
dotenv.config(); // process.env

const authMidleware = async (req, res, next) => {
  // verify a token symmetric
  const stringToken = req.headers.token.split(" ");
  const token = stringToken[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    // err: như token không hợp lệ, hết hạn, hoặc không thể giải mã
    if (err) {
      return res.status(404).json({
        status: "Error at authMidleware",
        message: "The authentications get error",
      });
    } else {
      // ngược lại nếu tìm thấy token -> tiếp đến check admin và tiến hành xóa user
      //  nếu là admin -> next() / ngược lại res về lỗi
      if (user?.isAdmin) {
        next();
      } else {
        return res.status(404).json({
          status: "Error at authMidleware",
          message: "Your authentications is not available for this function",
        });
      }
    }
  });
};

const authUserMidleware = async (req, res, next) => {
  // verify a token symmetric
  const stringToken = req.headers.token.split(" ");
  const token = stringToken[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    // err: như token không hợp lệ, hết hạn, hoặc không thể giải mã
    if (err) {
      return res.status(404).json({
        status: "Error at authMidleware",
        message: "The authentications get error",
      });
    } else {
      // ngược lại nếu tìm thấy token -> tiếp đến check admin và tiến hành xóa user
      const { id, isAdmin } = user;
      //  nếu là admin || only user đó -> next() / ngược lại res về lỗi
      if (isAdmin || id === userId) {
        next();
      } else {
        return res.status(404).json({
          status: "Error at authMidleware",
          message: "Your authentications is not available for this function",
        });
      }
    }
  });
};

module.exports = { authMidleware, authUserMidleware };
