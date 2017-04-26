<?php

	/*
		-3：注册失败
		-2：查询用户密码失败
		-1：查询用户失败
		 0：密码错误，登录失败
		 1：密码正确，登录成功
		 2：注册成功

	*/

	/*
		改变返回的结构
		{
			'ret' => '-3',
			'token' => ''
		}
	*/ 

	require_once("./mysql_connect.php");

	$username = @$_POST["username"];
	$password = @$_POST["password"];
	$salt = "allincle-strive4greatness";
	$_password = md5($password.$salt, false);

	mysql_query("set character set 'utf8'");  
	mysql_query("set names 'utf8'");

	
	//	1. username 是否已经存在？
	$sql_find_username = "select * from t_users where username = '$username'";
	$find_username = @mysql_query($sql_find_username);

	$response = (object)array();

	// 查询用户失败
	if (!$find_username){
		$response -> ret = '-1';
		die(json_encode($response));
	}


	$count = @mysql_num_rows($find_username);

	if ($count == 1){
		// username 已经存在
		
		// 查询当前 username 对应的 password
		$sql_find_password = "select password from t_users where username = '$username'";
		$find_password = @mysql_query($sql_find_password);
		
		// 查询用户密码失败
		if (!$find_password){
			$response -> ret = '-2';
			die(json_encode($response));
		}

		$find_password_result = @mysql_fetch_assoc($find_password)["password"];

		if ($_password != $find_password_result){
			// 密码错误，登录失败
			$response -> ret = '0';
			die(json_encode($response));
		}else{
			// 密码正确，登录成功
			$response -> ret = '1';
			$response -> token = $_password;
			die(json_encode($response));
		}

		
	}else{
		// 2. 将新用户的登录信息写入 t_users（注册）
		
		$sql_add_user = "insert into t_users (username, password) values ('$username', '$_password')";

		$add = @mysql_query($sql_add_user);

		if (!$add){
			// 注册失败
			$response -> ret = '-3';
			die(json_encode($response));
		}else{
			// 注册成功
			$response -> ret = '2';
			$response -> token = $_password;
			die(json_encode($response));
		}
	}




	
?>