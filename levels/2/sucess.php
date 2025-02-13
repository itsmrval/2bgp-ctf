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
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 2</title>
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

                Vous mettez les coordonnées dans le vaisseau de Arcann et cela vous indique une nouvelle planète.  
                
                <br> <br> 
                
                Votre prochaine destination est désormais établie. La planète Naboo se profile à l’horizon, recelant le secret du Faucon Millenium, la clé potentielle pour inverser le cours de la guerre contre l'Empire éternel.
                <br>

                Préparez-vous, jeune Padawan, car ce nouvel indice vous entraîne dans les méandres d’un destin encore plus obscur et captivant...<br>
               
               <br> <br>
               
                <strong>FLAG={untagged-disabled-arguable}</strong>

            </p>
        </div>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>