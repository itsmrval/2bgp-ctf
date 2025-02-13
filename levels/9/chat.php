<?php
ini_set('session.cookie_httponly', 0);
ini_set('session.cookie_secure', 0);
session_start(['cookie_lifetime' => 43200]);

// Vérifie si le cookie PHPSESSID est défini
if (!isset($_SESSION['userid'])) {
    header('Location: index.php');
    exit();
}

$conn = new mysqli("mysql", "level9user", "65ZnMYz*Q5Wp*7", "level9");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ajout d'un nouveau message
if (isset($_POST['send']) && !empty($_POST['message'])) {
    $message = $_POST['message']; // Ne pas nettoyer le message pour permettre les tests XSS
    $stmt = $conn->prepare("INSERT INTO discussions (userid, username, message, date) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("iss", $_SESSION['userid'], $_SESSION['username'], $message);
    $stmt->execute();
    header('Location: chat.php');
    exit();
}

// Supprimer les messages contenant PHPSESSID après 20 secondes
$stmt = $conn->prepare("DELETE FROM discussions WHERE message LIKE ? AND date < NOW() - INTERVAL 20 SECOND");
$param = '%PHPSESSID%';
$stmt->bind_param("s", $param);
$stmt->execute();

// Collecte des messages pour l'affichage
$messages = [];
$result = $conn->query("SELECT * FROM discussions ORDER BY date ASC");
while ($msg = $result->fetch_assoc()) {
    $messages[] = $msg;
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 9</title>
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
            <span class="user-name"><?= htmlspecialchars($_SESSION['username']) ?></span>
            <form method="POST" action="logout.php" style="display:inline;">
            <button type="submit" name="logout" class="logout-button">Deconnexion</button>
            </form>
        </div>
    </nav>
    <div class="content-wrapper">

        <div class="chat-container">
        <?php
            if ($_SESSION['username'] == 'Valkorion') {
                echo '<button class="star-wars-button form-sucess" onclick="window.location.href=\'sucess.php\'">Laissez Passer</button>';
            }
        ?>
            <div class="messages-area" id="messages-area">
                <?php foreach ($messages as $msg): ?>
                    <?php
                        $class = ($msg['userid'] == $_SESSION['userid']) ? 'sent' : 'received';
                        $username = htmlspecialchars($msg['username']); // Protéger le nom d'utilisateur
                        $content = $msg['message']; // Pas de protection pour permettre XSS
                        $formattedDate = date('d M Y', strtotime($msg['date']));
                    ?>
                    <div class='message <?= $class ?>'>
                        <div class='username'><?= $username ?></div>
                        <div class='content'><?= $content ?></div> <!-- Vulnérabilité XSS ici -->
                        <div class='timestamp'><?= $formattedDate ?></div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="message-input-container">
                <form class="message-form" method="POST" action="">
                    <input type="text" name="message" id="message-input" placeholder="Écrivez votre message..." required>
                    <button type="submit" name="send"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    </div>

    <script>
        setInterval(function() {
            var messagesArea = document.getElementById('messages-area');
            fetch('index.php')
                .then(response => response.text())
                .then(html => {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, 'text/html');
                    var newMessages = doc.getElementById('messages-area').innerHTML;
                    messagesArea.innerHTML = newMessages;
                });
        }, 6000);
    </script>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>
