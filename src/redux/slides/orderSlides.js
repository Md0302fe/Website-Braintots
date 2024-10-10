import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // OderItems / Sản phẩm đặc hàng
  orderItems: [{}],
  // shippingAddress / Địa chỉ giao hàng
  shippingAddress: {},
  // Một số thông tin đơn hàng khác
  shippingPrice: 0,
  paymentMethod: "",
  itemsPrice: 0,
  totalPrice: 0,
  taxPrice: 0,
  // người mua sản phẩm
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlides = createSlice({
  name: "order",
  initialState,
  reducers: {
    // add product to cart
    addToCart: (state, action) => {
      // khi gọi hàm này thông qua dispath = useDishpatch() + kèm theo chứa dữ liệu
      // dữ liệu sẽ được save trong payload của action.payload.
      const { orderItem } = action.payload;
      // tìm kím xem đã có item này tồn tại trong danh sách giỏ hàng hay chưa
      const order = state?.orderItems.find(
        (item) => item?.product === orderItem?.product
      );
      if (order) {
        order.amount += 1;
      } else {
        state.orderItems.push(orderItem);
      }
    },

    // remove product out of cart
    removeToCart: (state, action) => {
      const { idProduct } = action.payload;
      const findOrder = state?.orderItems.find(
        (item) => item?.product !== idProduct
      );
      // chọn ra những product khác product được xóa -> gán ngược cho orderItems
      state.orderItems = findOrder;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeToCart } = orderSlides.actions;

export default orderSlides.reducer;
