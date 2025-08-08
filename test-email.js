require('dotenv').config();
const nodemailer = require('nodemailer');

// Log credentials to verify
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'michaelvictoria0422873@gmail.com',
  subject: 'Forgotten Password',
  text: 'Click the link below to reset your password:\n\nhttp://example.com/reset,\n\nIf you did not request this, please ignore this email.',
};
transporter.sendMail(mailOptions)
    .then(() => {
        console.log('Email sent successfully');
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });