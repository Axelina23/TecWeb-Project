const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: true },
    
    // Posizione sulla mappa (coordinate)
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },

    // --- NUOVI CAMPI ---
    address: { type: String, required: false }, // Indirizzo scritto (es. "Via Roma 10")
    hasCollar: { type: Boolean, default: false }, // Ha il collare?
    isInjured: { type: Boolean, default: false }, // È ferito?
    // -------------------

    createdAt: { type: Date, default: Date.now },
    comments: [{
        text: String,
        author: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Cat', catSchema);