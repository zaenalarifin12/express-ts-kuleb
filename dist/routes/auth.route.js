"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/home', auth_middleware_1.authMiddleware, authController.getUser);
exports.default = router;
