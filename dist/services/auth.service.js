"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const uuid_1 = require("uuid");
const user_repository_1 = require("../repositories/user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async register(username, email, password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = user_repository_1.UserRepository.create({
            id: (0, uuid_1.v4)(),
            username,
            email,
            password: hashedPassword,
        });
        return user_repository_1.UserRepository.save(user);
    }
    async login(email, password) {
        const user = await user_repository_1.UserRepository.findOneBy({ email });
        if (!user)
            throw new Error("User not found");
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword)
            throw new Error("Invalid password");
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, "secret_key", { expiresIn: "1h" });
        return { token, user };
    }
}
exports.AuthService = AuthService;
