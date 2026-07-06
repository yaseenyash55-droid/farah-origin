import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { supabase } from './supabase';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Helper to generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendSMS = async (to: string, otp: string) => {
  if (!accountSid || !accountSid.startsWith('AC') || !authToken || !twilioPhoneNumber) {
    console.warn('Twilio credentials missing or invalid. Simulating SMS OTP:', otp);
    return true;
  }
  
  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({
      body: `Your Farah Origin verification code is: ${otp}`,
      from: twilioPhoneNumber,
      to,
    });
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

export const sendEmail = async (to: string, otp: string) => {
  if (!process.env.EMAIL_SERVER_HOST || process.env.EMAIL_SERVER_HOST === 'smtp.example.com') {
    console.warn('Email credentials missing or mocked. Simulating Email OTP:', otp);
    return true;
  }
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Farah Origin - Verification Code',
      text: `Your verification code is: ${otp}`,
      html: `<b>Your verification code is: ${otp}</b>`,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
