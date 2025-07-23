import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.route";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
