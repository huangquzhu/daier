<?php
	header("content-type:text/html;charset=utf-8");
	$name = $_POST['username'];
    $pass = $_POST['userpass'];

	$conn=mysqli_connect("localhost","root","root","shoppingcenter");
	$result=mysqli_query($conn,"select * from vip where username='{$name}' and userpass='{$pass}'");
	mysqli_close($conn);

	$arr = mysqli_fetch_all($result, MYSQL_ASSOC);

	if(count($arr)==1){
		echo "success";
	}else{
		echo "fail";
	}
?>