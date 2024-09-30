import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  isAdmin: false,
  access_token: "",
};

export const userSlides = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id,
        name,
        email,
        phone,
        address,
        avatar,
        isAdmin,
        access_token,
      } = action.payload;
      state.access_token = access_token;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.isAdmin = isAdmin;
    },

    resetUser: (state) => {
      state.access_token = "";
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlides.actions;
export default userSlides.reducer;
