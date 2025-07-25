import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice.ts";
import authReducer from "./authSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
