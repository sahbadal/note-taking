import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Note App" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: 'Your OTP Code',
    html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 5 minutes.</p>`,
  });
};

export default sendOtp;
