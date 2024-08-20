const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
});

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = Newsletter;