<?php
// Vérifie si l'URL est fournie en paramètre
if (isset($_GET['url'])) {
    $url = $_GET['url'];

    // Initialise une session cURL
    $ch = curl_init();

    // Configure les options cURL
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    // Exécute la requête cURL
    $response = curl_exec($ch);

    // Vérifie s'il y a eu une erreur
    if (curl_errno($ch)) {
        echo 'Erreur cURL: ' . curl_error($ch);
    } else {
        // Affiche la réponse
        echo '<pre>' . htmlspecialchars($response) . '</pre>';
    }

    // Ferme la session cURL
    curl_close($ch);
} else {
    echo 'Aucune URL fournie.';
}
?>
