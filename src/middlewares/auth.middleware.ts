import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTRequest } from "../interface/JWTRequest";

export const authMiddleware = (
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "secret_key") as {
      id: string;
    };
    req.user = {
      id: decoded.id,
    };
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
