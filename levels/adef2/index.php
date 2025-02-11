<?php

// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "attackSQL");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Vérification et insertion des utilisateurs par défaut
$user_check = $conn->query("SELECT * FROM users");
if ($user_check->num_rows === 0) {
    $passwords = [
        'password',
        'MasMp4#vR1nGa',
        'Dar8sLd@2cXmP',
        'LukeSkywayT6&pW9zBk',
        'LeiHq3*rJ5fLt',
        'HanSooZ7!lV8mWx',
        'Yod5nCg$8rBjT**',
        'ObiWk2%wQ6zNp:!!',
        'BozF4^bH7tXl$^*',
        'ChewaTm#9yVrQ;:'
    ];

    $hashed_passwords = array_map('md5', $passwords);

    $insert_users_sql = "
    INSERT INTO users (userid, username, email, tel, password) VALUES
    (8888, 'Llywi Minllegui', 'lminllegui@2bgp-ctf.com', '123-456-7890', '{$hashed_passwords[0]}'),
    (10, 'Darth Vader', 'dvader@2bgp-ctf.com', '345-678-9012', '{$hashed_passwords[2]}'),
    (11, 'Luke Skywalker', 'lskywalker@2bgp-ctf.com', '456-789-0123', '{$hashed_passwords[3]}'),
    (12, 'Leia Organa', 'lorgana@2bgp-ctf.com', '567-890-1234', '{$hashed_passwords[4]}'),
    (13, 'Han Solo', 'hsolo@2bgp-ctf.com', '678-901-2345', '{$hashed_passwords[5]}'),
    (14, 'Yoda', 'yoda@2bgp-ctf.com', '789-012-3456', '{$hashed_passwords[6]}'),
    (15, 'Obi-Wan Kenobi', 'okenobi@2bgp-ctf.com', '890-123-4567', '{$hashed_passwords[7]}'),
    (16, 'Boba Fett', 'bfett@2bgp-ctf.com', '901-234-5678', '{$hashed_passwords[8]}'),
    (10008, 'Chewbacca', 'chewbacca@2bgp-ctf.com', '012-345-6789', '{$hashed_passwords[9]}');
    ";
    
    if ($conn->query($insert_users_sql) !== TRUE) {
        die("Error inserting default users: " . $conn->error);
    }
}

// Initialisation de la variable pour stocker les résultats ou les messages d'erreur
$output = "";

// Traitement de la requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    // Requête SQL vulnérable à l'injection SQL
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Affichage des informations de l'utilisateur sous forme de carte stylée
        while ($row = $result->fetch_assoc()) {
            $output .= "
            <div class='user-card'>
                <div class='user-info'>
                    <h3>{$row['username']}</h3>
                    <p><strong>ID:</strong> {$row['userid']}</p>
                    <p><strong>Email:</strong> {$row['email']}</p>
                    <p><strong>Téléphone:</strong> {$row['tel']}</p>
                </div>
            </div>";
        }
    } else {
        $output = "<div class='error-message'>0 results</div>"; // Message d'erreur stylé
    }
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
    </nav>
    <h1 class="title">find user - level x</h1>
    <div class="container">
        <form method="POST">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" required>
            <button type="submit">Search</button>
        </form>
        <!-- Affiche les résultats ou le message d'erreur ici -->
        <div class="output">
            <?php echo $output; ?>
        </div>
    </div>
</body>
</html>