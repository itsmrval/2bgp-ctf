<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 5 </title>
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
        <p class="title">Envoyer token</p>

        <!-- Formulaire de réinitialisation de mot de passe -->
        <form method="POST" action="">
            <label for="username">username :</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="email">e-mail :</label>
            <input type="email" id="email" name="email" required>
            <br>
            <input type="submit" name="reset_password" value="Reinitialiser">
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

        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;

        if (isset($_POST['reset_password'])) {
            $username = htmlspecialchars($_POST['username']);
            $email = htmlspecialchars($_POST['email']);

            // Simuler une vérification de l'utilisateur
            $valid_user = "JangoFett1977";
            $valid_email = "JangoFett1977@2bgp-ctf.com";

            if ($username === $valid_user && $email === $valid_email) {
                // Générer un token de réinitialisation
                $token = bin2hex(random_bytes(16));
            
                // Insérer ou mettre à jour le token dans la base de données
            
                // Vérifier si un token existe déjà pour cet utilisateur
                $query = "SELECT id, token FROM password_reset_tokens WHERE email = ?";
                $stmt = $mysqli->prepare($query);
                $stmt->bind_param('s', $email);
                $stmt->execute();
                $result = $stmt->get_result();
                $existingToken = $result->fetch_assoc();
            
                if ($existingToken) {
                    // Mettre à jour le token existant
                    $query = "UPDATE password_reset_tokens SET token = ? WHERE email = ?";
                    $stmt = $mysqli->prepare($query);
                    $stmt->bind_param('ss', $token, $email);
                    $stmt->execute();
                } else {
                    // Ajouter un nouveau token (sans inclure le mot de passe pour l'instant)
                    $query = "INSERT INTO password_reset_tokens (username, email, token) VALUES (?, ?, ?)";
                    $stmt = $mysqli->prepare($query);
                    $stmt->bind_param('sss', $username, $email, $token);
                    $stmt->execute();
                }
            
                // Charger PHPMailer
                require 'vendor/autoload.php'; // Chemin vers l'autoload de Composer

                $mail = new PHPMailer(true);

                try {
                    // Configuration du serveur SMTP
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com'; // Remplacez par votre serveur SMTP
                    $mail->SMTPAuth = true;
                    $mail->Username = '2bgp.ctf@gmail.com'; // Remplacez par votre adresse email
                    $mail->Password = 'ruoisxndpinkdicb'; // Remplacez par votre mot de passe
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Utilisez STARTTLS ou SSL
                    $mail->Port = 587; // Port SMTP (587 pour STARTTLS, 465 pour SSL)

                    // Destinataire et expéditeur
                    $mail->setFrom('2bgp.ctf@gmail.com', 'B2GP - Reset Pwd'); // Adresse de l'expéditeur
                    $mail->addAddress($email); // Adresse du destinataire

                    // Contenu de l'email
                    $mail->isHTML(true);
                    $mail->Subject = 'Password Reset Token';
                    $host= $_SERVER['HTTP_HOST'];
                    $mail->Body = "Bonjour Jango Fett,
                    <br>Suis ce lien afin de reinitialiser ton mot de passe : <a href='http://$host/reset.php?token=$token'>Reinitialiser Mot de passe</a><br>";
                    // Envoyer l'email
                    $mail->send();
                    echo "<div class='message success'>Le token pour reinitialiser le mdp a été envoyé.</div>";
                    header("Refresh: 1; url=index.php");
                    exit(); 
                } catch (Exception $e) {
                    echo "<div class='message error'>Erreur : Envoi impossible : {$mail->ErrorInfo}</div>";
                }
            } else {
                echo "<div class='message error'>Error: Email ou username incorrect.</div>";
            }
        }
        ?>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>