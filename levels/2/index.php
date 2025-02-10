<?php

ini_set('session.cookie_httponly', 0);
ini_set('session.cookie_secure', 0);  // Désactive l'attribut Secure en local
session_start(['cookie_lifetime' => 43200]);

// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "attackSQL");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Vérification et insertion des utilisateurs par défaut
$user_check = $conn->query("SELECT * FROM users");
if ($user_check->num_rows === 0) {
    $hashed_passwords = [
        password_hash('password', PASSWORD_DEFAULT),
        password_hash('MasMp4#vR1nGa', PASSWORD_DEFAULT),
        password_hash('Dar8sLd@2cXmP', PASSWORD_DEFAULT),
        password_hash('LukeSkywayT6&pW9zBk', PASSWORD_DEFAULT),
        password_hash('LeiHq3*rJ5fLt', PASSWORD_DEFAULT),
        password_hash('HanSooZ7!lV8mWx', PASSWORD_DEFAULT),
        password_hash('Yod5nCg$8rBjT**', PASSWORD_DEFAULT),
        password_hash('ObiWk2%wQ6zNp:!!', PASSWORD_DEFAULT),
        password_hash('BozF4^bH7tXl$^*', PASSWORD_DEFAULT),
        password_hash('ChewaTm#9yVrQ;:', PASSWORD_DEFAULT)
    ];

    $insert_users_sql = "
    INSERT INTO users (userid, username, password) VALUES
    (8888, 'Llywi Minllegui', '{$hashed_passwords[0]}'),
    (9999, 'Mas Tymar', '{$hashed_passwords[1]}'),
    (10, 'Darth Vader', '{$hashed_passwords[2]}'),
    (11, 'Luke Skywalker', '{$hashed_passwords[3]}'),
    (12, 'Leia Organa', '{$hashed_passwords[4]}'),
    (13, 'Han Solo', '{$hashed_passwords[5]}'),
    (14, 'Yoda', '{$hashed_passwords[6]}'),
    (15, 'Obi-Wan Kenobi', '{$hashed_passwords[7]}'),
    (16, 'Boba Fett', '{$hashed_passwords[8]}'),
    (10008, 'Chewbacca', '{$hashed_passwords[9]}');
    ";
    
    if ($conn->query($insert_users_sql) !== TRUE) {
        die("Error inserting default users: " . $conn->error);
    }
}


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
    </nav>
    <h1 class="title-discussion">find user - level x</h1>
    <div class="container">
        <form id="loginForm" method="POST">
        </form>
    </div>
</body>
</html>
