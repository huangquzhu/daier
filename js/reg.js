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
$("#codeR").val(codeV)
$("#codeR").click(function(){
	$(this).val(verCode(4))
})
$("#userId").focus(function(){
	$(this).next().html("");
	$("#tishi").html("");
})
$("#userId").blur(function(){
	isUser();
})
$("#pswId").blur(function(){
	isPsw();
})
$("#pswId2").blur(function(){
	isPsw2();
})
$("#codeW").blur(function(){
	isCode();
})
function isUser(){
	var reg=/^[a-zA-z0-9]{3,6}$/;
	if(reg.test($("#userId").val())){
    	return true;
	}else{
		$("#userId").next().html("×");
		return false;
	}
}
function isPsw(){
	var reg=/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$/;
	if(reg.test($("#pswId").val())){
		$("#pswId").next().html("√");
		return true;
	}else{
		$("#pswId").next().html("×");
		pswId.value="";
		pswId.placeholder="请输入密码,只能同时使用数字字母，6-16位";
		return false;
	}
}
function isPsw2(){
	if($("#pswId").val()===$("#pswId2").val() && $("#pswId").val()!=""){
		$("#pswId2").next().html("√");
		return true;
	}else{
		$("#pswId2").next().html("×");
		$("#pswId2").val("");
		return false;
	}
}
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



$("#userId").blur(function(){
    $.get(
        "../php/checkUser.php",
        {"username":this.value},
        (str)=>{
            if(str==0 && isUser()){ //用户名存在
                $(this).next().html("√");
            }else{
                $(this).next().html("×");
				if(isUser() && str==1){
					$("#tishi").html("该用户名已被使用");
				}else if(isUser()==false){
					$("#tishi").html("用户名不符合规则");
				}				
            }
        },
        "json"
        );
});
$("#btn").click(function(){
	if(isUser() && isPsw() && isPsw2() &&isCode()){
		$.post(
	        "../php/addUser.php",
	        {
	            "username":$("#userId").val(),
	            "userpass":$("#pswId").val()
	        },
	        function(str){
	            if(str=="success"){
	                $("#tishi")
	                .html("恭喜您，注册成功，现在<a href='load.html'>登录<a>")
	                .css({
	                    "color":"green"
	                });
	                $("#userId").val("")
					$("#userId").next().html("")
					$("#pswId").val("");
					$("#pswId").next().html("");
					$("#pswId2").val("");
					$("#pswId2").next().html("");
					codeV=verCode(4);
					$("#codeR").val(codeV);
	            }else if(str=="fail"){
	                $("#tishi").html("对不起，注册失败，请重新注册").css({
	                    "color":"red"
	                });
	            }
	        }
	    );
	}else if(isCode()==false){
		alert("验证码错误")
		codeV=verCode(4);
		$("#codeR").val(codeV);
	}else{
		alert("您的注册信息有误")
		codeV=verCode(4);
		$("#codeR").val(codeV);
	}   
});

