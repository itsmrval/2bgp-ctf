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
    <!-- Début du nouveau conteneur -->
    <div class="text-block">
        <p class="title">Stockage d'email</p>
        <p> 
            Peu à peu, les couches de protection se dissolvent, et un mail s’affiche, dévoilant une sombre prophétie.   
            <br><br>
            Le texte révèle qu’un danger sans précédent se profile :
        </p>
        <!-- Faux email -->
        <div class="email-container">
            <div class="email-header">
                <p><strong>De :</strong> ValkorionEmpereur@2bgp-ctf.com</p>
                <p><strong>A :</strong> JangoFett1977@2bgp-ctf.com</p>
                <p><strong>Sujet:</strong> Centre ADN </p>
            </div>
            <div class="email-body">
            <p>Jango,</p>
            <p>Pour remporter cette guerre, une armée de clones m'est indispensable. Tu dois être l’ADN originel, le modèle parfait à partir duquel naîtront mes soldats d’élite. Pars immédiatement pour Kamino et exécute ta mission sans la moindre hésitation. Sache que ton engagement ne passera pas inaperçu : tes compétences seront récompensées grassement et ta loyauté te vaudra une compensation à la hauteur de l’enjeu.
            </p>
            <p>N’oublie pas ton adresse mail secret, c’est la clé pour sceller ton ADN sur Kamino et garantir le succès de notre entreprise.</p>
            <p>- Valkorion</p>
            <p><strong>PS:</strong> FLAG={perky-snowfall-unease}</p>
            </div>
        </div>  
        <br>    
        <p> 
        Vous devez retourner à votre vaisseau et vous rendre sur Kamino pour détruire l'ADN de Jango Fett.  
        </p>

    </div>
</div>

</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>




