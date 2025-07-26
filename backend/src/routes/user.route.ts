import { Router } from "express";
import { verifyToken } from "../utils/token-manage";
import { Request, Response } from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter
  .route("/auth-status")
  .get(verifyToken, (req: Request, res: Response) => {
    return res.status(200).json({ userId: req.user });
  });
userRouter.route("/profile/:id").get(verifyToken, getProfile);
userRouter.route("/logout").post(verifyToken, logoutUser);

export default userRouter;
