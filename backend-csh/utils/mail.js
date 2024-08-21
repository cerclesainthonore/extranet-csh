const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config()

const feedbackEmail = process.env.FEEDBACK_EMAIL;
const supportEmail = process.env.SUPPORT_EMAIL;

let transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
        user: feedbackEmail,
        pass: process.env.MAIL_PASSWORD
    },
    pooled: true,
    maxMessages: Infinity,
    maxConnections: 20,
    debug: process.env.NODE_ENV !== 'production',
    logging: true
});

function sendMail(data, callback) {
    return transporter.sendMail(data, callback);
}

module.exports = {sendMail, feedbackEmail, supportEmail};