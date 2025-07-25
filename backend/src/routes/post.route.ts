import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import upload from "../utils/multer";
import { verifyToken } from "../utils/token-manage";

const postRouter = Router();

postRouter.route("/").get(verifyToken, getAllPosts);
postRouter.route("/:id").get(verifyToken, getPostById);

postRouter.route("/").post(verifyToken, upload.single("file"), createPost);
postRouter.route("/:id").put(verifyToken, upload.single("file"), updatePost);
postRouter.route("/:id").delete(verifyToken, deletePost);

export default postRouter;
