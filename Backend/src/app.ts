import express from 'express'
import cors from 'cors';
import { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Api is working');
});


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

export default app;