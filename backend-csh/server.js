const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {log, error} = require("./utils/logging");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbHost = process.env.MONGODB_HOST;
const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const mongoURI = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:27017/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connexion à MongoDB
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", (err) => {
    console.error.bind(console, "connection error:");
    error("MongoDB connection error: " + err);
});
db.once("open", () => {
    log("Connected to MongoDB");
});

let transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
        user: 'noreply@cerclesainthonore.fr',
        pass: process.env.MAIL_PASSWORD
    },
    debug: process.env.NODE_ENV !== 'production',
    logging: true
});

app.get("/", (req, res) => {
    log("Received GET /");
    res.send("Hello World!");
});

app.post("/send_mail", (req, res) => {
    log("Received POST /send_mail");

    let mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    };

    log("Mail body: " + JSON.stringify(mailOptions));

    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            error(err.message);
            res.status(500).send({});
        } else {
            log('Mail sent: ' + info.response);
            res.status(200).send({});
        }
    });
});

app.listen(port, () => {
    log(`Server is running on port ${port}`);
});