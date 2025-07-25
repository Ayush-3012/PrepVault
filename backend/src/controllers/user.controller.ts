import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../utils/token-manage";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: any = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id.toString());

  return res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.params?.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({ user });
};

export const logoutUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Logout successful. Clear token on frontend." });
};
