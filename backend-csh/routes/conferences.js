const express = require('express');
const router = express.Router();
const {Conferences, tags} = require('../models/Conferences');
const {log, error} = require("../utils/logging");

router.get("/tags", (req, res) => {
    log("Received GET /conferences/tags");

    try {
        res.status(200).json(JSON.parse(JSON.stringify(tags)));
    } catch (err) {
        error("Could not get existing tags: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to get existing tags"});
    }
});

router.get("/", async (req, res) => {
    log("Received GET /conferences/");

    const data = await Conferences.find({}, "_id title author date tags coverFilename").lean();
    data.date = new Date(data.date).toLocaleDateString("fr-FR");

    try {
        res.status(200).json(data);
    } catch (err) {
        error("Could not get categories: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to retrieve data"});
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    log("Received GET /conferences/" + id);

    const data = await Conferences.findOne({_id: id}).lean();
    data.date = new Date(data.date).toLocaleDateString("fr-FR");

    try {
        res.status(200).json(data);
    } catch (err) {
        error("Could not get categories: " + err.message);
        res.status(500).json({code: err.code, error: "Failed to retrieve data"});
    }
});

module.exports = router;