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
                Tu as trouvé le nom de la planète ou tu dois aller<br>
                <strong>FLAG={XXXX}</strong>

            </p>
        </div>
    </div>
</body>
</html>