import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { generateToken } from "../utils/token-manage";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser?._id.toString());

  return res.status(201).json({ userId: newUser._id, token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);

  res
    .cookie("token", token, { httpOnly: true, secure: false })
    .status(200)
    .json({ user: { name: user.name, email: user.email, id: user._id } });
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user.id).select("-password");
  res.status(200).json({ user });
};
