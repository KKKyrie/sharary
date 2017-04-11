<?php


	die('Database juzicode had already been created, this php script will never be executed again.');

	require_once('./mysql_connect.php');

	// mysql_query('drop database juzicode');
	// die('stop here');

	// if (!mysql_query('create database sharary', $con)){
	// 	die('An ERROR occurs when creating the database sharary, error msg: ' . mysql_error());
	// }


	mysql_query('CHARACTER SET "utf8"');
	mysql_query('COLLATE "utf8_general_ci"');

	//设置编码格式
	mysql_query('set character_set_client = "utf8"');
	mysql_query('set character_set_connection = "utf8"');
	mysql_query('set character_set_results = "utf8"');

	//create table 'users'
	$create_table_users = mysql_query('create table t_users (
		id int(5) null auto_increment primary key,
		username varchar(30) not null,
		password varchar(50) not null
	)ENGINE=InnoDB DEFAULT CHARSET="utf8"');

	if (!$create_table_users){
		$error = mysql_error();
		// mysql_query('drop database sharary');
		die('ERROR creating table t_users, error msg: ' . $error);
	}



	//create table 'books'
	$create_table_books = mysql_query('create table t_books (
		id int(5) null auto_increment primary key,
		date varchar(50) not null,
		book_id varchar(20) not null,
		username varchar(30) not null,
		bookname varchar(30) not null,
		description varchar(250) not null,
		share_type int(1) not null,
		info_type int(1) not null 
	)ENGINE=InnoDB DEFAULT CHARSET="utf8"');

	if (!$create_table_books){
		$error = mysql_error();
		// mysql_query('drop database sharary');
		die('ERROR creating table books, error msg: ' . $error);
	}


	// create table notice
	$create_table_notice = mysql_query('create table t_notice (
		id int(5) null auto_increment primary key,
		sender varchar(30) not null,
		receiver varchar(30) not null,
		date varchar(50) not null,
		message varchar(100) not null,
		bookname varchar(30) not null,
		is_new int(1) not null default 1	
	)ENGINE=InnoDB DEFAULT CHARSET="utf8"');

	if (!$create_table_notice){
		$error = mysql_error();
		// mysql_query('drop database sharary');
		die('ERROR creating table notice, error msg: ' . $error);
	}

	die('database sharary has been created!');
	
?>