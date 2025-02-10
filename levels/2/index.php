<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discussion - LevelX</title>
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
    <h1 class="title-discussion">Level 2</h1>
    <div class="container">
        <form id="loginForm" method="POST">
            <div class="inputbox">
                <input type="text" name="username" id="username" required>
                <label for="username">Username</label>
            </div>
            <div class="inputbox">
                <input type="password" name="password" id="password" required>
                <label for="password">Password</label>
            </div>

            <button type="submit" name="connect">Connect</button>
        </form>
    </div>
</body>
</html>
