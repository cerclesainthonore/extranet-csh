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
    if (data.text) {
        data.text = "/!\\ CECI EST UN TEST. SI VOUS N'ETES PAS CENSE RECEVOIR CE MAIL, VEUILLEZ AVERTIR LE DEVELOPPEUR ravaux.noah@gmail.com\n-----------\n" + data.text;
    } else if (data.html) {
        data.html = "<strong>/!\\ CECI EST UN TEST. SI VOUS N'ETES PAS CENSE RECEVOIR CE MAIL, VEUILLEZ AVERTIR LE DEVELOPPEUR ravaux.noah@gmail.com</strong></br>-----------</br>" + data.html;
    }
    return transporter.sendMail(data, callback);
}

module.exports = {sendMail, feedbackEmail, supportEmail};