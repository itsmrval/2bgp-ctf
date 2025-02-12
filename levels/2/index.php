<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level 2</title>
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

    <div class="space-background">
    </div>

    <div class="content-wrapper">
        <div class="news-section">

            <div class="news-image">
                <img src="logo/falcon_ship.png" alt="Star Wars News Image">
            </div>

            <div class="news-text">
                <h2>galactic new report : lost starship - coords needed !</h2>
                <p>

                    Date: 05/02/2025 – Galactic Standard Calendar
                    Location: Outer Rim Territories

                    A distress signal has been intercepted from an unknown sector of the Outer Rim. A vessel vanished
                    without a trace during a routine hyperspace jump. The Galactic Alliance is calling upon all
                    available pilots, bounty hunters, and navigators to assist in determining its last known coordinates
                    and recover the lost ship.
                    The ship’s last known trajectory suggested a path toward an uncharted system, but its exact location
                    remains unknown.

                    Mission Control urges all explorers to input possible navigational anomalies and relay any
                    intercepted transmissions. The first step is to locate the ship’s coordinates in order to direct it
                    to the nearest planetary body, where the first stage of the mission can begin.

                    Time is of the essence!
                    Stay tuned for further updates as this mission unfolds!
                </p>
            </div>
            <div class="coords-container">
            <form action="sucess.php" method="post">
            <div class="inputbox">
                    <input type="coords" name="latitude" id="latitude" required>
                    <label for="latitude">Latitude</label>
            </div>
            <div class="inputbox">
                    <input type="coords" name="longitude" id="longitude" required>
                    <label for="longitude">Longitude</label>
            </div>
                <div class="submit-btn">
                    <button type="submit" class="btn">Submit</button>
                </div>
            </form>
            </div>
            <?php
                if (isset($_POST['latitude']) && isset($_POST['longitude'])) {
                    if ($_POST['latitude'] === '42.3601' && $_POST['longitude'] === '-71.0589') {
                        header("Location: sucess.php");
                        $_SESSION['flag'] = "XXXXX";
                    } else {
                        echo '<div class="message error">Coordinates are incorrect. Try again.</div>';
                    }
                }


            ?>
        </div>

</body>

</html>