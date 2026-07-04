import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, otp } = await request.json();

    if (!email && !phone) {
      return NextResponse.json(
        { success: false, message: "Missing recipient details" },
        { status: 400 }
      );
    }

    let emailSent = false;
    let smsSent = false;
    let errors = {};

    // 1. Send OTP via Email using Nodemailer (if configured)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;

    if (smtpHost && smtpUser && smtpPass && email) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort || 587),
          secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Farah Origin" <${smtpUser}>`,
          to: email,
          subject: `${otp} is your Farah Origin Verification Code`,
          text: `Hi ${name || "User"},\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nThank you,\nFarah Origin Team`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; border: 1px border #e5e7eb; border-radius: 16px; background-color: #ffffff;">
              <h2 style="font-family: Georgia, serif; color: #b45309; text-align: center; margin-bottom: 24px; font-style: italic;">Farah Origin</h2>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">Hi ${name || "User"},</p>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">You are logging in to your Farah Origin account. Use the following One-Time Password (OTP) to complete your verification:</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #111827; letter-spacing: 4px; padding: 12px 24px; background-color: #f3f4f6; border-radius: 8px; border: 1px solid #e5e7eb;">${otp}</span>
              </div>
              <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px; line-height: 1.5;">This code is valid for 10 minutes. If you did not request this, you can safely ignore this email.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err) {
        console.error("Nodemailer error:", err.message);
        errors.email = err.message;
      }
    }

    // 2. Send OTP via SMS using Twilio (if configured)
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

    if (twilioSid && twilioToken && twilioFrom && phone) {
      try {
        const twilio = require("twilio");
        const client = twilio(twilioSid, twilioToken);

        // Normalize phone number to E.164 format if not already (defaulting to +91 for India if no country code)
        let formattedPhone = phone.trim();
        if (!formattedPhone.startsWith("+")) {
          formattedPhone = `+91${formattedPhone}`;
        }

        await client.messages.create({
          body: `[Farah Origin] Verification Code: ${otp}. Valid for 10 minutes.`,
          from: twilioFrom,
          to: formattedPhone,
        });
        smsSent = true;
      } catch (err) {
        console.error("Twilio error:", err.message);
        errors.sms = err.message;
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      smsSent,
      simulated: !emailSent && !smsSent,
      errors: Object.keys(errors).length > 0 ? errors : null,
      message: emailSent || smsSent 
        ? "OTP dispatched successfully!" 
        : "Simulated dispatch (Add SMTP/Twilio env variables for live delivery)"
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
