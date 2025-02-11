<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level 3</title>
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
    <p class="title">please send your id card.</p>

    <!-- Formulaire de téléchargement de fichier -->
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <label for="file">Choose a file :</label>
        <input class="file-input" type="file" name="file" id="file">
        <br><br>
        <input type="submit" value="upload">
    </form>
    <!-- Affichage des messages -->
    <?php
        if (isset($_GET['message'])) {
            if ($_GET['message'] === 'success') {
                echo '<div class="message success">File uploaded : ID card is not valid.</div>';
            } elseif ($_GET['message'] === 'error') {
                echo '<div class="message error">Error while uploading your ID card.</div>';
            }
        }
    ?>


    </div>
</body>
</html>