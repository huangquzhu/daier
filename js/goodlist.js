function getGoods(){
    $.get("../php2/getGoodsList.php?typeId=001",{"typeId":"001"},(data)=>{
        showData(data); 
        $(".gl_shop").click(function(){
            let goodsId=$(this).next().html();
            addShoppingCar(goodsId);
        }) 
    },"json")
}

// 显示商品
function showData(data){
    let htmlStr="";
    data.forEach(item => {    
        htmlStr += `
            <div class="gl_box">
                <div class="gl_imgbox">
                    <a href="details2.html?goodsId=${item.goodsId}"><img src="${item.goodsImg}" alt=""></a>
                </div>
                <div class="gl_titbox">
                    <p class="gl_p1">${item.goodsName}</p>
                    <p class="gl_p2">套装包含：</p>
                    <p class="gl_p3">1、${item.goodsDesc}<br>2、${item.beiyong1}</p>
                    <p class="gl_p4">¥${item.beiyong2}</p>
                    <p class="gl_p5">套餐价：¥<span>${item.goodsPrice}</span>&nbsp;&nbsp;&nbsp;<b>立省：¥${item.beiyong2-item.goodsPrice}</b></p>
                    <p class="gl_p6">
                        <a href="details2.html?goodsId=${item.goodsId}" class="gl_buy float_left">立即购买</a>
                        <span class="gl_shop float_right">加入购物车</span>
                        <span class="gl_goodsid">${item.goodsId}</span>
                    </p>
                </div>
            </div>
        `
    });
    $("#gl-wrap").html(htmlStr);  
}

$(function(){
    getGoods();
})
let username = getCookie("username");
function addShoppingCar(goodsId){    
    $.post("../php2/addShoppingCart.php",{
        "vipName":username,
        "goodsId":goodsId,
        "goodsCount":1,
    },(data)=>{
        if(data==="0"){
            alert("添加失败");
        }else{
            alert("添加成功");
        }
    });
}