"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await authService.register(username, email, password);
            res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                // Handle the case where the error is not an instance of Error
                res.status(400).json({ error: "An unexpected error occurred" });
            }
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: "An unexpected error occurred" });
            }
        }
    }
    async getUser(req, res) {
        //   try {
        //     if (!req.user || typeof req.user.id !== "number") {
        //       return res.status(400).json({ error: "Invalid user ID" });
        //     }
        //     const userId = req.user.id;
        //     const user = await UserRepository.findOneBy({ id: userId });
        //     if (!user) {
        //       return res.status(404).json({ error: "User not found" });
        //     }
        //     res.json(user);
        //   } catch (error: unknown) {
        //     if (error instanceof Error) {
        //       res.status(400).json({ error: error.message });
        //     } else {
        //       res.status(400).json({ error: "An unexpected error occurred" });
        //     }
        //   }
    }
}
exports.AuthController = AuthController;
