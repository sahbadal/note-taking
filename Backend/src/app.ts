import express from 'express'
import cors from 'cors';
import { Request, Response } from 'express';


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Api is working');
});

export default app;