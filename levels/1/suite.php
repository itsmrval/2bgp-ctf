<?php
  session_start();
      if (isset($_POST['planet'])) {
          // Par exemple, on vérifie si la planète saisie est "endor"
          if (strtolower(trim($_POST['planet'])) === 'endor') {
              $_SESSION['sucess'] = "okey";
              header("Location: sucess.php");
              exit();
          } else {
              echo '<div class="message error">Planète incorrecte. Réessayez.</div>';
          }
      }
    ?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <link rel="icon" href="/logo/b2gp.png" type="image/x-icon">
  <link rel="shortcut icon" href="/logo/b2gp.png" type="image/x-icon">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Niveau 1</title>
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

  <div class="content-wrapper">
    <div class="news-section">
      <div class="news-content">
        <div class="news-text">
          <div class="title-container">
            <h2>Message chiffré par les services secret</h2>
          </div>
          <p>
          <div class="result">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(71).png" alt="char(71)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(67).png" alt="char(67)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(67).png" alt="char(67)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(81).png" alt="char(81)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(71).png" alt="char(71)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(67).png" alt="char(67)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(77).png" alt="char(77)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(70).png" alt="char(70)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(75).png" alt="char(75)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(67).png" alt="char(67)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(76).png" alt="char(76)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(77).png" alt="char(77)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(80).png" alt="char(80)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(74).png" alt="char(74)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(71).png" alt="char(71)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(90).png" alt="char(90)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(66).png" alt="char(66)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(65).png" alt="char(65)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(81).png" alt="char(81)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(73).png" alt="char(73)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(84).png" alt="char(84)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(86).png" alt="char(86)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(83).png" alt="char(83)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(85).png" alt="char(85)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
            <img src="https://www.dcode.fr/tools/aurebesh/images/char(32).png" alt="char(32)">
</div>


<div class="invisible">
  <img src="https://www.dcode.fr/tools/aurebesh/images/char(69).png" alt="char(69)">
  <img src="https://www.dcode.fr/tools/aurebesh/images/char(78).png" alt="char(78)">
  <img src="https://www.dcode.fr/tools/aurebesh/images/char(68).png" alt="char(68)">
  <img src="https://www.dcode.fr/tools/aurebesh/images/char(79).png" alt="char(79)">
  <img src="https://www.dcode.fr/tools/aurebesh/images/char(82).png" alt="char(82)">
</div>
            </p>
            </div>
      </div>

      <div class="planet-container">
  <form action="" method="post">
    <div class="inputbox">
      <input type="text" name="planet" id="planet">
      <label for="planet">Nom de la planète</label>
    </div>
    <div class="submit-btn">
      <button type="submit" class="btn">Envoyer</button>
    </div>
  </form>
</div>

  </div>

  <footer class="footer">
    <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
  </footer>
</body>

</html>
            