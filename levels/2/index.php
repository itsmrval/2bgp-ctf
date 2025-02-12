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

    <div class="content-wrapper">
        <div class="news-section">
            <div class="news-content">
                <div class="news-image">
                    <img src="logo/falcon_ship.png" alt="Star Wars News Image">
                </div>

                <div class="news-text">
                    <h2>galactic new report : lost starship - coords needed !</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia quo pariatur cumque voluptatibus
                         necessitatibus exercitationem dignissimos, sit doloremque iure voluptatum explicabo veniam nostrum. Ea vero aliquam necessitatibus consequatur in!
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia quo pariatur cumque voluptatibus
                         necessitatibus exercitationem dignissimos, sit doloremque iure voluptatum explicabo veniam nostrum. Ea vero aliquam necessitatibus consequatur in!
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia quo pariatur cumque voluptatibus
                         necessitatibus exercitationem dignissimos, sit doloremque iure voluptatum explicabo veniam nostrum. Ea vero aliquam necessitatibus consequatur in!
                    </p>
                </div>
            </div>
            
            <div class="coords-container">
                <form action="" method="post">
                    <div class="inputbox">
                        <input type="coords" name="latitude" id="latitude" required>
                        <label for="latitude">Latitude (degrees)</label>
                    </div>
                    <div class="inputbox">
                        <input type="coords" name="longitude" id="longitude" required>
                        <label for="longitude">Longitude (degrees)</label>
                    </div>
                    <?php
                        if (isset($_POST['latitude']) && isset($_POST['longitude'])) {
                            if ($_POST['latitude'] === '48' && $_POST['longitude'] === '2') {
                                header("Location: sucess.php");
                                $_SESSION['flag'] = "XXXXX";
                            } else {
                                echo '<div class="message error">Coordinates are incorrect. Try again.</div>';
                            }
                        }
                    ?>
                    <div class="submit-btn">
                        <button type="submit" class="btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>


    </div>

    <footer class="footer">
        <p>&copy; 2025 Star Wars - 2BGP-CTF. All rights reserved.</p>
    </footer>
</body>

</html>
