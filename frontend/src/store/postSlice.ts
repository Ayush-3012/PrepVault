import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  postDetails: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostDetails: (state, action) => {
      state.postDetails = action.payload;
    },
  },
});

export const { setPosts, setPostDetails } = postSlice.actions;
export default postSlice.reducer;
