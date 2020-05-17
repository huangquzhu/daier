//获取用户名
let username = getCookie("username");
$(".uesr_back").click(function(){
    $("#car_table").html("");
    console.log(11)
})
// 获取购物车的数据
function getShoppingCar(cb){
    $.get("../php2/getShoppingCart.php",{"vipName":username},function(datas){
        let htmlStr="";      
        datas.forEach(goods => {
            htmlStr +=`
                <tr>
                    <td>
                        <div class="car_img"><img src="${goods.goodsImg}" alt="" /></div>
                    </td>
                    <td>${goods.goodsName}</td>
                    <td class="goodsId">${goods.goodsId}</td>
                    <td>
                        <input type="button" class="reduceBtn" value="-">
                        <span class="goodsCount">${goods.goodsCount}</span>
                        <input type="button" class="addBtn" value="+">
                    </td>
                    <td>${goods.goodsPrice}</td>
                    <td class="moneyTotal">${goods.goodsPrice*goods.goodsCount}</td>
                    <td>
                        <input class="delBtn" type="button" value="删除">
                    </td>
                </tr>
            `;
        });
        $("#car_table").html(htmlStr);
        cb(); 
        totalMoney();
    },"json")
}
function updateCount(goodsId,goodsCount,cb){
    $.get("../php2/updateGoodsCount.php",{
        "vipName":username,
        "goodsId":goodsId,
        "goodsCount":goodsCount,
    },function(data){
        if(data=="0"){
            alert("服务器出错：修改数量失败");
        }else{
            cb();
        }
    });
}
function deletGoods(goodsId,cb){
    $.get("../php2/deleteGoods.php",{
        "vipName":username,
        "goodsId":goodsId,
    },function(data){
        if(data=="0"){
            alert("服务器出错：修改数量失败");
        }else{
            cb();
        }
    });
}

$(function(){    
    getShoppingCar(addEvent);
});


//添加事件 
function addEvent(){
    $(".addBtn").click(function(){
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).prev().html();
        count++;
        
        updateCount(goodsId,count,()=>{                     
            $(this).prev().html(count);
            let price = $(this).parent().next().html();
            let money = price*count;
            $(this).parent().next().next().html(money);
            totalMoney();  
        });
    });    
    $(".reduceBtn").click(function(){
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).next().html();
        count--;
        if(count<1){
            count=1;
        }
        updateCount(goodsId,count,()=>{  
            $(this).next().html(count);
            let price = $(this).parent().next().html();
            let money = price*count;
            $(this).parent().next().next().html(money);
            totalMoney();
        })
    });
    $(".delBtn").click(function(){
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        if(confirm("是否删除")){
            deletGoods(goodsId,()=>{
                $(this).parent().parent().remove();
                totalMoney();
            })   
        }
    });
}

function totalMoney(){
    let money=0;
    let $tr = $("table tr:gt(0)");
    $tr.each(function(){
        money += parseFloat($(this).find("td").eq(5).html());
    });
    $(".pay_p1>span").html(money);
}
function clearCar(){
    let goodsId="";
    let $tr = $("table tr:gt(0)");
    $tr.each(function(){
        goodsId=$(this).find("td").eq(2).html();   
        console.log(goodsId)     
        deletGoods(goodsId,()=>{
            $("#car_table").html("");
            totalMoney();
        })
    });

}
$("#clear_btn").click(()=>{
    clearCar();
})