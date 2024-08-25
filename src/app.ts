import express, { Application } from 'express';
import authRoutes from './routes/auth.route';
import { AppDataSource } from './config/data-source';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    // Add other middlewares here, e.g., cors, helmet, etc.
  }

  private initializeRoutes() {
    this.app.use('/api', authRoutes);
    // You can add more route files here as needed
  }

  private async initializeDatabase() {
    try {
      await AppDataSource.initialize();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
}

export default new App().app;
