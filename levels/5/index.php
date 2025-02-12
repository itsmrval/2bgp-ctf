<?php
session_start();
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
    <div class="space-background"></div>

    <nav class="navbar">
        <div class="logo">
            <a href="#">
                <img src="logo/starwars.png" alt="Star Wars Logo">
            </a>
        </div>
    </nav>

    <div class="container">
        <p class="title">Le centre d'ADN </p>

        <!-- Formulaire de réinitialisation de mot de passe -->
        <form method="POST" action="">
            <label for="username">username :</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">mot de passe :</label>
            <input type="password" id="password" name="password" required>
            <br>
            <input type="submit" name="submit" value="Envoyer">
            <a href="send_token.php" class="forgot-password">mdp oublié ?</a>
        </form>

        <?php
        
        $host = 'localhost';
        $dbname = 'attackresetpwd';
        $user = 'root';
        $password = '';
        
        // Connexion à la base de données
        $mysqli = new mysqli($host, $user, $password, $dbname);
        
        // Vérifier la connexion
        if ($mysqli->connect_error) {
            die("Erreur de connexion à la base de données : " . $mysqli->connect_error);
        }

        // Vérifier si la table `users` est vide
        $query = "SELECT COUNT(*) AS count FROM users";
        $result = $mysqli->query($query);
        $row = $result->fetch_assoc();
        $userCount = $row['count'];

        if ($userCount == 0) {
            // La table `users` est vide, insérer les utilisateurs
            $users = [
                ['LukeSkywalker', 'luke.skywalker@2bgp-ctf.com', 'F0rc3!@#123'],
                ['DarthVader', 'darth.vader@2bgp-ctf.com', 'D@rkV4d3r!99'],
                ['LeiaOrgana', 'leia.organa@2bgp-ctf.com', 'R3b3l$c0ut!'],
                ['HanSolo', 'han.solo@2bgp-ctf.com', 'K3ss3lR@n!'],
                ['Yoda', 'yoda@2bgp-ctf.com', 'Tr@1nJ3d1$'],
                ['ObiWanKenobi', 'obiwan@2bgp-ctf.com', 'H3ll0Th3r3!'],
                ['Rey', 'rey@2bgp-ctf.com', 'Sc@v3ng3r!'],
                ['KyloRen', 'kylo.ren@2bgp-ctf.com', 'V@d3rF@n!'],
                ['Chewbacca', 'chewie@2bgp-ctf.com', 'R@wr!1234'],
                ['JangoFett1977', 'JangoFett1977@2bgp-ctf.com', 'Qu33n0fN@b00!'],
                ['ValkorionEmpereur', 'ValkorionEmpereur@2bgp-ctf.com', 'N@b00Qu33n!']
            ];

            foreach ($users as $userData) {
                $username = $userData[0];
                $email = $userData[1];
                $plainPassword = $userData[2];

                // Hacher le mot de passe
                $hashedPassword = password_hash($plainPassword, PASSWORD_BCRYPT);

                // Insérer l'utilisateur dans la base de données
                $query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
                $stmt = $mysqli->prepare($query);
                $stmt->bind_param('sss', $username, $email, $hashedPassword);
                $stmt->execute();
            }
        }

        if (isset($_POST['submit'])) {
            $username = htmlspecialchars($_POST['username']);
            $password = htmlspecialchars($_POST['password']);

            // Vérifier si l'utilisateur existe dans la base de données
            $query = "SELECT username, email, password FROM users WHERE username = ?";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $result = $stmt->get_result();
            $userData = $result->fetch_assoc();

            if ($userData) {
                // Vérifier le mot de passe
                if (password_verify($password, $userData['password'])) {
                    // Authentification réussie
                    echo "<div class='message success'>Authentification réussie.</div>";
                    $_SESSION['username'] = $userData['username'];
                    echo "<div class='message flag'>" . $_SESSION['username'] . "</div>";
                    header('Location: destroy.php');
                    exit;
                } else {
                    // Mot de passe incorrect
                    echo "<div class='message error'>Mot de passe incorrect.</div>";
                }
            } else {
                // Utilisateur introuvable
                echo "<div class='message error'>Utilisateur introuvable.</div>";
            }
        }
        ?>
    </div>
</body>
</html>