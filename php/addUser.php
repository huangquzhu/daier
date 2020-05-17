<?php
	header("content-type:text/html;charset=utf-8");
	$name=$_POST["username"];
	$pass=$_POST["userpass"];

	$conn=mysqli_connect("localhost","root","root","shoppingcenter");
	$result=mysqli_query($conn,"insert into vip(username,userpass) value ('{$name}','{$pass}')");
	mysqli_close($conn);

	if($result){
        echo "success";
    }else{
        echo "fail";
    }
?>