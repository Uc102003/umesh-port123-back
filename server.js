const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Message',
            text: `From: ${name} <${email}>\n\n${message}`
        });
        res.status(200).send('Message sent');
    } catch (error) {
        console.error('Email Error:', error);  // 👈 add this
        res.status(500).send('Error sending message');
    }
});

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Message',
            text: `From: ${name} <${email}>

${message}`
        });
        res.status(200).send('Message sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));

app.get('/', (req, res) => {
    res.send('✅ Portfolio backend is running. Ready to receive contact form submissions.');
});

