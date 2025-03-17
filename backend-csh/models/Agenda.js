const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true, unique: true},
    description: {type: String},
    reservationLimit: {type: Number},
    reservations: {
        type: [{
            mail: String
        }], default: []
    },
}, {timestamps: true, collection: "Agenda"});

AgendaSchema.index({date: 1, "reservations.mail": 1}, {unique: true});

const Agenda = mongoose.model("Agenda", AgendaSchema);

module.exports = Agenda;