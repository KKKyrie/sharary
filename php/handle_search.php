<?php
	
	require_once("./mysql_connect.php");

	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

	$response = (object)array();

	$_keyword = @$_GET["keyword"];
	$keyword = '%' . $_keyword . '%';

	$sql = "select * from t_books where bookname like '$keyword' or description like '$keyword'";

	$res = @mysql_query($sql);

	if ($res){
		
		$result_arr = array();
		$len = @mysql_num_rows($res);
		
		for ($i = 0; $i < $len; $i++){
			$result_arr[$i] = mysql_fetch_assoc($res);
		}
		
		$response -> ret = "1";
		$response -> msg = "Search success.";
		$response -> searchResult = $result_arr;
	
	} else {
		$response -> ret = "0";
		$response -> msg = mysql_error();
	}

	die(json_encode($response));

?>