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

// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "attackXSS");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Vérification et insertion des utilisateurs par défaut
$user_check = $conn->query("SELECT * FROM users");
if ($user_check->num_rows === 0) {
    $hashed_password_1 = password_hash('9NpbQe$Y-84hE4+', PASSWORD_DEFAULT); // Hachage du mot de passe pour Llywi Minllegui
    $hashed_password_2 = password_hash('-8p4h+b4E9N$YQe', PASSWORD_DEFAULT);   // Hachage du mot de passe pour Mas Tymar

    $insert_users_sql = "
    INSERT INTO users (userid, username, password) VALUES
    (8888, 'Llywi Minllegui', '$hashed_password_1'),
    (9999, 'Mas Tymar', '$hashed_password_2');
    ";
    if ($conn->query($insert_users_sql) !== TRUE) {
        die("Error inserting default users: " . $conn->error);
    }
}

// Vérification et insertion des discussions par défaut
$discussion_check = $conn->query("SELECT * FROM discussions");
if ($discussion_check->num_rows === 0) {
    $insert_discussions_sql = "
    INSERT INTO discussions (userid, username, date, message) VALUES
    (9999, 'Mas Tymar', '2025-02-05', 'Hey, Llywi Minllegui. How are you doing today?'),
    (8888, 'Llywi Minllegui', '2025-02-06', 'I\'m doing well, sir. Just trying to improve my skills.'),
    (9999, 'Mas Tymar', '2025-02-06', 'That\'s good to hear. Remember, in Star Wars, teamwork is crucial. Always have your fellow troopers\' backs.'),
    (8888, 'Llywi Minllegui', '2025-02-06', 'Yes, sir. I\'ve been practicing coordinating with my team.'),
    (9999, 'Mas Tymar', '2025-02-06', 'Excellent. Also, never underestimate the power of the Force. It may not be something we use, but it\'s real.'),
    (8888, 'Llywi Minllegui', '2025-02-06', 'Right. I\'ve heard stories about how the Jedi use it.'),
    (9999, 'Mas Tymar', '2025-02-06', 'Indeed. Stay focused and alert. The galaxy is full of surprises.'),
    (8888, 'Llywi Minllegui', '2025-02-06', 'Thank you for the advice, sir. I\'ll do my best.'),
    (9999, 'Mas Tymar', '2025-02-06', 'I know you will. May the Force be with you.'),
    (8888, 'Llywi Minllegui', '2025-02-06', 'May the Force be with you too, sir.');
    ";
    if ($conn->query($insert_discussions_sql) !== TRUE) {
        die("Error inserting default discussions: " . $conn->error);
    }
}

// Traitement de la connexion
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

        // Vérifier le mot de passe avec password_verify
        if (password_verify($password, $stored_password)) {
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
