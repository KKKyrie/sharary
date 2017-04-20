<?php
	$pageNo = @$_GET["pageNo"];
	$username = @$_GET["username"];

	require_once("./mysql_connect.php");

	mysql_query("set character set 'utf8'");  
	mysql_query("set names 'utf8'");

	$response = (object)array();

	$start=($pageNo-1)*3;
	$sql = "select * from t_books where username = '$username' order by id desc LIMIT ".$start.",3";

	$res = @mysql_query($sql);

	if ($res){
		
		$result_arr = array();

		$len = @mysql_num_rows($res);
	
		for ($i = 0; $i < $len; $i++){
			$result_arr[$i] = mysql_fetch_assoc($res);
		}

		$response -> ret = '1';
		$response -> msg = 'Get my books success';
		$response -> books = $result_arr;

	}else{
		// 查询错误
		$response -> ret = '0';
		$response -> msg = mysql_error();
	}
	
	die(json_encode($response));	
?>