import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // or any email provider you are using
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
};

// Function to send OTP email
export const sendOTPEmail = async (email) => {
  const otp = generateOTP();
  const otpExpiration = Date.now() + Number(process.env.OTP_EXPIRATION_TIME); // OTP expires after 5 minutes

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Email Verification',
    html: `<p>Your OTP is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes.</p>`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    // Return OTP and expiration time for later verification
    return { otp, otpExpiration };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Error sending OTP email.');
  }
};

export default sendOTPEmail;