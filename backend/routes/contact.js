const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/contact', async (req, res) => {
  const { name, email, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    await transporter.sendMail({
      from: `"AG Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New inquiry from ${name}${service ? ' — ' + service : ''}`,
      html: `<h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${message}</p>`,
    });
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
