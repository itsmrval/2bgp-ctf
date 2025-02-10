<?php

ini_set('session.cookie_httponly', 0);
ini_set('session.cookie_secure', 0);  // Désactive l'attribut Secure en local
session_start(['cookie_lifetime' => 43200]);


// Vérifie si la session est déjà initialisée
if (isset($_SESSION['userid'])) {
    header('Location: chat.php');
    exit();
}



$error_msg = "";

$conn = new mysqli("localhost", "root", "", "attackXSS");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['connect'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT userid, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userid, $stored_password);
        $stmt->fetch();

        // Vérifier que le mot de passe saisi est égal au mot de passe stocké
        if ($password === $stored_password) {
            // Connexion réussie
            session_regenerate_id(true);
            $_SESSION['userid'] = $userid;
            $_SESSION['username'] = $username;
            
            header('Location: chat.php');
            exit();
        } else {
            $error_msg = "Mot de passe incorrect.";
        }
    } else {
        $error_msg =  "Nom d'utilisateur non trouvé.";
    }

    $stmt->close();
}





$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discussion - LevelX</title>
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
        <div class="profile">
            <i class="fa-solid fa-user"></i>
            <span class="user-name">Level X <?= isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : "Not connected" ?></span>

        </div>
    </nav>
    <h1 class="title-discussion">Login with the account of Llywi Minllegui</h1>
    <div class="container">
        <!-- Affichage des messages d'erreur -->
        <?php if (!empty($error_msg)): ?>
            <div class="error-message" style="color: red; padding: 10px;">
                <?= htmlspecialchars($error_msg) ?>
            </div>
        <?php endif; ?>
        <form id="loginForm" method="POST">
            <div class="inputbox">
            <input type="text" name="username" id="username" required>
            <label for="username">Username</label>
            </div>
            <div class="inputbox">
            <input type="password" name="password" id="password" required>
            <label for="password">Password</label>
            </div>

            <button type="submit" name="connect">Connect</button>
        </form>
    </div>
</body>
</html>
