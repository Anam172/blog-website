const nodemailer = require('nodemailer');

// Transporter Configuration
const transporter = nodemailer.createTransport({
 service : 'gmail',
  auth: {
    user: process.env.EMAIL,  
    pass: process.env.EMAIL_PASSWORD,  
  },
});

// Send Contact Email Function
const sendContactEmail = async (req, res) => { 
  const { name, email, message } = req.body;

  // Ensure all fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: "anamyousannaf@gmail.com",
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a message from ${name} (${email}):\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = { sendContactEmail };
