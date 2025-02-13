<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
  <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Niveau 1</title>
  <!-- Inclusion de Font Awesome pour les icônes -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Inclusion de la feuille de style -->
  <link rel="stylesheet" href="style.css">
</head>
<div class="body-intro">
  <!-- Navbar -->
  <nav class="navbar">
    <div class="logo">
      <a href="#">
        <img src="logo/starwars.png" alt="Star Wars Logo">
      </a>
    </div>
  </nav>

  <!-- Section de la photo avec la bulle de texte -->
  <div class="container-intro">
    <!-- Bulle de texte -->
    <div class="bubble-intro">
      <div class="message-content">
        Mon cher Padawan,
        <br><br>
        Mes troupes et moi-même sommes actuellement submergés par l'assaut de l'Empire éternel.
      </div>
      <button class="next-bubble">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>

  <!-- Bouton de redirection vers une autre page (initialement caché) -->
  <button class="next-page-btn">Continuer</button>

  <!-- Inclusion du fichier JavaScript externe -->
  <script src="mission1.js"></script>

  <footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
  </footer>
</body>
</html>
