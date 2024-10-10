const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const {
  genneralAccessToken,
  genneralRefreshToken,
} = require("../services/JwtService");

// Hàm tạo 1 user mới
const createUser = (newUser) => {
  // check existed email
  const ExistedEmail = async (User, email) => {
    const data = await User.findOne({
      email: email,
    });
  };

  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const existedEmail = await User.findOne({
        email: email,
      });
      // nếu existedEmail tồn tại
      if (existedEmail != null) {
        return resolve({
          status: "ERROR",
          message: `Email ${existedEmail.email} đã được sử dụng !`,
        });
      }
      //  Mã hóa dữ liệu password
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      if (createdUser) {
        return resolve({
          status: "OK",
          message: "Tạo tài khoản thành công",
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Handle Login User
const userLogin = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      // Tìm user trong hệ thống thông qua (email) / tìm email -> đợi -> dùng await
      const user = await User.findOne({
        email: email,
      });
      // Nếu user không tồn tại trong hệ thống
      if (user === null) {
        return resolve({
          status: "ERROR",
          message: `Tài khoảng không tồn tại`,
        });
      }
      // So sánh 2 passowrd (password người dùng nhập, password tồn tại trên hệ thống)
      const comparePassword = bcrypt.compareSync(password, user.password);
      // Nếu 2 pass không giống nhau -> res message đến người dùng
      if (!comparePassword) {
        return resolve({
          status: "ERROR",
          message: "Sai tài khoản hoặc mật khẩu !",
        });
      } else {
        // Ngược lại 2 pass = nhau -> res message Successl , tạo token lưu trữ data user.
        const access_token = await genneralAccessToken({
          id: user.id,
          isAdmin: user.isAdmin,
        });
        const refresh_token = await genneralRefreshToken({
          id: user.id,
          isAdmin: user.isAdmin,
        });
        // đăng nhập thành công trả về 1 object chứa 2 token.
        return resolve({
          status: "OK",
          message: "Đăng nhập thành công",
          access_token,
          refresh_token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Update User
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm id trong hệ thống thông qua (_id) / tìm id -> đợi -> dùng await
      const user = await User.findOne({ _id: id });
      // Nếu user không tồn tại trong hệ thống
      if (user === null) {
        return resolve({
          status: "OK",
          message: `Cập nhật người dùng thất bại`,
        });
      }

      // gọi và update user by id + data cần update , nếu muốn trả về object mới cập nhật thì cần thêm {new:true}
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      return resolve({
        status: "OK",
        message: "Cập nhật người dùng thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Delete User
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm user(object) trong hệ thống thông qua (_id) / tìm id -> đợi -> dùng await
      const user = await User.findOne({ _id: id });
      // Nếu user không tồn tại trong hệ thống
      if (user === null) {
        return resolve({
          status: "OK",
          message: `User is not defined !`,
        });
      }
      // gọi và delete user by id
      const deleteUser = await User.findByIdAndDelete(id);
      return resolve({
        status: "OK",
        message: "Xóa tài khoản thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Delete Many User
const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      // gọi và delete user by id
      await User.deleteMany({ _id: ids });
      return resolve({
        status: "OK",
        message: "Xóa danh sách tài khoản thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Get All User
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      return resolve({
        status: "OK",
        message: "Get All User Success",
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm Get Detail User
const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        return resolve({
          status: "OK",
          message: "The user is not defined !",
        });
      }
      return resolve({
        status: "OK",
        message: "Get User Success",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  deleteManyUser,
};

// File services này là file dịch vụ /
// UserService này cung cấp các dịch vụ liên quan tới user.
