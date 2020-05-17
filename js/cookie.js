//添加cookie
function addCookie(key,value,n){
	let d=new Date();
	d.setDate(d.getDate()+n);
	var a=`${key}=${escape(value)};expires=${d.toGMTString()}`
	document.cookie=a;
		console.log(document.cookie);
}

//查找cookie
function getCookie(key){
	 let str = unescape(document.cookie);
    let arr = str.split("; ");
    for(let i=0;i<arr.length;i++){
        if(arr[i].indexOf(key+"=")==0){
            return arr[i].split("=")[1];
        }
    }
    return null;
}

//删除cookie
function removeCookie(key){
    addCookie(key,"byebye",-1);
}

//更改cookie
function updateCookie(key,value,count){
    let str = getCookie(key);
    if(str==null){
        return false;
    }
    addCookie(key,value,count);
    return true;
}