import { Request, Response } from "express";
import Post from "../models/post.model";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, subject, course } = req.body;
    const author = (req as any).user;

    let fileUrl = "";

    if (req.file) fileUrl = `/uploads/${req.file.filename}`;

    const newPost = await Post.create({
      title,
      content,
      subject,
      course,
      fileUrl,
      author,
    });
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ message: "Error creating post" });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch {
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(post);
  } catch {
    return res.status(500).json({ message: "Error fetching post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if ((req as any).user !== post.author.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.content = req.body.content || post.content;
    await post.save();
    return res.status(200).json(post);
  } catch {
    return res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if ((req as any).user !== post.author.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted" });
  } catch {
    return res.status(500).json({ message: "Failed to delete post" });
  }
};
