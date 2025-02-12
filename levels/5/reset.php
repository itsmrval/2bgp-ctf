<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
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
        <p class="title">Reset Password</p>

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

        // Récupérer le token depuis l'URL
        $token = isset($_GET['token']) ? $_GET['token'] : null;

        if ($token) {
            // Vérifier si le token existe dans la base de données
            $stmt = $mysqli->prepare("SELECT username, email FROM password_reset_tokens WHERE token = ?");
            $stmt->bind_param("s", $token);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $username = $row['username'];
                $email = $row['email'];
                // Debug: Afficher les données récupérées
                echo "<p style=color:black;>Username: $username</p>";
                echo "<p style=color:black;>Email: $email</p>";
                // Vérifier si le formulaire a été soumis
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $new_password = $_POST['new_password'];
                    $confirm_password = $_POST['confirm_password'];

                    // Vérifier que les mots de passe correspondent
                    if ($new_password === $confirm_password) {
                        // Hasher le nouveau mot de passe
                        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

                        // Mettre à jour le mot de passe dans la table users
                        $update_stmt = $mysqli->prepare("UPDATE users SET password = ? WHERE username = ? AND email = ?");
                        $update_stmt->bind_param("sss", $hashed_password, $username, $email);
                        $update_stmt->execute();

                        if ($update_stmt->affected_rows > 0) {
                            echo "<p style='color: green;'>Password updated successfully.</p>";
                            
                            header("Refresh: 1; url=index.php");
                            exit(); 

                            // Supprimer le token utilisé
                            $delete_stmt = $mysqli->prepare("DELETE FROM password_reset_tokens WHERE token = ?");
                            $delete_stmt->bind_param("s", $token);
                            $delete_stmt->execute();
                        } else {
                            echo "<p style='color: red;'>Failed to update password.</p>";
                        }
                    } else {
                        echo "<p style='color: red;'>Passwords do not match.</p>";
                    }
                }

                // Afficher le formulaire de réinitialisation de mot de passe
                echo '
                <form method="POST" action="">
                    <label for="new_password">New Password:</label>
                    <input type="password" id="new_password" name="new_password" required>
                    <br>
                    <label for="confirm_password">Confirm Password:</label>
                    <input type="password" id="confirm_password" name="confirm_password" required>
                    <br>
                    <button type="submit">Reset Password</button>
                </form>';
            } else {
                echo "<p style='color: red;'>Invalid or expired token.</p>";
            }
        } else {
            echo "<p style='color: red;'>No token provided.</p>";
        }
        ?>
    </div>
</body>
</html>