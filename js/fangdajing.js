//创建对象
	function Fdj(oDom,obj){
		this.oDom=oDom;
		let strObj={
			height:100,
			width:100,
			position: "absolute",
			top1:0,
			left1:0,
			color:"red",
			opacity:0.3,
			multiple: 2,
			img:"./img/img1.jpg"
		}
		for (let key in obj) {
            strObj[key] = obj[key];
        }
        for (let key in strObj) {
            this[key] = strObj[key];
        }
		
		this.createDom();
		this.moveCon();
		
	}

	Fdj.prototype.createDom=function(){
		let strHTML=""
		strHTML=`
			<div style="
				position: absolute;
				height:${this.height}px;
				width:${this.width}px;
				top:${this.top1}px;
				left:${this.left1}px;
				background-color:${this.color};
				opacity:${this.opacity};">
			</div>`
			;

		let boxWidth=this.oDom.offsetWidth;
		let boxHeight=this.oDom.offsetHeight;


		strHTML+=`
			<div style="
				position: absolute;
				height:${this.multiple*this.height}px;
				width:${this.multiple*this.width}px;
				top:0;
				left:${boxWidth+100}px;
				background-image:url(${this.img});
				background-size: ${this.multiple*boxWidth}px ${this.multiple*boxHeight}px;
				background-position:${-this.multiple*this.top1}px ${-this.multiple*this.left1}px;">
			</div>`
		this.oDom.innerHTML=strHTML;
	}

	Fdj.prototype.moveCon=function(){
		let con=this.oDom.lastElementChild.previousElementSibling;

		let show=this.oDom.lastElementChild;
		this.oDom.onmousemove=(event)=>{
			let e=event || window.event;
			let left1=e.pageX;
			let top1=e.pageY;
			let left2=box.offsetLeft;
			let top2=box.offsetTop;
			let left3=con.offsetWidth;
			let top3=con.offsetHeight;

			this.left=left1-left2-left3/2;
			this.top=top1-top2-top3/2
			//判定边境
			if(this.left<=0){
				this.left=0;
			}
			if(this.left>=box.offsetWidth-con.offsetWidth){
				this.left=box.offsetWidth-con.offsetWidth;
			}
			if(this.top<=0){
				this.top=0;
			}
			if(this.top>=box.offsetHeight-con.offsetHeight){
				this.top=box.offsetHeight-con.offsetHeight;
			}
			con.style.left=this.left+"px";
			con.style.top=this.top+"px";
			show.style.backgroundPosition=`-${this.multiple*this.left}px -${this.multiple*this.top}px`
		}
	}

	window.onload=function(){
		let box=document.getElementById("del_imgbox");
		console.log(box)
		let a=new Fdj(box,{color:"blue"});

		// let a=new Fdj(box,{color:"blue",multiple:10});
	}