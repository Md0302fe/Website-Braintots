const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

// Phương Thức Khởi Tạo 1 New User //
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    //regex check email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = regex.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERROR",
        message: "Bạn cần điền thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Sai định dạng email",
      });
    } else if (password != confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Xác thực mật khẩu không chính xác",
      });
    }
    const respone = await UserService.createUser(req.body);
    // Log ra API check ,
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Login Của user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //regex check email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = regex.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERROR",
        message: "Bạn cần điền thông tin đăng nhập",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Sai tài khoản hoặc mật khẩu",
      });
    }
    const respone = await UserService.userLogin(req.body);
    // Trả về 1 json(object) respone nhận được từ phía services.
    const { refresh_token, ...newRespone } = respone;

    // set option cookie
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samSite: "strict",
    });

    return res.status(200).json(newRespone);
  } catch (error) {
    // Trả về 1 json(object) error nhận được từ catch().
    return res.status(404).json({
      status: "ERROR",
      massage: error,
    });
  }
};

// Phương Thức Update Thông Tin Của User
const updateUser = async (req, res) => {
  try {
    // Lấy được id người dùng thông qua URL (/update-user/:id) / get = params
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      res.status(200).json({
        status: "ERROR",
        message: "The userId is required!",
      });
    }
    const respone = await UserService.updateUser(userId, data);
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Delele User
const deleteUser = async (req, res) => {
  try {
    // Lấy được id người dùng thông qua URL (/update-user/:id) / get = params
    const userId = req.params.id;
    if (!userId) {
      res.status(200).json({
        status: "ERROR",
        message: "The userId is required !",
      });
    }
    // Nếu user đã login -> check có phải admin hay không ?
    const respone = await UserService.deleteUser(userId);
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Delele User
const deleteManyUser = async (req, res) => {
  try {
    // Lấy được id người dùng thông qua URL (/update-user/:id) / get = params
    const ids = req.body;
    if (!ids) {
      res.status(200).json({
        status: "ERROR",
        message: "The ids is required !",
      });
    }
    // Nếu user đã login -> check có phải admin hay không ?
    const respone = await UserService.deleteManyUser(ids);
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Get All User
const getAllUser = async (req, res) => {
  try {
    const respone = await UserService.getAllUser();
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Get Detail User
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const respone = await UserService.getDetailUser(userId);
    // Log API Check
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      eMsg: error,
    });
  }
};

// Phương Thức Refresh Token For User
const refreshToken = async (req, res) => {
  try {
    // Lấy ra token từ cookie
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const respone = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// Phương Thức Logout
const userLogout = async (req, res) => {
  try {
    // clear cookie
    res.clearCookie("refresh_token");

    // Xóa dữ liệu trên client
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("user");

    // trả về respone thành công.
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully ",
    });
  } catch (error) {
    // trả về 1 đoạn lỗi.
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  userLogout,
  deleteManyUser,
};

// File này nằm trong controller / Folder điều khiển
// Controller chứa logic xử lý từng yêu cầu cụ thể, kiểm tra dữ liệu yêu cầu, và đưa ra phản hồi cho client.
// Controller nhận dữ liệu từ route, gọi service để thực hiện các thao tác cần thiết, và sau đó trả về kết quả.
// Giúp tách biệt giữa luồng điều khiển và xử lý logic phức tạp.

// req.body (sau khi có body-parse giúp trã giữ liệu về dạng json) => dữ liệu có sẳn ở dạng object
