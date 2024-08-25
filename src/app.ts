import express, { Application } from 'express';
import cors from 'cors';  // Import cors
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
    
    // Add the CORS middleware
    this.app.use(cors({
      origin: 'http://localhost:3000',  // Replace with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers
    }));

    // Add other middlewares here, e.g., helmet, etc.
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
