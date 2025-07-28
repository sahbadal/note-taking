import { Request, Response } from 'express';
import User from '../models/User';
import sendOtp from '../utils/sendOtp';
import generateToken from '../utils/generateToken';
import crypto from 'crypto';

const OTP_EXPIRY_MINUTES = 5;

export const sendOtpToEmail = async (req: Request, res: Response) => {
  const { name, email, dob } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (!dob || isNaN(Date.parse(dob))) {
    return res.status(400).json({ message: 'Invalid Date of Birth' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      dob,
      otp,
      otpExpiry,
      authType: 'email',
    });
  } else {
    if (user.authType !== 'email') {
      return res.status(400).json({ message: 'User registered with Google. Please use Google Login.' });
    }
    user.name = name;
    user.dob = dob;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
  }

  await sendOtp(email, otp);

  res.status(200).json({ message: 'OTP sent successfully to email' });
};

export const verifyOtpAndSignup = async (req: Request, res: Response) => {
  const { name, email, dob, otp } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (!dob || isNaN(Date.parse(dob))) {
    return res.status(400).json({ message: 'Invalid Date of Birth' });
  }

  if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ message: 'Invalid OTP format' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.authType !== 'email') {
    return res.status(400).json({ message: 'Use Google to login' });
  }

  if (user.otp !== otp) {
    return res.status(401).json({ message: 'Incorrect OTP' });
  }

  if (user.otpExpiry && user.otpExpiry < new Date()) {
    return res.status(401).json({ message: 'OTP expired' });
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = generateToken(user._id.toString(), user.email);

  res.status(200).json({
    message: 'Signup successful',
    token,
    user: {
      name: user.name,
      email: user.email,
      dob: user.dob,
    },
  });
};



// SEND OTP FOR LOGIN
export const sendOtpForLogin = async (req: Request, res: Response) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found. Please sign up.' });
  }

  if (user.authType !== 'email') {
    return res.status(400).json({ message: 'Please login using Google' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendOtp(email, otp);
  res.status(200).json({ message: 'OTP sent to your email' });
};

// 2 VERIFY OTP FOR LOGIN
export const verifyOtpAndLogin = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ message: 'Invalid OTP format' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.authType !== 'email') {
    return res.status(400).json({ message: 'Please use Google Sign-In' });
  }

  if (user.otp !== otp) {
    return res.status(401).json({ message: 'Incorrect OTP' });
  }

  if (user.otpExpiry && user.otpExpiry < new Date()) {
    return res.status(401).json({ message: 'OTP has expired' });
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = generateToken(user._id.toString(), user.email);

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      name: user.name,
      email: user.email,
      dob: user.dob,
    },
  });
};
