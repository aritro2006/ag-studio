const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, service, budget, message } = req.body;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'AG Studio Contact', email: 'aritroghosh1512@gmail.com' },
        to: [{ email: 'aritroghosh1512@gmail.com', name: 'Aritro Ghosh' }],
        replyTo: { email: email, name: name },
        subject: `New Project Inquiry from ${name}`,
        htmlContent: `
          <h2 style="color:#6c63ff;">New Contact Form Submission — AG Studio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Brevo error:', err);
      return res.status(500).json({ success: false, message: 'Failed to send message.' });
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
