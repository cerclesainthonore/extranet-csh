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


mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", (err) => {
    console.error.bind(console, "connection error:");
    error("MongoDB connection error: " + err);
});
db.once("open", () => {
    log("Connected to MongoDB");
});

const feedbackEmail = 'noreply@cerclesainthonore.fr';

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

app.get("/", (req, res) => {
    log("Received GET /");
    res.send("Hello World!");
});

app.post("/send_mail", async (req, res) => {
    log("Received POST /send_mail");
    log("Request body: " + JSON.stringify(req.body));

    // Envoi au support
    await transporter.sendMail({
        from: feedbackEmail,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    }, function (err, info) {
        if (err) {
            error("Could not send mail to support: " + err.message);
            res.status(500).send({});
        } else {
            log("Mail sent to support: " + info.response);
        }
    });

    // Réponse à l'envoyeur
    await transporter.sendMail({
        from: feedbackEmail,
        to: req.body.from,
        subject: "Votre retour a bien été communiqué",
        text: `Bonjour ${req.body.name},\n\nVotre tentative de contact via le site cerclesainthonore.fr a bien été prise en compte. Vous recevre une réponse sous peu. Si vous n'obtenez toujours pas de réponse après un moment, vous pouvez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com.\n\nCordialement,\n`,
    }, function (err, info) {
        if (err) {
            error("Could not send feedback mail: " + err.message);
            res.status(500).send({});
        } else {
            log("Feedback mail sent: " + info.response);
        }
    });

    res.status(200).send({});
});

app.listen(port, () => {
    log(`Server is running on port ${port}`);
});