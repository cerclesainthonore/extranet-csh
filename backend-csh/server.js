const { Config } = require('./config')
const express = require("express");
const cors = require("cors");
const {log, error} = require("./utils/logging");
const mongoose = require("mongoose");
const newsletterRoutes = require("./routes/newsletter");
const conferencesRoutes = require("./routes/conferences");
const bannerRoutes = require("./routes/banner");
const {sendMail, feedbackEmail} = require("./utils/mail");


const app = express();
const port = Config.port;

const mongoUser = Config.mongoUser;
const mongoUri = `mongodb://${mongoUser !== "" ? `${mongoUser}@`:""}${Config.mongoHost}:27017/${Config.mongoCollection}${mongoUser !== "" ? "?authSource=admin" : ""}`;
mongoose.connect(mongoUri)
    .then(() => log('Connected to MongoDB'))
    .catch(err => error('Could not connect to MongoDB: ' + err));

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? Config.origin : 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/newsletter', newsletterRoutes);
app.use('/conferences', conferencesRoutes);
app.use('/banner', bannerRoutes);


app.get("/", (req, res) => {
    log("Received GET /");
    res.send("Hello World!");
});

app.post("/send_mail", async (req, res) => {
    log("Received POST /send_mail");
    log("Request body: " + JSON.stringify(req.body));

    // Envoi au support
    await sendMail({
        from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
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
    await sendMail({
        from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
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