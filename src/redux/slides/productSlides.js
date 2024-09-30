import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search_data: "",
};

export const productSlides = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search_data = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlides.actions;

export default productSlides.reducer;
