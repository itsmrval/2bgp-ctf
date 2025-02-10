
<?php
// Connexion de la base de données. Attention les identifiants ne devraient
// pas être codés en dur dans le fichier, ici c’est à titre pédagogique
$host = "localhost";
$username_db = "guillemin";
$password_db = "willy";
$dbname = "users_db";
// Créer une connexion avec mysqli en mode objet
$conn = new mysqli($host, $username_db, $password_db, $dbname);
// Vérifier la connexion
if ($conn->connect_error) {
die("Échec de la connexion : " . $conn->connect_error);
}
// Vérification si le formulaire a été soumis. trim supprimer les espaces avant et
après la chaîne
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$username = trim($_POST['username']);
$password = trim($_POST['password']);
// Vérification que les champs ne sont pas vides
if (!empty($username) && !empty($password)) {
// Échapper les données pour éviter les injections SQL
$username = $conn->real_escape_string($username);
// Requête pour récupérer l'utilisateur
$query = "SELECT * FROM utilisateurs WHERE username = '$username'";
$result = $conn->query($query);
// Vérifier si l'utilisateur a été trouvé
if ($result->num_rows > 0) {
$user = $result->fetch_assoc();
// Vérifier si le mot de passe haché correspond au mot de passe fourni
if (password_verify($password, $user['password'])) {
// Si la connexion est réussie, rediriger vers la page d'accueil ou
tableau de bord
header("Location: accueil.php");
exit();
}
}
// Message d'erreur générique
echo "Nom d'utilisateur ou mot de passe incorrect.";
} else {
echo "Veuillez remplir tous les champs.";
}
}
// Fermer la connexion
$conn->close()