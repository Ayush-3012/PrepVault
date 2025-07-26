import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.userId = null;
      state.userDetails = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserInfo, logoutUser, setUserDetails } = authSlice.actions;
export default authSlice.reducer;
