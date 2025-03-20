const {log, error} = require("../utils/logging");
const {Banner} = require("../models/Banner");
const router = require("./newsletter");
const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );


router.get("/", async (req, res) => {
    log("Received GET /banner/");
    const cacheKey = "banner";

    const cachedData = myCache.get(cacheKey)
    res.status(200).set('Cache-Control','max-age=3600')
    if(cachedData){
        res.json(cachedData);
    } else {
        const data = await Banner.findOne({
            $and: {
                dateStart: {
                    $lte: Date.now(),
                },
                dateEnd: {
                    $gte: Date.now(),
                }
            }
        }, "_id text href bannerColor").lean();
        try {
            res.json(data);
        } catch (err) {
            error("Could not get categories: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

router.get("/all", async (req, res) => {
    log("Received GET /banner/");

    const cacheKey = "banner";

    const cachedData = myCache.get(cacheKey)
    res.status(200).set('Cache-Control','max-age=3600')
    if(cachedData){
        res.json(cachedData);
    } else {
        const data = await Banner.find({}, "_id text href bannerColor dateStart dateEnd").lean();
        try {
            res.json(data);
        } catch (err) {
            error("Could not get categories: " + err.message);
            res.status(500).json({code: err.code, error: "Failed to retrieve data"});
        }
    }
});

module.exports = router;
