<?php
    
    require_once("./mysql_connect.php");

    mysql_query("set character set 'utf8'");
    mysql_query("set names 'utf8'");

    $response = (object)array();

    $receiver = @$_GET["receiver"];
    $type = @$_GET["type"];

    /*
		type: getNoticeCount || getNewNotice || getAllNotice
			获取新消息数目 ||	获取新消息 || 获取所有消息
    */

	if ($type == "getNoticeCount"){

		$sql = "select * from t_notice where receiver = '$receiver' and isNew = 1 order by id desc";

		$res = @mysql_query($sql);
		if ($res){
			$len = @mysql_num_rows($res);
			$response -> ret = "1";
			$response -> msg = "get new notice count success.";
			$response -> count = $len;

		}else{
			$response -> ret = "0";
			$response -> msg = mysql_error();
		}

	} else if ($type == "readNewNotice"){

		$sql = "update t_notice set isNew = 0 where receiver = '$receiver' and isNew = 1";
		$res = @mysql_query($sql);
		if ($res){
			$response -> ret = "1";
			$response -> msg = "read notice success.";
		}else{
			$response -> ret = "0";
			$response -> msg = mysql_error();
		}

	} else {

		if ($type == "getNewNotice"){

			$sql = "select * from t_notice where receiver = '$receiver' and isNew = 1 order by id desc";

		} else if ($type == "getAllNotice"){
	    	
	    	$sql = "select * from t_notice where receiver = '$receiver' order by id desc";
	    }

		$res = @mysql_query($sql);

	    if ($res){
	    	$result_arr = array();
	    	$len = @mysql_num_rows($res);


	    	for ($i = 0; $i < $len; $i++){
	    		$result_arr[$i] = mysql_fetch_assoc($res);
	    	}

	    	$response -> ret = "1";
	    	$response -> msg = "get noticeList success";
	    	$response -> noticeList = $result_arr;
	    }else{
	    	// 查询出错
	    	$response -> ret = "0";
	    	$response -> msg = mysql_error();
	    }

	}

	die(json_encode($response));

?>
