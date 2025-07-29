import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../config/passport';
import { sendOtpToEmail, verifyOtpAndSignup,verifyOtpAndLogin, sendOtpForLogin } from '../controllers/authController';

const router = express.Router();

router.post('/signup/send-otp', sendOtpToEmail);
router.post('/signup/verify-otp', verifyOtpAndSignup);


// Login routes
router.post('/login/send-otp', sendOtpForLogin);
router.post('/login/verify-otp', verifyOtpAndLogin);





// Google OAuth routes


router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.redirect(`http://localhost:5173/oauth-redirect?token=${token}`);

  }
);

export default router;
