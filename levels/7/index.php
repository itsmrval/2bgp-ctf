<?php
session_start();
// Initialise un message d'erreur vide
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Vérifie l'adresse IP de l'utilisateur
    $allowed_ip = '172.16.0.232';

    // Vérifie d'abord l'en-tête X-Forwarded-For, sinon utilise REMOTE_ADDR
    $user_ip = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];

    if ($user_ip !== $allowed_ip) {
        // Définit un message d'erreur si l'adresse IP n'est pas autorisée
        $error_message = "Accès refusé. Votre adresse IP n'est pas autorisée.";
        http_response_code(403);
    } else {
        $_SESSION['flag']="XXXX";
        // Redirige vers success.php si l'adresse IP est autorisée
        header('Location: sucess.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level 7</title>
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
    <h1 class="title">déverouille la cellule de vaynin</h1>
    <div class="container">
        <?php if ($error_message): ?>
            <p class="error-message"><?php echo $error_message; ?></p>
        <?php endif; ?>
        <form method="POST" action="">
            <input type="submit" value="Déverouiller">
        </form>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>
