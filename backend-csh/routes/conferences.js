const express = require('express');
const router = express.Router();
const {Conferences} = require('../models/Conferences');
const {log, error} = require("../utils/logging");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

router.get("/", async (req, res) => {
    const cacheKey = "conferences";
    log("Received GET /conferences/");
    const cachedData = myCache.get(cacheKey)
    res.status(200).set('Cache-Control','max-age=3600')
    if(cachedData){
        res.json(cachedData);
    } else {
        const data = await Conferences.find({}, "_id title authors date tags coverFilename").lean();
        data.date = new Date(data.date).toLocaleDateString("fr-FR");
        if(data) myCache.set(cacheKey, data, 7200)
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
    res.status(200).set('Cache-Control','max-age=3600')
    if(cachedData){
        res.json(cachedData)
    } else {
        try {
            const data = await Conferences.findOne({_id: id}).lean();
            data.date = new Date(data.date).toLocaleDateString("fr-FR");
            if(data) myCache.set(cacheKey, data, 7200)
            res.json(data);
        } catch (err) {
            error("Could not get categories: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

module.exports = router;