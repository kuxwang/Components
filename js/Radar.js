var Radar=function(name,cfg) {
	var component=new Base(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	//开始创建画布
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);
	var r=w/2;
	var step=cfg.data.length;

/*
	ctx.beginPath();
	ctx.arc(r,r,r,0,Math.PI*2);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(r,r,5,0,Math.PI*2);
	ctx.stroke();
	
	//计算一个圆周上的坐标
	//已知圆心半径r 坐标（a b）角度为deg
	//rad=（2*Math.PI/360）*(360/step)*i
	//x=a+Math.sin(rad)*r
	//y=b+Math.cos(rad)*r
*/		
	//绘制网格背景(分面绘制 分为十分)
	var isblue=true;
	for (var s=10;s>0;s--) {
		ctx.beginPath();
	
		for(var i=0;i<step;i++) {
		 	var rad =(2*Math.PI / 360)*(360 / step) * i;
			var x=r+Math.sin(rad)*r*(s/10);
			var y=r+Math.cos(rad)*r*(s/10);
			ctx.lineTo(x,y);			
		};
		ctx.closePath();	
		ctx.fillStyle=(isblue= !isblue)? '#99c0ff' : '#f1f9ff';
		ctx.fill();		
	};

     //绘制伞骨图
	for (var i=0;i<step;i++) {
		var rad =(2*Math.PI / 360)*(360 / step) * i;
		var x=r+Math.sin(rad)*r;
		var y=r+Math.cos(rad)*r;
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		//添加项目文字
		var text=$('<div class="text"></div>');
		text.text(cfg.data[i][0]);
		text.css('transition','all .5s '+i*.1+'s')
		if(x>w/2){
			text.css('left',x/2+5)
		}else {
			text.css('right',(w-x)/2+5)
		};
		if(y>h/2){
			text.css('top',y/2+5)
		}else {
			
			text.css('buttom',(h-y)/2+5)
		};
		if(cfg.data[i][2]) {
			text.css('color',cfg.data[i][2]);
		}
		text.css('opacity',0);
		component.append(text);
		
	}
	ctx.strokeStyle='#e0e0e0'
	ctx.stroke();
	//数据层的开发  数据层
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);
	ctx.strokeStyle='#f00'
	var draw=function(per){
		if(per >= 1){
			component.find('.text').css('opacity',1)
		}else{
			component.find('.text').css('opacity',0)
		}
		ctx.clearRect(0,0,w,h);
		//输出数据的折线
		for (var i=0;i<step;i++) {
			var rad =(2*Math.PI / 360)*(360 / step) * i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;
			ctx.lineTo(x,y);		
		}
		ctx.closePath();
		ctx.stroke();
		//数据的点
		ctx.fillStyle='#ff7676';
		for (var i=0;i<step;i++) {
			var rad =(2*Math.PI / 360)*(360 / step) * i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
	
		ctx.stroke();
	};

	component.on('onLoad',function(){
		var s=0;
		for (var i=0;i<100;i++) {
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);			
		};	
	});
	component.on('onLeave',function(){
		var s=1;
		for (var i=0;i<100;i++) {
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);			
		};
	});
	
	return component;
}
