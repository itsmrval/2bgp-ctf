const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Utiliser cors middleware pour toutes les routes
app.use(cors());

app.use(bodyParser.json());

app.post('/attack', (req, res) => {
    const data = req.body.variable; // Récupérer la donnée envoyée dans le corps de la requête

    // Lire le contenu actuel d'index.html
    fs.readFile('index.html', 'utf8', (err, content) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du fichier');
        }

        // Ajouter les nouvelles données au contenu
        const newContent = content + `\n<p>${data}</p>`;

        // Écrire le nouveau contenu dans index.html
        fs.writeFile('index.html', newContent, 'utf8', err => {
            if (err) {
                return res.status(500).send('Erreur lors de l\'écriture du fichier');
            }
            res.send('Fichier mis à jour avec succès');
        });
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
