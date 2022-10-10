import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: true,
    lgoinData: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.lgoinData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    loginSuccess
} = loginSlice.actions;

export default loginSlice.reducer;
