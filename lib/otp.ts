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

export const sendSMS = async (to: string, otp: string): Promise<{ success: boolean, simulated?: boolean }> => {
  const fast2smsAuth = process.env.FAST2SMS_API_KEY;

  if (fast2smsAuth) {
    try {
      const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          "authorization": fast2smsAuth,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          route: "q",
          message: `Your Farah Origin Verification Code is: ${otp}. Valid for 10 minutes.`,
          flash: 0,
          numbers: to.replace("+91", "").replace(/\s/g, ""),
        })
      });
      const data = await response.json();
      if (data.return) {
        return { success: true };
      } else {
        console.error("Fast2SMS API error:", data.message);
        return { success: false };
      }
    } catch (err) {
      console.error("Fast2SMS fetch error:", err);
      return { success: false };
    }
  }

  if (!accountSid || !accountSid.startsWith('AC') || !authToken || !twilioPhoneNumber) {
    console.error('Twilio credentials missing or invalid. SMS failed.');
    return { success: false };
  }
  
  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({
      body: `Your Farah Origin verification code is: ${otp}`,
      from: twilioPhoneNumber,
      to,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false };
  }
};

export const sendEmail = async (to: string, otp: string) => {
  if (!process.env.EMAIL_SERVER_HOST || process.env.EMAIL_SERVER_HOST === 'smtp.example.com') {
    console.error('Email credentials missing or mocked. Email failed.');
    return false;
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
