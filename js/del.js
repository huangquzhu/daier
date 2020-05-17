let username = getCookie("username");
function getData(goodsId){
    $.get("../php2/getGoodsInfo.php","goodsId="+goodsId,function(data){
        showData(data);
        countChange();
        $(".addcar").click(()=>{
            addShoppingCar(goodsId)
        })  
    },"json");
}

function showData(data){
    let htmlStr=`
        <div class="del_imgbox">
            <img src="${data.goodsImg}" alt="">
        </div>  
        <div class="del_titbox">
            <p class="del_p1">${data.goodsName}</p>
            <p class="del_p2">套件设备：<br>${data.goodsDesc}<br>${data.beiyong1}</p>
            <p class="del_p3">服务：<span>三年全智(上门+24在线支持)</span></p>
            <p class="del_p4">*此处配置参数仅供参考，请以下单后您邮箱收到订单确认函为准。</p>
            <p class="del_btn"><input type="button" value="-" id="cutcount" /><span id="count">1</span><input type="button" value="+" id="addcount" /></p>
            <p class="del_p5">￥${data.beiyong2}</p>
            <p class="del_p6">价格：￥<span id="det_price">${data.goodsPrice}</span></p>
            <p class="del_p7"><a href="shopcar.html"  class="p7_l">立即购买</a >
                <span  class="p7_r addcar">加入购物车</span></p>
        </div>
    `;
    $(".del_box").html(htmlStr);
}
function countChange(){
   let price=$("#det_price").html();
    $("#cutcount").click(function(){
        let num=$("#count").html();      
        if(num<=1){
            $("#count").html("1");
        }else{
            num--;
            $("#count").html(num);
            newp=num*price;
            $("#det_price").html(newp);
        }
    })
    $("#addcount").click(function(){
        let num=$("#count").html();
        if(num<1){
            $("#count").html("1");
        }else{
            num++;
            count;
            $("#count").html(num);
            newp=num*price;
            $("#det_price").html(newp);
        }
    }) 
}
function addShoppingCar(goodsId){    
    $.post("../php2/addShoppingCart.php",{
        "vipName":username,
        "goodsId":goodsId,
        "goodsCount":$("#count").html()
    },(data)=>{
        if(data==="0"){
            alert("添加失败");
        }else{
            alert("添加成功");
        }
    });
}
$(function(){
    let str =  location.search;
    let arr = str.split("=");    
    let goodsId =  arr[1];
    getData(goodsId);
})
