<?php

session_start();
if (!isset($_SESSION['sucess'])) {
    header("Location: index.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 1</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <nav class="nav">
        <div class="logo">
            <a href="#">
                <img src="logo/starwars.png" alt="Star Wars Logo">
            </a>
        </div>
    </nav>
    <div class="container">
        <div class="text-box">
            <p>

            Bien joué ! <br>
            
            Vous devez allez sur Endor pour rencontrer les services secrets. Votre objectif est de découvrir où se situe ce légendaire vaisseau.
                
            <br><br>
            <strong>FLAG={diabolic-atop-compress}</strong>

            </p>
        </div>
    </div>
</body>
</html>