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
    <title>Level 4</title>
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

    <div class="container">
    <p class="title">email storage</p>

    <!-- Faux email -->
    <div class="email-container">
        <div class="email-header">
            <p><strong>From:</strong> ValkorionEmpereur@2bgp-ctf.com</p>
            <p><strong>To:</strong> JangoFett1977@2bgp-ctf.com</p>
            <p><strong>Subject:</strong> DNA Center </p>
        </div>
        <div class="email-body">
            <p>Jango,</p>
            <p>Please, go to planet Kamino and create clones, it's urgent...  A piece of advice, remember my name and email.</p>
            <p>See you soon, GL</p>
            <p>- Valkorion</p>
            <p><strong>PS:</strong> FLAG={XXXX}</p>
        </div>
    </div>
</div>
</body>
</html>