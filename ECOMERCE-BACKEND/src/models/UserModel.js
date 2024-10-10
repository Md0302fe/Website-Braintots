const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: Number, required: true },
    address: { type: String },
    avatar: { type: String },
    comment: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // References productId
        comment: { type: String, required: true }, // Content Description
        createAt: { type: Date, default: Date.now }, // Date of created
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

/* Tệp JavaScript này định nghĩa một model người dùng trong MongoDB bằng cách sử dụng Mongoose, một thư viện phổ biến để kết nối và làm việc với MongoDB trong Node.js.
    * Các bước thực hiện 

    1. Khai báo và yêu cầu Mongoose: const mongoose = require("mongoose");
    - Dòng này yêu cầu thư viện Mongoose để sử dụng trong ứng dụng.
    Mongoose giúp làm việc với MongoDB, cung cấp các tính năng quản lý dữ liệu như xác thực,
    truy vấn, và mô hình hóa dữ liệu.

    2.Tạo userSchema: Như trên, chứa các trường lưu trữ thông tin của người dùng

    3. Tùy chọn timestamps:
    timestamps: true: Khi tùy chọn này được bật, Mongoose sẽ tự động thêm hai trường createdAt và updatedAt vào model.
    Điều này giúp theo dõi thời điểm khi bản ghi được tạo hoặc cập nhật.

    *** Tóm tắt:
-userSchema định nghĩa cấu trúc của tài liệu người dùng trong cơ sở dữ liệu MongoDB, 
-yêu cầu các trường như tên, email, mật khẩu, số điện thoại, vai trò quản trị, và các token.
-Model User được tạo ra từ schema này để tương tác với cơ sở dữ liệu.
-Các trường createdAt và updatedAt sẽ tự động được thêm vào mỗi khi tạo hoặc cập nhật người dùng.

*/
