<!DOCTYPE html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 3</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

    <nav class="navbar">
        <div class="logo">
            <a href="#">
                <img src="logo/starwars.png" alt="Star Wars Logo">
            </a>
        </div>
    </nav>

    <div class="container">
    <p class="title">Envoyer votre carte d'identité<br>démarrer le vaisseau</p>

    <!-- Formulaire de téléchargement de fichier -->
    <form action="upload.php" method="post" enctype="multipart/form-data">
    
        <input class="file-input" type="file" name="file" id="file">
        <br><br>
        <input type="submit" value="Envoyer">
    </form>
    <!-- Affichage des messages -->
    <?php
        if (isset($_GET['message'])) {
            if ($_GET['message'] === 'success') {
                echo '<div class="message success">Fichier envoyé : Carte non valide.</div>';
            } elseif ($_GET['message'] === 'error') {
                echo '<div class="message error">Erreur, carte non envoyée.</div>';
            }
        }
    ?>


    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>