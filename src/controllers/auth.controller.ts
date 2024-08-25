import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { JWTRequest } from "../interface/JWTRequest";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register(username, email, password);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        // Handle the case where the error is not an instance of Error
        res.status(400).json({ error: "An unexpected error occurred" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unexpected error occurred" });
      }
    }
  }

  async getUser(req: JWTRequest, res: Response) {
    try {
      if (!req.user || typeof req.user.id !== "string" || req.user.id.trim() === "") {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const userId = req.user.id;
      const user = await UserRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unexpected error occurred" });
      }
    }
  }
}
