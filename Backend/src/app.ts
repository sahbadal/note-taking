import express from 'express'
import cors from 'cors';
import { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import session from 'express-session';
import passport from 'passport';
import './config/passport'; 

const app = express();


const origin = ['http://localhost:5173']

// Middleware
app.use(cors({
  origin,
  credentials: true
}));
app.use(express.json());

app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Api is working');
});


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

export default app;