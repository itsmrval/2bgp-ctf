<?php
session_start();
if (!isset($_SESSION['flag'])) {
    header("Location: index.php");
    exit();
}

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
    <p class="title">Stockage d'email</p>

    <!-- Faux email -->
    <div class="email-container">
        <div class="email-header">
            <p><strong>De :</strong> ValkorionEmpereur@2bgp-ctf.com</p>
            <p><strong>A :</strong> JangoFett1977@2bgp-ctf.com</p>
            <p><strong>Sujet:</strong> Centre ADN </p>
        </div>
        <div class="email-body">
            <p>Jango,</p>
            <p>S'il te plait, va sur la planete Kamino et créer des clones, c'est urgent...  Important : souviens toi de mon email.</p>
            <p>A bientot, GL</p>
            <p>- Valkorion</p>
            <p><strong>PS:</strong> FLAG={XXXX}</p>
        </div>
    </div>
</div>
</body>
</html>