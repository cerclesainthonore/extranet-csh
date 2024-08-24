const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const {log, error} = require("../utils/logging");
const {sendMail, feedbackEmail, supportEmail} = require("../utils/mail");
const createExcel = require("../utils/excel");

async function sendUpdatedTable(subject, text, callback) {
    log("Sending update newsletter list to support");
    const data = await Newsletter.find({}, "-_id mail name phone createdAt").lean();
    const formattedData = data.map(item => ({
        mail: item.mail,
        name: item.name,
        phone: item.phone,
        createdAt: new Date(item.createdAt).toLocaleDateString('fr-FR'),
    }));
    const excelBuffer = createExcel(formattedData);

    await sendMail({
        from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
        to: supportEmail,
        subject,
        text,
        attachments: [
            {
                filename: 'Liste_de_diffusion_CSH.xlsx',
                content: excelBuffer,
            },
        ],
    }, callback);
}

router.post('/subscribe', async (req, res) => {
    log("Received POST /newsletter/subscribe");
    log("Request body: " + JSON.stringify(req.body));

    const {name, mail, phone} = req.body;

    if (!name || !mail) {
        error("Could not register subscriber: Name and email are required");
        return res.status(400).json({error: 'Name and email are required'});
    }

    try {
        const newSubscriber = new Newsletter({name, mail, phone});
        await newSubscriber.save();
        log("Subscribed successfully");

        // subscription notification
        await sendMail({
            from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
            to: mail,
            subject: "Inscription à la liste de diffusion CSH",
            text: `Bonjour ${name},\n\nSi vous recevez ce mail, c'est que vos coordonées ont bien été enregistrées. Vous devriez recevoir une confirmation d'inscription à la liste de diffusion du Cercle Saint-Honoré sous peu.\n\nVous pouvez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com si vous rencontrez un problème.\n\nCordialement,\n`,
        }, function (err, info) {
            if (err) {
                error("Could not send feedback mail: " + err.message);
                res.status(500).send({});
            } else {
                log("Feedback mail sent: " + info.response);
            }
        });

        // send sheet to support
        sendUpdatedTable("Nouvelle inscription à la liste de diffusion CSH",
            `Bonjour,\n\nUn nouveau membre a effectué une demande d'inscription à la liste de diffusion du Cercle Saint-Honoré via le site web.\n\nCoordonnées:\n - Nom: ${name}\n - Adresse mail: ${mail}\n - Numéro de téléphone: ${phone ? phone : "Non renseigné"}\n\nVous trouverez le tableur Excel de la liste de diffusion en pièce jointe.\n\nCordialement,\n`,
            function (err, info) {
                if (err) {
                    error("Could not send list update mail: " + err.message);
                    res.status(500).send({});
                } else {
                    log("List update mail sent: " + info.response);
                }
            });

        res.status(201).json({message: 'Subscribed successfully'});
    } catch (err) {
        error("Could not register subscriber: " + err.message);
        res.status(500).json({code: err.code, error: 'Failed to subscribe'});
    }
});

module.exports = router;