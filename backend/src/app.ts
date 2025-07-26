import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
