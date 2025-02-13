<?php
$plan_key = $_GET['plan'] ?? null; // Récupère la valeur de 'plan' ou null si elle n'existe pas

// Si un plan est sélectionné
if ($plan_key) {
    $file_extension = pathinfo($plan_key, PATHINFO_EXTENSION); // Récupère l'extension du fichier

    // Si c'est un fichier texte, forcer le téléchargement
    if ($file_extension === 'txt') {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($plan_key) . '"');
        readfile($plan_key);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
    <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 6</title>
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
    <h1 class="title">trouver vaynin</h1>
    <div class="container">
        <form method="GET" action="">
            <label for="plan">Choose a plan :</label>
            <select id="plan" name="plan">
                <option value="images/plan1.png">Plan 1</option>
                <option value="images/plan2.png">Plan 2</option>
                <option value="images/plan3.png">Plan 3</option>
                <option value="images/plan4.png">Plan 4</option>
            </select>
            <input type="submit" value="voir le plan">
        </form>

        <?php if ($plan_key): ?>
            <?php if (pathinfo($plan_key, PATHINFO_EXTENSION) !== 'txt'): ?>
                <!-- Afficher l'image si un plan est sélectionné et que ce n'est pas un fichier texte -->
                <div class="plan-container">
                    <p class="plan">Plan Sélectionné :</p>
                    <img src="<?= $plan_key ?>" class="portrait">
                </div>
            <?php endif; ?>
        <?php else: ?>
            <!-- Afficher un message si aucun plan n'est sélectionné -->
            <p class="plan">Veuillez sélectionner un plan pour afficher l'image ou télécharger le fichier.</p>
        <?php endif; ?>
    </div>
</body>
<footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
</footer>
</html>