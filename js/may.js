function getGoods(){
    $.get("../php2/getGoodsList.php?typeId=002",{"typeId":"002"},(data)=>{
        showData(data);  
    },"json")
}

// 显示商品
function showData(data){
    let htmlStr="";
    data.forEach(item => {    
        htmlStr += `
            <div class="kill_box1 float_left">
                <div class="kill_imgbox">
                    <a href="details2.html?goodsId=${item.goodsId}"><img src="${item.goodsImg}" alt=""></a>
                </div>
                <div class="kill_txtbox">
                    <p class="kill_p1">${item.goodsName}</p>
                    <p class="kill_p2">${item.beiyong1}</p>
                    <p class="kill_p3">${item.goodsDesc}</p>
                    <p class="kill_p4">￥${item.beiyong2}</p>
                    <p class="kill_p5">￥${item.goodsPrice}</p>
                    <a class="kill_miao" href="details2.html?goodsId=${item.goodsId}">现在秒杀</a>
                </div>
            </div>
        `
    });
    $(".kill_show").html(htmlStr);  
}

$(function(){
    getGoods();
})