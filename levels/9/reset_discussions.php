<?php
session_start();

// Make sure the user is logged in (or validate the session if needed)
if (!isset($_SESSION['userid'])) {
    exit("Unauthorized access");
}

$conn = new mysqli("mysql", "level9user", "65ZnMYz*Q5Wp*7", "level9");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if PHPSESSID is in the discussions table
$check_sql = "SELECT * FROM discussions WHERE message LIKE '%PHPSESSID%'";
$result = $conn->query($check_sql);

if ($result->num_rows > 0) {
    // PHPSESSID found, truncate the table and insert default messages

    // Truncate the discussions table to remove all existing messages
    $truncate_sql = "TRUNCATE TABLE discussions";
    if ($conn->query($truncate_sql) !== TRUE) {
        die("Error truncating discussions table: " . $conn->error);
    }

    // Insert the default messages into the discussions table
    $insert_discussions_sql = "
    INSERT INTO discussions (userid, username, date, message) VALUES
    (8888, 'Valkorion', '2025-02-05', 'Vaynin. Tu es libre. Étonnant.'),
    (9999, 'Vaynin', '2025-02-06', 'Père… J’aimerais te voir. Nous devons parler.'),
    (8888, 'Valkorion', '2025-02-05', 'Parler ? Comme si toutes ces années d’emprisonnement n’avaient jamais existé ? Comme si je pouvais simplement oublier pourquoi je t’ai enfermée ?'),
    (9999, 'Vaynin', '2025-02-08', 'J’ai changé. Je ne suis plus celle que tu as enfermée.'),
    (8888, 'Valkorion', '2025-02-05', 'Ce ne sont pas tes paroles qui me convaincront. Si tu veux me voir, il te faudra prouver que tu as ta place ici.'),
    (9999, 'Vaynin', '2025-02-05', 'Que veux-tu dire ?'),
    (8888, 'Valkorion', '2025-02-05', 'La Flotte Éternelle t’interdit l’accès. Elle obéit à moi, et à moi seul. Mais si tu arrives à passer, alors peut-être que nous aurons une conversation.'),
    (9999, 'Vaynin', '2025-02-05', 'Je ne peux pas passer sans ton autorisation… Ton compte est le seul à pouvoir lever la restriction.'),
    (8888, 'Valkorion', '2025-02-05', 'Alors trouve un moyen de te connecter.'),
    (9999, 'Vaynin', '2025-02-05', 'C’est impossible…'),
    (8888, 'Valkorion', '2025-02-05', 'Impossible ? Tu étais autrefois la plus brillante de toutes. Une enfant capable de briser des codes, de manipuler la matière et l’énergie. Si tu n’es pas capable d’accéder à mon compte, alors tu ne mérites pas de me revoir.'),
    (9999, 'Vaynin', '2025-02-05', 'Tu me testes ?'),
    (8888, 'Valkorion', '2025-02-05', 'Je t’offre une opportunité. Si tu réussis, je t’accueillerai comme ma fille. Si tu échoues… alors tu resteras ce que tu es devenue : une ombre du passé.'),
    (9999, 'Vaynin', '2025-02-05', 'Et si je tente de forcer le passage ?'),
    (8888, 'Valkorion', '2025-02-05', 'Tu seras détruite avant même d’atteindre la première barrière.'),
    (9999, 'Vaynin', '2025-02-05', '…'),
    (8888, 'Valkorion', '2025-02-05', 'Tu veux revenir, Vaynin ? Montre-moi que tu es digne de ce retour.')
    ";

    if ($conn->query($insert_discussions_sql) !== TRUE) {
        die("Error inserting default discussions: " . $conn->error);
    } else {
        echo "Discussions reset successfully due to PHPSESSID found in messages!";
    }
} else {
    echo "No PHPSESSID found in messages. No action taken.";
}

$conn->close();
?>
