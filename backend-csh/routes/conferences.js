const express = require('express');
const router = express.Router();
const {Conferences} = require('../models/Conferences');
const {log, error} = require("../utils/logging");
const NodeCache = require("node-cache");
const Newsletter = require("../models/Newsletter");
const {sendMail, feedbackEmail} = require("../utils/mail");
const myCache = new NodeCache({stdTTL: 100, checkperiod: 120});

router.get("/", async (req, res) => {
    const cacheKey = "conferences";
    log("Received GET /conferences/");
    const cachedData = myCache.get(cacheKey);
    res.status(200).set('Cache-Control', 'max-age=3600');
    if (cachedData) {
        res.json(cachedData);
    } else {
        const data = await Conferences.find({}, "_id title authors date tags coverFilename").lean();
        data.date = new Date(data.date).toLocaleDateString("fr-FR");
        if (data) myCache.set(cacheKey, data, 7200)
        try {
            res.json(data);
        } catch (err) {
            error("Could not get categories: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    log("Received GET /conferences/" + id);
    const cacheKey = `conference/${id}`
    const cachedData = myCache.get(cacheKey)
    res.status(200).set('Cache-Control', 'max-age=3600')
    if (cachedData) {
        res.json(cachedData)
    } else {
        try {
            const data = await Conferences.findOne({_id: id}).lean();
            data.date = new Date(data.date).toLocaleDateString("fr-FR");
            if (data) myCache.set(cacheKey, data, 7200)
            res.json(data);
        } catch (err) {
            error("Could not get categories: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

router.post("/", async (req, res) => {
    log("Received POST /conferences/");
    log("Request body: " + JSON.stringify(req.body));

    const {title, authors, date, summary, link, tags, coverFilename} = req.body;

    if (!title || !authors || authors.length === 0 || !date || !tags || tags.length === 0) {
        error("Could not register subscriber: title, authors, date and tags are required");
        return res.status(400).json({error: "title, authors, date and tags are required"});
    }

    try {
        const newConference = new Conferences({title, authors, date, summary, link, tags, coverFilename});
        await newConference.save();
        log("Conference successfully created");

        res.status(201).json({message: "Conference successfully created"});
    } catch (err) {
        error("Could not create conference: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to create conference"});
    }
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    log("Received DELETE /conferences/");
    try {
        await Conferences.findByIdAndDelete(id);
        myCache.flushAll();

        log("Conference successfully deleted");

        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        error("Could not delete conference: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to delete"});
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    log("Request body: " + JSON.stringify(req.body));
    const editedParams = req.body;

    log("Received PATCH /conferences/");
    try {
        await Conferences.findByIdAndUpdate(id, editedParams);
        myCache.flushAll();

        log("Edited successfully");

        res.status(200).json({message: "Successfully edited"});
    } catch (err) {
        error("Could not edit conference data: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to edit"});
    }
});

module.exports = router;