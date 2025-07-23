import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLikePost,
} from "../controllers/post.controller";
import { verifyToken } from "../utils/token-manage";

const postRouter = Router();

postRouter.route("/").post(verifyToken, createPost);
postRouter.route("/").get(getAllPosts);
postRouter.route("/:id").get(getPostById);
postRouter.route("/:id").put(verifyToken, updatePost);
postRouter.route("/:id").delete(verifyToken, deletePost);
postRouter.route("/:id/like").patch(verifyToken, toggleLikePost);

export default postRouter;
