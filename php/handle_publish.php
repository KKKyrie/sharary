<?php

	$book_id = @$_POST["bookId"];
	$date = @$_POST["date"];
	$username = @$_POST["username"];
	$bookname = @$_POST["bookName"];
	$description = @$_POST["description"];
	$share_type = @$_POST["shareType"];
	$info_type = @$_POST["infoType"];
	$price = @$_POST["price"];

	require_once("./mysql_connect.php");
	mysql_query("set character set 'utf8'");  
	mysql_query("set names 'utf8'");

	$response = (object)array();

	$sql = "insert into t_books (book_id, date, username, bookname, description, share_type, info_type, price) values ('$book_id', '$date', '$username', '$bookname', '$description', '$share_type', '$info_type', '$price')";

	$res = @mysql_query($sql);

	if ($res){
		$response -> ret = '1';
		$response -> msg = 'publish success';
	}else{
		$response -> ret = '0';
		$response -> msg = mysql_error();
	}

	die(json_encode($response));

?>