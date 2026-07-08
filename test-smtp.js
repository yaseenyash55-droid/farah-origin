const nodemailer = require("nodemailer");

async function test() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "farahorigin.shop@gmail.com",
      pass: "qkuwnxockcaqdkld",
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Farah Origin" <farahorigin.shop@gmail.com>',
      to: "farahorigin.shop@gmail.com", 
      subject: "Test Email",
      text: "Testing SMTP configuration.",
    });
    console.log("Success:", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
