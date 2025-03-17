const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");
const {log, error} = require("../utils/logging");
const {sendMail, feedbackEmail, supportEmail} = require("../utils/mail");
const createExcel = require("../utils/excel");
const NodeCache = require("node-cache");
const myCache = new NodeCache({stdTTL: 100, checkperiod: 120});

const cacheKey = "newsletter";

async function sendUpdatedTable(subject, text, callback) {
    log("Sending update newsletter list to support");
    const data = await Newsletter.find({}, "-_id mail name phone createdAt discoveredVia").lean();
    const formattedData = data.map(item => ({
        mail: item.mail,
        name: item.name,
        phone: item.phone,
        createdAt: new Date(item.createdAt).toLocaleDateString("fr-FR"),
        discoveredVia: item.discoveredVia
    }));
    const excelBuffer = createExcel(formattedData);

    await sendMail({
        from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
        to: supportEmail,
        subject,
        text,
        attachments: [
            {
                filename: "Liste_de_diffusion_CSH.xlsx",
                content: excelBuffer,
            },
        ],
    }, callback);
}

router.post("/subscribe", async (req, res) => {
    log("Received POST /newsletter/subscribe");
    log("Request body: " + JSON.stringify(req.body));

    const {name, mail, phone, discoveredVia} = req.body;

    if (!name || !mail) {
        error("Could not register subscriber: Name and email are required");
        return res.status(400).json({error: "Name and email are required"});
    }

    try {
        const newSubscriber = new Newsletter({name, mail, phone, discoveredVia});
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

        res.status(201).json({message: "Subscribed successfully"});
    } catch (err) {
        error("Could not register subscriber: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to subscribe"});
    }
});

router.get("/", async (req, res) => {
    log("Received GET /newsletter/");
    const cachedData = myCache.get(cacheKey);

    res.status(200).set('Cache-Control', 'max-age=10');
    if (cachedData) {
        res.json(cachedData);
    } else {
        const data = await Newsletter.find({}, "_id mail name phone createdAt discoveredVia").lean();
        if (data) {
            myCache.set(cacheKey, data, 10);
        }
        try {
            res.json(data);
        } catch (err) {
            error("Could not get newsletter data: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    log("Received DELETE /newsletter/");
    try {
        const {mail, name} = await Newsletter.findByIdAndDelete(id);
        myCache.flushAll();

        log("Subscriber successfully deleted");

        await sendMail({
            from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
            to: mail,
            subject: "Désinscription à la liste de diffusion CSH",
            text: `Bonjour ${name},\n\nSi vous recevez ce mail, c'est que vous avez été désabonné de la liste de diffusion CSH.\n\nSi vous n'êtes pas à l'origine de cette opération ou que vous ne l'avez pas sollicitée, veuillez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com\n\nCordialement,\n`,
        }, function (err, info) {
            if (err) {
                error("Could not send feedback mail: " + err.message);
                res.status(500).send({});
            } else {
                log("Feedback mail sent: " + info.response);
            }
        });

        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        error("Could not delete subscriber: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to delete"});
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    log("Request body: " + JSON.stringify(req.body));
    const editedParams = req.body;

    log("Received PATCH /newsletter/");
    try {
        const {name, mail} = await Newsletter.findByIdAndUpdate(id, editedParams);
        myCache.flushAll();

        log("Edited successfully");

        await sendMail({
            from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
            to: mail,
            subject: "Modification des coordonnées de la liste de diffusion CSH",
            text: `Bonjour ${name},\n\nVos coordonnées d'inscription à la liste de diffusion CSH ont été modifiées.\n\nSi vous n'êtes pas à l'origine de cette opération ou que vous ne l'avez pas sollicitée, veuillez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com\n\nCordialement,\n`,
        }, function (err, info) {
            if (err) {
                error("Could not send feedback mail: " + err.message);
                res.status(500).send({});
            } else {
                log("Feedback mail sent: " + info.response);
            }
        });

        res.status(200).json({message: "Successfully edited"});
    } catch (err) {
        error("Could not edit subscriber data: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to edit"});
    }
});

module.exports = router;