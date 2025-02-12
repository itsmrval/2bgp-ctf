<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mission 1</title>
  <!-- Inclusion de Font Awesome pour les icônes -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Inclusion de la feuille de style -->
  <link rel="stylesheet" href="mission1.css">
</head>
<body class="hangarbody">
  <!-- Navbar -->
  <nav class="navbar">
    <div class="logo">
      <a href="#">
        <img src="logo/starwars.png" alt="Star Wars Logo">
      </a>
    </div>
    <div class="profile">
      <i class="fa-solid fa-user"></i>
      <span class="user-name">John Doe</span>
      <button class="disconnect-btn">Déconnexion</button>
    </div>
  </nav>

  <!-- Section de la photo avec la bulle de texte -->
  <div class="container">
    <!-- Bulle de texte -->
    <div class="bubble">
      <div class="message-content">
        
      
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
</body>
</html>
