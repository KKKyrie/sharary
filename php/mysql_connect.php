<?php
	
	require_once("./mysql_config.php");

	$con = mysql_connect(SERVERNAME, USERNAME, PASSWORD);

	if (!$con){
		die("Cannot connect to mysql, error msg: " . mysql_error());
	}

	mysql_select_db('sharary', $con);


?>