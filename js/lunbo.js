class Lunbo{
	constructor(oDom,obj){
		this.oDom=oDom;
		this.imgArr=[];
		this.listArr=[];
		this.istrue=true;
		let originObj={
			width:null,									//当前盒子宽度
			srcArr:["../img/ban1.jpg","../img/ban2.jpg","../img/ban3.png","../img/ban4.jpg","../img/ban5.jpg"],
			circleHeight:20,
			circleWidth:200,
			circleColor:"none",	
			circleTop:300,
			listSize:10,
			imgNumber:5,
			listColor1:"red",
			listColor2:"pink",
			timeSpace:5, 
			direction:1,
			timeLong:2000,
			intImg:0,
			outImg:0,
			t1:null,
			t2:null,
			t3:null,
		}
		for (let key in obj) {
            originObj[key] = obj[key];
        }
        for (let key in originObj) {
            this[key] = originObj[key];
        }
        this.createImg();
		this.createCircle();
		this.AutoPlay();
		this.stopPlay();
		this.conPlay();
		this.clickMove();
	}
	// 创建图片
	createImg(){
		this.width=this.oDom.offsetWidth;
		for(let i=0;i<this.imgNumber;i++){								//循环创建盒子内部图片
			let imgBox=document.createElement("img");
			imgBox.style.cssText=`
				position:absolute;
				top:0;
				left:${this.width}px;
				listColor1:"red",
				listColor2:"pink",	
			`;
			if(i===0){
				imgBox.style.cssText=`
				position:absolute;
				top:0;
				left:0;
			`;
			}
			imgBox.src=this.srcArr[i];
			this.oDom.appendChild(imgBox);
			this.imgArr.push(imgBox);
		}
	}
	// 创建指示器
	createCircle(){
		let oUl=document.createElement("ul");
		oUl.style.cssText=`
			height:${this.circleHeight}px;									
			width:${this.circleWidth}px;
			background:${this.circleColor};
			display:flex;
			justify-content:space-around;
			align-items:center;
			position:absolute;
			top:${this.circleTop}px;							
		`;	
		this.oDom.appendChild(oUl);
		let ulWidth=this.oDom.lastElementChild.offsetWidth;
		oUl.style.left=this.width/2-ulWidth/2+"px";

		for(let i=0;i<this.imgNumber;i++){
			let oList=document.createElement("li");
			oList.style.cssText=`
				height:${this.listSize}px;
				width:${this.listSize}px;
				border-radius:50%;
			`;
			i===0?oList.style.background=this.listColor1:oList.style.background=this.listColor2;
			oUl.appendChild(oList);
			this.listArr.push(oList);
		}
	}
	imgMove(intDom,outDom,direction,timeLong){
		let startP=0;
		// let startP=0;
		let numP=startP;
		let cutLeft=1277;
		let endP=direction>0?-cutLeft:cutLeft;
		let step=Math.abs(endP-startP)/(timeLong/this.timeSpace);		//计算步长=（终点位置-起点位置）/（总时长/时间间隔）
		setTimeout(fnA,2000)
		function fnA(){
			this.t1=setInterval(()=>{
				this.istrue=false;
				if(direction>0?numP<=endP:numP>=endP){							//当方向为正，判定条件为现位置是否小于终点位置
					clearInterval(this.t1);
					this.t1=-1;
					numP=endP;
					this.istrue=true;
				}
				numP-=step*direction;
				outDom.style["left"]=numP+"px";
				let num1=numP+cutLeft*direction;
				intDom.style["left"]=num1+"px";
			},this.timeSpace)
		}		
	}
	imgMove2(intDom,outDom,direction,timeLong,fn){
		let startP=0;
		let numP=startP;
		let cutLeft=1277;
		let endP=direction>0?-cutLeft:cutLeft;
		let step=Math.abs(endP-startP)/(timeLong/this.timeSpace);		//计算步长=（终点位置-起点位置）/（总时长/时间间隔）	
		this.t3=setInterval(()=>{
			this.istrue=false;
			if(direction>0?numP<=endP:numP>=endP){							//当方向为正，判定条件为现位置是否小于终点位置
				clearInterval(this.t3);
				this.t3=-1;
				numP=endP;
				this.istrue=true;
			}
			numP-=step*direction;
			outDom.style["left"]=numP+"px";
			let num1=numP+cutLeft*direction;
			intDom.style["left"]=num1+"px";		
		},this.timeSpace)		
	}

	// 播放函数
	AutoPlay(){
		let timeLong2=this.timeLong+2000;
		this.t2=setInterval(()=>{
			this.outImg=this.intImg;
			this.intImg++;
			if(this.intImg>4){
				this.intImg=0;
			}
			this.imgArr[this.intImg].style["left"]=this.direction>0?this.oDom.offsetWidth+"px":-this.oDom.offsetWidth+"px"
			this.imgMove(this.imgArr[this.intImg],this.imgArr[this.outImg],this.direction,this.timeLong)
			setTimeout(()=>{
				this.listArr[this.intImg].style.background=this.listColor1;
				this.listArr[this.outImg].style.background=this.listColor2;
			},2000);	
		},timeLong2)
		window.onblur =()=> {
		    window.clearInterval(this.t2);
		}
		window.onfocus =()=>{
		    this.AutoPlay();
		}		
	}
	// 鼠标悬停停止播放
	stopPlay(){
		this.oDom.onmouseover=()=>{
			clearInterval(this.t2);
		}
	}
	// 鼠标离开继续播放
	conPlay(){
		this.oDom.onmouseleave=()=>{
			this.AutoPlay();
		}
	}
	// 点击指示器跳转
	clickMove(){
		for(let i=0;i<this.listArr.length;i++){
			this.listArr[i].onclick=()=>{
				if(this.istrue==true){
					clickL(i);
				}	
			}
		}
		let clickL=(n)=>{
			let m=this.intImg;
			this.outImg=this.intImg
			this.intImg=n;
			function fn(){
				console.log(111)
			}
			if(m==n){
				return;
			}
			else if(m>n){
				this.direction=-1;
			}
			this.imgArr[this.intImg].style["left"]=this.direction>0?this.oDom.offsetWidth+"px":-this.oDom.offsetWidth+"px"
			this.imgMove2(this.imgArr[this.intImg],this.imgArr[this.outImg],this.direction,this.timeLong,fn)
			this.listArr[this.intImg].style.background=this.listColor1;
			this.listArr[this.outImg].style.background=this.listColor2;
			this.direction=1;
	    }
	}
	
	getStyle(oDom,attr){
	    var value;
	    if (oDom.currentStyle) { //IE
	       	value = oDom.currentStyle[attr]
	    } else { //非IE的主流浏览器
		  	var obj = window.getComputedStyle(oDom);//oDom的所有样式（对象）
		    value = obj[attr];
	    }
	    return value;
	}
}

window.onload=function(){
	let box= document.getElementById("ban_box")
	let a=new Lunbo(box,{});
}
