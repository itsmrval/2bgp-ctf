<?php
// upload.php

// Dossier où les fichiers seront stockés
$target_dir = "./upload/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

// Télécharger le fichier
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    // Redirection vers la page principale avec un message de succès
    header("Location: index.php?message=success");
} else {
    // Redirection vers la page principale avec un message d'erreur
    header("Location: index.php?message=error");
}
?>