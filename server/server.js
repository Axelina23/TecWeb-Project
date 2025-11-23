const express = require("express");
    const cors = require("cors");
    const mongoose = require("mongoose");
    const path = require("path"); // <--- Importa path
    const app = express();
    const catsRoute = require('./routes/cats');

    // Middleware
    app.use(cors());
    app.use(express.json());

    // --- FONDAMENTALE: Rendi pubblica la cartella uploads ---
    // Così se vai su http://localhost:3000/uploads/gatto.jpg lo vedi
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // --- CONNESSIONE AL DATABASE ---
    mongoose.connect("mongodb://127.0.0.1:27017/streetcats")
      .then(() => console.log("✅ Connesso a MongoDB!"))
      .catch((err) => console.error("❌ Errore di connessione:", err));

    // Rotta di prova
    app.use('/api/cats', catsRoute)
    app.get("/", (req, res) => {
      res.send("Miao! Il server dei gatti è attivo.");
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server in ascolto sulla porta ${PORT}`);
    });