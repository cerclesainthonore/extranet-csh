const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    phone: { type: String },
    discoveredVia: { type: String }
}, { timestamps: true, collection: 'Newsletter' });

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = Newsletter;