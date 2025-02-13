<?php


ini_set('session.cookie_httponly', 0);
ini_set('session.cookie_secure', 0);  // Désactive l'attribut Secure en local
session_start(['cookie_lifetime' => 43200]);

// Vérifie si le cookie PHPSESSID est défini
if (!isset($_SESSION['userid'])) {
    header('Location: index.php');
    exit();
   
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 9</title>
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
    <div class="container-sucess">
        <p>Félicitations! Vous avez autorisé l'accès à Vaynin</p>
        <p class="flag">Flag={cactus-hula-most}</p>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>
