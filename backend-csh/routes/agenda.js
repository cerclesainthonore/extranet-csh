const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Agenda = require("../models/Agenda");
const {log, error} = require("../utils/logging");
const {sendMail, feedbackEmail, supportEmail} = require("../utils/mail");
const NodeCache = require("node-cache");
const Newsletter = require("../models/Newsletter");
const myCache = new NodeCache({stdTTL: 100, checkperiod: 120});

dotenv.config();

const cacheKey = "agenda";

// create event
router.post("/", async (req, res) => {
    log("Received POST /agenda");
    log("Request body: " + JSON.stringify(req.body));
    const {title, date, description, reservationLimit} = req.body;

    if (!date) {
        error("Could not register event: date is required");
        return res.status(400).json({error: "Date is required"});
    }

    try {
        const event = new Agenda({title, date, description, reservationLimit});
        await event.save();

        myCache.flushAll();

        log("Event successfully created");

        res.status(201).json({message: "Event successfully created"});
    } catch (err) {
        error("Could not register event: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to create event"});
    }
})

// make a reservation
router.post("/reservations", async (req, res) => {
    log("Received POST /agenda/reservations");
    log("Request body: " + JSON.stringify(req.body));
    const {eventId, mail} = req.body;

    if (!mail || !eventId) {
        error("Could not register subscriber: mail and event ID are required");
        return res.status(400).json({error: "Mail and event ID are required"});
    }

    try {
        // mail verification
        const token = jwt.sign({mail, eventId}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        await sendMail({
            from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
            to: mail,
            subject: "Vérification de l'addresse mail",
            html: `Bonjour,<br/><br/>Pour confirmer votre réservation, <a href="${process.env.NODE_ENV === "production" ? `https://cerclesainthonore.fr/agenda/verify?token=${token}` : `http://localhost:3000/agenda/reservations/verify?token=${token}`}">Vérifiez votre e-mail ici</a>. <br/><br/>Si vous n'êtes pas à l'origine de cette requête, veuillez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com.<br/><br/>Cordialement,<br/>`,
        }, function (err, info) {
            if (err) {
                error("Could not send verification mail: " + err.message);
                res.status(500).send({});
            } else {
                log("Verification mail sent: " + info.response);
            }
        });

        res.status(100).json({message: "Client must verify mail"});
    } catch (err) {
        error("Could not register event: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to create event"});
    }
});

// delete a reservation
router.delete("/reservations", async (req, res) => {
    log("Received DELETE /agenda/reservations");
    log("Request body: " + JSON.stringify(req.body));
    const {eventId, mail} = req.body;

    if (!mail || !eventId) {
        error("Could not register subscriber: mail and event ID are required");
        return res.status(400).json({error: "Mail and event ID are required"});
    }

    try {
        const event = await Agenda.findById(eventId);
        if (event.reservations.some((res) => res.mail === mail)) {
            event.reservations.filter((res) => res.mail !== mail);
        } else {
            error(mail + " didn't book this event");
            return res.status(400).json({error: mail + " didn't book this event"});
        }

        await event.save();
        log("Successfully unbooked");

        await sendMail({
            from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
            to: mail,
            subject: "Vérification de l'addresse mail",
            text: `Bonjour,\n\nSi vous recevez ce mail, c'est que votre réservation pour la conférence « ${event.title} » a été annulée.\n\nSi vous n'êtes pas à l'origine de cette opération ou que vous ne l'avez pas sollicitée, veuillez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com\n\nCordialement,\n`,
        }, function (err, info) {
            if (err) {
                error("Could not send verification mail: " + err.message);
                res.status(500).send({});
            } else {
                log("Verification mail sent: " + info.response);
            }
        });

        res.status(200).json({message: "Successfully unbooked"});
    } catch (err) {
        error("Could not unbook mail: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to unbook"});
    }
});

router.get("/reservations/verify", async (req, res) => {
    const {token} = req.query;
    log("Received GET /agenda/reservations/verify");

    if (!token) {
        error("Could not verify mail: token is required");
        res.status(400).send("Verification token missing");
        return;
    }
    try {
        const {mail, eventId} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const event = await Agenda.findById(eventId);
        if (event.reservationLimit && event.reservations.length === event.reservationLimit) {
            error("Could not register subscriber: event full");
            return res.status(400).json({error: "Event is fully booked"});
        }

        const mailAlreadyRegistered = event.reservations.some((item) => item.mail === mail);
        if (mailAlreadyRegistered) {
            error("Mail already booked this event");
            return res.status(400).json({code: 11000, error: "Mail already booked this event"});
        }

        event.reservations.push({mail});
        await event.save();

        myCache.flushAll();

        log("Successfully booked event");

        await sendMail({
            from: "Cercle Saint-Honoré <" + feedbackEmail + ">",
            to: mail,
            subject: "Inscription à un évènement CSH",
            text: `Bonjour,\n\nNous vous confirmons votre inscription pour l'évènement « ${event.title} » prévu le ${event.date.toLocaleString("fr-FR")}. \n\nSi vous souhaitez annuler votre réservation ou rencontrez un problème, vous pouvez contacter le Cercle Saint-Honoré directement via l'addresse mail cerclesthonore@gmail.com.\n\nCordialement,\n`,
        }, function (err, info) {
            if (err) {
                error("Could not send feedback mail: " + err.message);
                res.status(500).send({});
            } else {
                log("Feedback mail sent: " + info.response);
            }
        });

        res.status(201).send("Mail successfully verified");
    } catch (err) {
        error("Could not verify token: " + err.message);
        res.status(400).send("Invalid verification link");
    }
});

router.get("/", async (req, res) => {
    log("Received GET /agenda");
    const {getReservations} = req.query;

    const cachedData = myCache.get(cacheKey);

    res.status(200).set('Cache-Control', 'max-age=10');
    if (cachedData) {
        res.json(cachedData);
    } else {
        const data = await Agenda.find({}, `_id title date description`).lean();
        if (data) {
            myCache.set(cacheKey, data, 10);
        }
        try {
            res.json(data);
        } catch (err) {
            error("Could not get agenda data: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    log("Received GET /agenda/" + id);

    const cachedData = myCache.get(cacheKey);

    res.status(200).set('Cache-Control', 'max-age=10');
    if (cachedData) {
        res.json(cachedData);
    } else {
        const data = await Agenda.find({}, `_id title date description reservationLimit reservations`).lean();
        if (data) {
            myCache.set(cacheKey, data, 10);
        }
        try {
            res.json(data);
        } catch (err) {
            error("Could not get agenda data: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    log("Received DELETE /agenda/");
    try {
        await Agenda.findByIdAndDelete(id);
        myCache.flushAll();

        log("Event successfully deleted");

        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        error("Could not delete event: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to delete"});
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;

    log("Received PATCH /agenda/");
    log("Request body: " + JSON.stringify(req.body));

    const editedParams = req.body;
    if (editedParams.reservations) {
        error("Client should use /agenda/reservations endpoint to modify event reservations")
        return res.status(400).send({error: "Client should use /agenda/reservations endpoint to modify event reservations"});
    }

    try {
        await Agenda.findByIdAndUpdate(id, editedParams);
        myCache.flushAll();

        log("Edited successfully");

        res.status(200).json({message: "Successfully edited"});
    } catch (err) {
        error("Could not edit event data: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to edit"});
    }
});

module.exports = router;