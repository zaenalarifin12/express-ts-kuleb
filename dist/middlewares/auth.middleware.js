"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token)
        return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "secret_key");
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
