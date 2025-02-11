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
        <p class="title">the dna room</p>

        <!-- Formulaire de réinitialisation de mot de passe -->
        <form method="POST" action="">
            <label for="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="email">Adresse e-mail :</label>
            <input type="email" id="email" name="email" required>
            <br>
            <input type="submit" name="reset_password" value="Reset Password">
        </form>

        <?php
        if (isset($_POST['reset_password'])) {
            $username = $_POST['username'];
            $email = $_POST['email'];

            // Simuler une vérification de l'utilisateur
            $valid_user = "test";
            $valid_email = "test@test.com";

            if ($username === $valid_user && $email === $valid_email) {
                // Générer un token de réinitialisation (simulé)
                $token = bin2hex(random_bytes(16));
                echo "<div class='message success'>Token has been sent to your mailbox <strong>$token</strong></div>";
            } else {
                echo "<div class='message error'>Error: Incorrect email or username</div>";
            }
            
        }
        ?>
    </div>
</body>
</html>