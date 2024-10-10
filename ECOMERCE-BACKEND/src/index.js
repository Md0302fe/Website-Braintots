// import và cấu hình môi trường BE
const express = require("express"); // Import Express.js, một framework web phổ biến dùng để xây dựng các ứng dụng web hoặc API.
const dotenv = require("dotenv"); //Dùng để load các biến môi trường từ file .env vào process.env. Đây là cách tốt để bảo mật thông tin nhạy cảm như các API keys, thông tin database.
const mongoose = require("mongoose"); //Thư viện dùng để kết nối với MongoDB và xử lý các hoạt động liên quan đến database.
const routes = require("./routes"); //  Import các route từ file ./routes. Bạn sẽ định nghĩa các routes của ứng dụng tại file này.
const bodyParser = require("body-parser"); // Middleware dùng để parse JSON request body. Ở đây, bạn dùng để chuyển đổi dữ liệu từ request thành JSON, giúp dễ dàng xử lý.
const cookieParser = require("cookie-parser");
const cors = require("cors");

// dotenv.config() giúp load các biến môi trường từ file .env > load xong cần process.key trong env để sử dụng
dotenv.config();

// Tạo ứng dụng Express và cấu hình cổng
const app = express(); // Tạo một instance của ứng dụng Express.
const port = process.env.PORT; // Thiết lập port localhost

// Limit file load
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use(bodyParser.json()); // Sử dụng middleware bodyParser.json() dùng để parse request có dạng JSON.
app.use(cookieParser()); // Sử dụng middleware cookieParse.json() dùng để parse request có dạng JSON.
// Sử dụng đoạn mã này để chỉ định tùy chọn extended
routes(app); // Triển khai các route từ file ./routes và truyền ứng dụng Express vào.

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_DB) // cần chắc chắn rằng trong file .env đã khai báo biến MONGO_DB chứa URI của MongoDB.
  // respone trả về sau khi connect thành công
  .then(() => {
    console.log("Connect Db Success");
  })
  // respone err trả về nếu có lỗi
  .catch((err) => {
    console.log("Your connect is fail by", err);
  });

// Khởi động server và lắng nghe các yêu cầu từ client trên cổng đã được khai báo.
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
