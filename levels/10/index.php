<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 10</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1 class="title">afficher les informations <br>de la forteresse</h1>
        <button id="show" class="button" onclick="sendXML()">Afficher</button>
    <div id="result"></div>

    <script>
        function sendXML() {
            // URL du fichier XML local sur le serveur
            const fileURL = './sample.xml'; // Change le chemin pour le fichier sur le serveur

            // Utiliser fetch pour récupérer le contenu du fichier XML
            fetch(fileURL)
                .then(response => response.text())  // Lire la réponse en tant que texte
                .then(xmlContent => {
                    // Envoi du contenu du fichier XML au serveur via POST
                    fetch('process.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/xml'
                        },
                        body: xmlContent
                    })
                    .then(response => response.text())
                    .then(data => {
                        // Afficher la réponse du serveur dans la page
                        document.getElementById('result').innerHTML = `<pre>${data}</pre>`;
                    })
                    .catch(error => console.error('Error:', error));
                })
                .catch(error => console.error('Error fetching XML:', error));
        }
    </script>

</body>
</html>
