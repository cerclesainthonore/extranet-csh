const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    href: { type: String },
    bannerColor: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
}, { collection: "Banner" });

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = {Banner};