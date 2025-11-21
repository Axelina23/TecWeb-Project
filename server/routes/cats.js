const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat'); 

// GET: Prendi tutti i gatti
router.get('/', async (req, res) => {
    try {
        const cats = await Cat.find();
        res.json(cats);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST: Aggiungi un gatto
router.post('/', async (req, res) => {
    const cat = new Cat({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        position: req.body.position
    });

    try {
        const savedCat = await cat.save();
        res.json(savedCat);
    } catch (err) {
        res.json({ message: err });
    }
});

// --- QUESTA È LA RIGA FONDAMENTALE CHE TI MANCAVA ---
module.exports = router;