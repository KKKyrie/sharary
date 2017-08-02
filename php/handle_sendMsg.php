<?php
    require_once("./mysql_connect.php");

    mysql_query("set character set 'utf8'");
    mysql_query("set names 'utf8'");

    $response = (object)array();

    $sender = @$_POST["sender"];
    $receiver = @$_POST["receiver"];
    $date = @$_POST["date"];
    $message = @$_POST["message"];
    $bookname = @$_POST["bookname"];

    $sql = "insert into t_notice (sender, receiver, date, message, bookname) values ('$sender', '$receiver', '$date', '$message', '$bookname')";

    $res = @mysql_query($sql);
    if ($res){
        $response -> ret = "1";
        $response -> msg = "send msg success";
    }else{
        $response -> ret = "0";
        $response -> msg = mysql_error();
    }

    die(json_encode($response));
?>
