import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRATION = process.env.EXPIRATION_TIME ;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const generateToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, JWT_SECRET, {
    expiresIn: EXPIRATION,
  });
};

export default generateToken;
