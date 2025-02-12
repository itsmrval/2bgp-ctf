<?php
session_start();

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 4</title>
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
        <p class="title">Bienvenue dans le temple</p>
        
        <!-- Formulaire pour entrer le code à 4 chiffres -->
        <form id="codeForm" method="GET" action="">
            <label for="code">Entrer code - 4 chiffres :</label>
            <input type="text" id="code" name="code" maxlength="4" pattern="\d{4}" required>
            <button type="submit">Envoyer </button>
        </form>

        <?php
        if (isset($_GET['code'])) {
            if ($_GET['code'] === '7814') {
                // Redirection si le code est correct
                $_SESSION['flag'] = "XXXXX";
                header("Location: sucess_page.php"); // Remplacez par l'URL de votre page de succès
                exit();
            } else {
                // Afficher un message d'erreur si le code est incorrect
                echo '<div class="message error">Code faux. Veuillez réessayer.</div>';
            }
        }
        ?>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>