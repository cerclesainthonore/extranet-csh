const mongoose = require("mongoose");

const ConferencesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    date: { type: Date, required: true, unique: true },
    summary: { type: String },
    link: { type: String },
    tags: [{ type: String, required: true }],
    coverFilename: { type: String }
}, { collection: "Conferences" });

const Conferences = mongoose.model("Conferences", ConferencesSchema);

module.exports = {Conferences};