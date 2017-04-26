<?php

    $bookId = @$_POST["bookId"];
    $username = @$_POST["username"];

    require_once("./mysql_connect.php");

    mysql_query("set character set 'utf8'");
    mysql_query("set names 'utf8'");

    $response = (object)array();

    $sql = "delete from t_books where bookId = '$bookId' and username = '$username'";

    $res = @mysql_query($sql);

    if ($res){
        $response -> ret = "1";
        $response -> msg = "delete success.";
    }else{
        $response -> ret = "0";
        $response -> msg = mysql_error();
    }

    die(json_encode($response));
?>
