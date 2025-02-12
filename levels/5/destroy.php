<?php
session_start();
// Vérifier si la session est active et si l'utilisateur est celui attendu
if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'ValkorionEmpereur') {
    header('Location: index.php');  // Redirection vers la page d'accueil si non connecté ou mauvais utilisateur
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level 4</title>
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

    <main class="container">
        <p class="title">Manage DNA</p>

        <form method="POST" action="">
            <input type="submit" name="destroy-dna" value="Destroy DNA !"></input>
        </form> 

        <?php
        if (isset($_POST['destroy-dna'])) {

            echo "<div class='message flag'>flag={XXXX}</div>";
        }
        ?>
    </main>

</body>
</html>
