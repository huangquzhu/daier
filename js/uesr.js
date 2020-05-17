
window.onload=function(){
	let username = getCookie("username");
	if(username){
		let str=`<a>${username}</a> / <a class="uesr_back">退出</a>`
		$(".load").html(str);
		$(".uesr_back").click(function(){
			removeCookie("username");
			str=`<a href="load.html">登录</a> / <a href="reg.html">注册</a>`
			$(".load").html(str);
			if($("#car_table")){
				$("#car_table").html("");
			}
		})
	}	
}
