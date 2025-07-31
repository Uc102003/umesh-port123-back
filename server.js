const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Root route for sanity check
app.get('/', (req, res) => {
    res.send('✅ Backend is running.');
});

// ✅ Contact route with proper async
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('📨 Contact form data received:', { name, email, message });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Message',
            text: `From: ${name} <${email}>\n\n${message}`
        });

        console.log('✅ Email sent:', info.response);
        res.status(200).send('Message sent');
    } catch (error) {
        console.error('❌ Email error:', error); // show full error, not just message
        res.status(500).send('Error sending message');
    }
});


// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
