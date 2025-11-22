const { text } = require('express');
const mongoose = require('mongoose');

const SchemaGatto = new mongoose.Schema({
    
    // Titolo del gatto
    title: {
        type: String,
        required: true // Titolo obbligatorio
    },

    // Descrizione del gatto
    description: {
        type: String,
        required: false // Descrizione opzionale
    },

    // URL dell'immagine
    imageUrl: {
        type: String,
        required: true // URL dell'immagine obbligatorio
    },

    // Posizione geografica
    position: {
        lat: { type : Number, required: true },
        lng: { type : Number, required: true }
    },

    // Data di creazione del documento
    createdAt: {
        type: Date,
        default: Date.now // Data di creazione predefinita alla data corrente
    },

    //commenti
    comments: [{
        text: String,
        author: String,
        date: { type: Date, default: Date.now }
    }]
});

//creazione del modello Cat basato sullo schema catSchema
module.exports = mongoose.model('Gatto', SchemaGatto);