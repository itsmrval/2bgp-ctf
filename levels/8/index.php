<?php

// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "attacksql");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Création de la table si elle n'existe pas
$table_sql = "
CREATE TABLE IF NOT EXISTS livres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    date DATE,
    auteur VARCHAR(255),
    secret VARCHAR(32) 
)";

if ($conn->query($table_sql) !== TRUE) {
    die("Error creating table: " . $conn->error);
}

// Vérification et insertion des livres par défaut
$livres_check = $conn->query("SELECT * FROM livres");
if ($livres_check->num_rows === 0) {
    $livres = [
        ["etoile noire", "1977-05-25", "George Lucas"],
        ["Empire Contre Attaque", "1980-05-21", "George Lucas"],
        ["Le Retour du Jedi", "1983-05-25", "George Lucas"],
        ["La Menace Fantôme", "1999-05-19", "George Lucas"],
        ["Attaque des Clones", "2002-05-16", "George Lucas"],
        ["La Revanche des Sith", "2005-05-19", "George Lucas"],
        ["Les Derniers Jedi", "2015-12-18", "J.J. Abrams"],
        ["Le Réveil de la Force", "2017-12-15", "Vaynin"],
        ["Ascension de Skywalker", "2019-12-20", "J.J. Abrams"],
        ["Rogue One", "2016-12-16", "Gareth Edwards"]
    ];

    $secrets = [
        'MasMp4#vR1nGa',
        'Dar8sLd@2cXmP',
        'LukeSkywayT6&pW9zBk',
        'LeiHq3*rJ5fLt',
        'HanSooZ7!lV8mWx',
        'Yod5nCg$8rBjT**',
        'ObiWk2%wQ6zNp:!!',
        'password',
        'BozF4^bH7tXl$^*',
        'ChewaTm#9yVrQ;:'
    ];


    $hashed_secrets = array_map('md5', $secrets);
    foreach ($livres as $index => $livre) {
        $nom = $conn->real_escape_string($livre[0]);
        $date = $conn->real_escape_string($livre[1]);
        $auteur = $conn->real_escape_string($livre[2]);
        $secretHache = $hashed_secrets[$index];

        $insert_sql = "
        INSERT INTO livres (nom, date, auteur, secret)
        VALUES ('$nom', '$date', '$auteur', '$secretHache')";

        if ($conn->query($insert_sql) !== TRUE) {
            die("Error inserting book: " . $conn->error);
        }
    }
}

// Initialisation de la variable pour stocker les résultats ou les messages d'erreur
$output = "";

// Traitement de la requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];

    // Requête SQL vulnérable à l'injection SQL
    $sql = "SELECT id, nom, date, auteur FROM livres WHERE nom = '$title'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Affichage des informations du livre sous forme de carte stylée
        while ($row = $result->fetch_assoc()) {
            $output .= "
            <div class='book-card'>
                <div class='book-info'>
                    <h3>{$row['nom']}</h3>
                    <p><strong>ID:</strong> {$row['id']}</p>
                    <p><strong>Date:</strong> {$row['date']}</p>
                    <p><strong>Auteur:</strong> {$row['auteur']}</p>
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
<html lang="fr">
<head>
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bibliothèque</title>
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
    <h1 class="title">Trouver le livre</h1>
    <div class="container">
        <form method="POST">
            <label for="title">Titre :</label>
            <input type="text" id="title" name="title" required>
            <button type="submit">Rechercher</button>
        </form>
        <!-- Affiche les résultats ou le message d'erreur ici -->
        <div class="output">
            <?php echo $output; ?>
        </div>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>