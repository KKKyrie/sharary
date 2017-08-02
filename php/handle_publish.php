<?php

	$bookId = @$_POST["bookId"];
	$date = @$_POST["date"];
	$username = @$_POST["username"];
	$bookname = @$_POST["bookname"];
	$description = @$_POST["description"];
	$shareType = @$_POST["shareType"];
	$infoType = @$_POST["infoType"];
	$price = @$_POST["price"];

	require_once("./mysql_connect.php");
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

	$response = (object)array();

	$sql = "insert into t_books (bookId, date, username, bookname, description, shareType, infoType, price) values ('$bookId', '$date', '$username', '$bookname', '$description', '$shareType', '$infoType', '$price')";

	$res = @mysql_query($sql);

	if ($res){
		$response -> ret = "1";
		$response -> msg = "publish success";
	}else{
		$response -> ret = "0";
		$response -> msg = mysql_error();
	}

	die(json_encode($response));

?>
