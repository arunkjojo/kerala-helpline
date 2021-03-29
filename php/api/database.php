<?php
define("SERVER","localhost");
define("USER","root");
define("PASSWORD","");
define("DATABASE","keralahelpline");

$con = new mysqli(SERVER,USER,PASSWORD,DATABASE) or die("Error establishing connection");

global $con;
?>