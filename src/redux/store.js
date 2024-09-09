import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlides";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
