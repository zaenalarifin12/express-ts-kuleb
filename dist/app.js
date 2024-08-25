"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const data_source_1 = require("./config/data-source");
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeDatabase();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        // Add other middlewares here, e.g., cors, helmet, etc.
    }
    initializeRoutes() {
        this.app.use('/api', auth_route_1.default);
        // You can add more route files here as needed
    }
    async initializeDatabase() {
        try {
            await data_source_1.AppDataSource.initialize();
            console.log('Database connected successfully');
        }
        catch (error) {
            console.error('Database connection failed:', error);
        }
    }
}
exports.default = new App().app;
