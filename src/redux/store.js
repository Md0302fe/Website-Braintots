import { combineReducers, configureStore } from "@reduxjs/toolkit";

import productReducer from "./slides/productSlides";
import userReducer from "./slides/userSlides";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // Chỉ lưu user
};

// counter: counterReducer: Đặt counterReducer để xử lý state của phần counter trong Redux store.
//user: userReducer: Đặt userReducer để xử lý state của phần user trong Redux store.
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
