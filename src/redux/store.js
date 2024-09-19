import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlides";
import userReducer from "./slides/userSlides";

// trung tâm quản lý state cho ứng dụng
export const store = configureStore({
  reducer: {
    // counter: counterReducer: Đặt counterReducer để xử lý state của phần counter trong Redux store.
    counter: counterReducer,
    //user: userReducer: Đặt userReducer để xử lý state của phần user trong Redux store.
    user: userReducer,
  },
});

// Làm việc với một đối tượng để ánh xạ các key (như counter và user)
// với các reducer tương ứng (counterReducer và userReducer).
