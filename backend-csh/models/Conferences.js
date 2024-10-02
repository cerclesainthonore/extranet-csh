const mongoose = require("mongoose");

const tags = ["liturgy", "history", "philosophy", "art", "apologetics", "spirituality", "interview", "book", "self_improvement"];

const ConferencesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
    summary: { type: String },
    link: { type: String },
    tags: [{ type: String, enum: tags, required: true }],
    coverFilename: { type: String }
}, { collection: "Conferences" });

const Conferences = mongoose.model("Conferences", ConferencesSchema);

module.exports = {Conferences, tags};