import { Request, Response } from "express";
import Post from "../models/post.model";

// CREATE
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const author = (req as any).user.id;

    const newPost = await Post.create({ content, author });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

// GET ALL
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// GET SINGLE
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch {
    res.status(500).json({ message: "Error fetching post" });
  }
};

// UPDATE
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // check if the current user is the author
    if ((req as any).user.id !== post.author.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ message: "Failed to update post" });
  }
};

// DELETE
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if ((req as any).user.id !== post.author.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete post" });
  }
};

// LIKE/UNLIKE
export const toggleLikePost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ message: "Error liking/unliking post" });
  }
};
