const express = require('express');
    const router = express.Router();
    const Cat = require('../models/Cat');
    const multer = require('multer');
    const path = require('path');

    // --- CONFIGURAZIONE MULTER (Upload) ---
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); // Dove salvare i file
        },
        filename: function (req, file, cb) {
            // Genera un nome unico: data-nomefile.jpg
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({ storage: storage });

    // GET: Prendi tutti i gatti
    router.get('/', async (req, res) => {
        try {
            const cats = await Cat.find();
            res.json(cats);
        } catch (err) {
            res.json({ message: err });
        }
    });

    // POST: Aggiungi un gatto (CON IMMAGINE)
    // 'image' è il nome del campo che useremo nel form del frontend
    router.post('/', upload.single('image'), async (req, res) => {
        
        // Se c'è un file caricato, costruiamo l'URL completo
        // Es: http://localhost:3000/uploads/123456-gatto.jpg
        let imageUrl = '';
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const cat = new Cat({
            title: req.body.title,
            description: req.body.description,
            imageUrl: imageUrl, // Salviamo il percorso creato da noi
            // Attenzione: i dati complessi come position arrivano come stringhe in FormData,
            // ma per ora semplifichiamo e mettiamo valori di default se non arrivano
            position: {
                lat: req.body.lat || 40.8518, 
                lng: req.body.lng || 14.2681
            }
        });

        try {
            const savedCat = await cat.save();
            res.json(savedCat);
        } catch (err) {
            res.json({ message: err });
        }
    });

    module.exports = router;