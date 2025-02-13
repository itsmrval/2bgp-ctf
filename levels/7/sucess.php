<?php
session_start();
// Vérifie
if (!isset($_SESSION['flag'])) {
    header('Location: index.php');
    exit();
   
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 7</title>
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
    <h1 class="title">Cellule déverrouillée avec succès!</h1>
    <div class="container-sucess">
        <p>Félicitations! Vous avez déverrouillé la cellule de Vaynin.</p>
        <p class="flag">Flag={unsliced-unleveled-parrot}</p>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>
