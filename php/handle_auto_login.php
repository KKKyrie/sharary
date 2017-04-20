<?php
	
	require_once("./mysql_connect.php");

	$username = @$_POST["username"];
	$token = @$_POST["token"];

	mysql_query("set character set 'utf8'");  
	mysql_query("set names 'utf8'");

	$sql_find_token = "select password from t_users where username = '$username'";
	$find_token = @mysql_query($sql_find_token);

	$response = (object)array();
	
	if (!$find_token){
		// 查询 token 失败
		$response -> ret = '-1';
		die(json_encode($response));
	}

	if (@mysql_num_rows($find_token) == 0){
		// 没有这个用户（用户被删除，或通过localstorage伪造用户）
		$response -> ret = '0';
		die(json_encode($response));
	} else {
		// 存在当前用户，验证 token
		$find_token_result = @mysql_fetch_assoc($find_token)["password"];

		if ($token != $find_token_result){
			//token错误（通过 localstorage 恶意伪造）
			$response -> ret = '-2';
			die(json_encode($response));
		} else {
			// token 匹配，自动登录
			$response -> ret = '1';
			die(json_encode($response));
		}
	}


?>