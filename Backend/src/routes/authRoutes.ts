import express from 'express';
import { sendOtpToEmail, verifyOtpAndSignup,verifyOtpAndLogin, sendOtpForLogin } from '../controllers/authController';

const router = express.Router();

router.post('/signup/send-otp', sendOtpToEmail);
router.post('/signup/verify-otp', verifyOtpAndSignup);


// Login routes
router.post('/login/send-otp', sendOtpForLogin);
router.post('/login/verify-otp', verifyOtpAndLogin);


export default router;
