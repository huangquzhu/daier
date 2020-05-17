function verCode(n){
	let num;
	let arr=[];
	let str=" ";
	for(let i=0;i<n;i++){
		num1=Math.floor((Math.random()*10)+48);
		num2=Math.floor((Math.random()*26)+97);
		num3=Math.floor((Math.random()*26)+65);
		arr=[num1,num2,num3];
		num4=Math.floor((Math.random()*3));
		codeNum=arr[num4];
		codeStr=String.fromCharCode(codeNum);
		str=str+codeStr+" ";
	}
	return str;
}
let codeV=verCode(4);
$("#codeR").val(codeV);
$("#codeR").click(function(){
	$(this).val(verCode(4))
})
function isCode(){
	let str1=$("#codeW").val();
	let str2=$("#codeR").val();
	function singleStr(str){
		var newStr="";
		for (var i=0;i<str.length;i++){
			if(str[i]!==" "){
				newStr+=str[i];
			}
		}
		return newStr;
	}
	str1=singleStr(str1);
	str2=singleStr(str2);
	if(str1.toLowerCase()==str2.toLowerCase()){
		return true;
	}else{
		return false;
	}
}
$("#codeW").blur(function(){
	isCode();
})



$("#btn").click(function(){
	if(isCode()){
		$.post(
		    "../php/login.php",
		    {
		        "username":$("#userId").val(),
		        "userpass":$("#pswId").val()
		    },
		    function(str){            
		        if(str=="success"){
		        	addCookie("username",$("#userId").val(),7);
		            $("#tishi").html("恭喜您，登录成功,去<a href='./index.html'>首页</a>").css({"color":"green"});
		        }else if(str=="fail"){
		            $("#tishi").html("对不起，登录失败,请重新登录。没有账号？现在<a href='./reg.html'>注册</a>").css({"color":"red"});
		        }
		    },
		);
	}
	else{
		alert("验证码错误")
	}
    codeV=verCode(4);
	$("#codeR").val(codeV);
});