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
  const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
  const smtpPort = process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || '587';
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM || `"Farah Origin" <${smtpUser}>`;

  if (!smtpHost || smtpHost === 'smtp.example.com') {
    console.error('Email credentials missing or mocked. Email failed.');
    return false;
  }
  
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: emailFrom,
      to,
      subject: 'Farah Origin - Verification Code',
      text: `Your verification code is: ${otp}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; border: 1px border #e5e7eb; border-radius: 16px; background-color: #ffffff;">
          <h2 style="font-family: Georgia, serif; color: #b45309; text-align: center; margin-bottom: 24px; font-style: italic;">Farah Origin</h2>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">You are logging in to your Farah Origin account. Use the following One-Time Password (OTP) to complete your verification:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #111827; letter-spacing: 4px; padding: 12px 24px; background-color: #f3f4f6; border-radius: 8px; border: 1px solid #e5e7eb;">${otp}</span>
          </div>
          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px; line-height: 1.5;">This code is valid for 10 minutes. If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendOrderConfirmationEmail = async (to: string, order: any) => {
  const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
  const smtpPort = process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || '587';
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM || `"Farah Origin" <${smtpUser}>`;

  if (!smtpHost || smtpHost === 'smtp.example.com') return false;
  
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: smtpUser, pass: smtpPass },
    });

    const itemsHtml = order.items.map((item: any) => `
      <div style="display: flex; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">
        <img src="${item.image}" alt="${item.name}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; margin-right: 16px;" />
        <div style="flex-grow: 1;">
          <h4 style="margin: 0; font-size: 16px; color: #111827;">${item.name}</h4>
          <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Qty: ${item.quantity}</p>
        </div>
        <div style="font-weight: bold; color: #111827;">₹${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    await transporter.sendMail({
      from: emailFrom,
      to,
      subject: `Order Confirmation - Farah Origin #${order.orderNumber || order.id}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff;">
          <h2 style="font-family: Georgia, serif; color: #b45309; text-align: center; margin-bottom: 8px; font-style: italic;">Farah Origin</h2>
          <h1 style="text-align: center; font-size: 24px; color: #111827; margin-top: 0;">Order Confirmed! 🎉</h1>
          <p style="font-size: 15px; color: #4b5563; line-height: 1.6; text-align: center;">Thank you for your purchase. We are getting your order ready to be shipped. We will notify you when it has been sent.</p>
          
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin: 30px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #6b7280; font-weight: bold;">Order Number:</span>
              <span style="color: #111827; font-weight: bold;">#${order.orderNumber || order.id}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #6b7280; font-weight: bold;">Total Amount:</span>
              <span style="color: #111827; font-weight: bold;">₹${order.pricing?.total?.toFixed(2) || '0.00'}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280; font-weight: bold;">Payment Method:</span>
              <span style="color: #111827; font-weight: bold;">${order.paymentMethod || order.payment_method}</span>
            </div>
          </div>

          <h3 style="font-size: 18px; color: #111827; margin-bottom: 16px;">Order Summary</h3>
          ${itemsHtml}

          <div style="text-align: center; margin-top: 40px;">
            <a href="https://farah-origin.vercel.app/track?orderId=${order.orderNumber || order.id}" style="display: inline-block; background-color: #b45309; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 9999px;">Track Your Order</a>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
};
