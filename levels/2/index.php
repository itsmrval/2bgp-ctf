<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niveau 2</title>
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
                <div class="news-image">
                    <img src="logo/falcon_ship.png" alt="Star Wars News Image">
                </div>

                <div class="news-text">
                    <h2>Communication de Arkann</h2>
                    <p>
                    Je suis Arkann, fils de Valkorion, l'Empereur Immortel.

                    Je pressens que mes jours sont comptés, car mon père commence à se douter de mes véritables intentions.
                    Au cas où quelque chose tournerait mal, j'ai dissimulé mon vaisseau quelque part dans la galaxie.

                    Je vous confie la mission de retrouver ses coordonnées, car il recèle des informations cruciales pour l'avenir de la galaxie.

                    Que la Force soit avec vous.

                    </p>
                </div>
            </div>
            
            <div class="coords-container">
                <form action="" method="post">
                    <div class="inputbox">
                        <input type="coords" name="latitude" id="latitude" required>
                        <label for="latitude">Latitude (degrés)</label>
                    </div>
                    <div class="inputbox">
                        <input type="coords" name="longitude" id="longitude" required>
                        <label for="longitude">Longitude (degrés)</label>
                    </div>
                    <?php
                        if (isset($_POST['latitude']) && isset($_POST['longitude'])) {
                            if ($_POST['latitude'] === '48' && $_POST['longitude'] === '2') {
                                header("Location: sucess.php");
                                $_SESSION['flag'] = "XXXXX";
                            } else {
                                echo '<div class="message error">Coordonnées invalides. Réessayer.</div>';
                            }
                        }
                    ?>
                    <div class="submit-btn">
                        <button type="submit" class="btn">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>


    </div>

    <footer class="footer">
        <p>&copy; 2025 Star Wars - 2BGP-CTF. Tous droits réservés.</p>
    </footer>
</body>

</html>
