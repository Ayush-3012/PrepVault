import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

// export const {} = postSlice.actions;
export default postSlice.reducer;
