const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // OderItems / Sản phẩm đặc hàng
    orderItems: [
      {
        name: { type: String, required: true }, // tên đơn hàng
        amount: { type: Number, required: true }, // số lượng đơn hàng
        image: { type: String, required: true }, // hình ảnh đơn hàng
        price: { type: Number, required: true }, // giá trị của đơn hàng
        // Sản phẩm / Sản phẩm được mua
        product: {
          type: mongoose.Schema.Types.ObjectId, // type theo schema
          ref: "Product", // Link tới Product cụ thể
          required: true,
        },
      },
    ],

    // shippingAddress / Địa chỉ giao hàng
    shippingAddress: {
      fullName: { type: String, required: true }, // tên người dùng
      address: { type: String, required: true }, // địa chỉ người dùng
      city: { type: String, required: true }, // thành phố đang sinh sống
      phone: { type: Number, required: true }, // số điện thoại liên lạc
    },
    // Một số thông tin đơn hàng khác
    paymentMethod: { type: String, required: true }, // phương thức thanh toán
    itemsPrice: { type: Number, required: true }, // giá trị sản phẩm cần thanh toán
    shippingPrice: { type: Number, required: true }, // chi phí vận chuyển
    taxPrice: { type: Number, required: true }, // chi phí thuế
    totalPrice: { type: Number, required: true }, // tổng chi phí cần thanh toán
    // người mua sản phẩm
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPaid: { type: Boolean, default: false }, // đã thanh toán hay chưa
    paidAt: { type: Date }, // thanh toán tại (Ngày ?)
    isDelivered: { type: Boolean, default: false }, // đã vận chuyển hay chưa
    deliveredAt: { type: Date }, // vận chuyển tại (Ngày?)
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
