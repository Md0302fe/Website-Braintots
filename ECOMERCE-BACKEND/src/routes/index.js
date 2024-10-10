//Dòng này dùng để import UserRouter từ file ./UserRouter. File này chứa tất cả các route liên quan đến người dùng (user), ví dụ như các API cho việc đăng ký, đăng nhập, cập nhật thông tin người dùng, v.v.
const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");

//  Định nghĩa hàm routes
//  Đây là một hàm nhận vào đối tượng app (chính là instance của ứng dụng Express).
const routes = (app) => {
  // Tất cả các endpoint được định nghĩa trong UserRouter sẽ có tiền tố /api/user.
  app.use("/api/user", UserRouter);

  // Tất cả các endpoint được định nghĩa trong ProductRouter sẽ có tiền tố /api/product.
  app.use("/api/product", ProductRouter);
};
module.exports = routes;

// UserRouter: Đây là nơi bạn định nghĩa các route liên quan đến người dùng trong file
// UserRouter.js. File này có thể chứa các endpoint như GET /users, POST /users, PUT /users/:id, v.v.
