<?php

session_start();
if (!isset($_SESSION['flag'])) {
    header("Location: index.php");
    exit();
}

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
    <nav class="nav">
        <div class="logo">
            <a href="#">
                <img src="logo/starwars.png" alt="Star Wars Logo">
            </a>
        </div>
    </nav>
    <div class="container">
        <div class="text-box">
            <p>
                Well done! <br>
                You found the coordinates of the planet Naboo! You will be able to go there immediately and continue your mission....<br>
                <strong>FLAG={XXXX}</strong>

            </p>
        </div>
    </div>
</body>
</html>