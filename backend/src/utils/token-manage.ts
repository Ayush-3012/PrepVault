import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token Not Received" });

  try {
    const success = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = success;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
