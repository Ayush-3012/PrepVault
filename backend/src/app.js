import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(` Server is listening to port ${process.env.PORT}`);
});

export default app;
