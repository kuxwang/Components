 /* 饼图组件对象 */
var Pie =function ( name, cfg ) {
  var component=new Base(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	var r=w/2;
	//开始创建画布
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css('z-index',1);
	component.append(cns);
/*	
	//计算一个圆周上的坐标
	//已知圆心半径r 坐标（a b）角度为deg
	//rad=（2*Math.PI/360）*(360/step)*i
	//x=a+Math.sin(rad)*r
	//y=b+Math.cos(rad)*r
	
*/
	//加入一个底图层
	ctx.beginPath();
	ctx.fillStyle='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth=1;
	ctx.arc(r,r,r,0,2*Math.PI)
	ctx.fill();
	ctx.stroke();
	//绘制一个数据层	
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css('z-index',2);
	component.append(cns);
	
	var colors=['red','green','blue','orange','gray'];
	var sAngel=1.5*Math.PI;  //设置开始角度在12点位置
	var eAngel=0;
	var aAngel=2*Math.PI;

	//数据层
	var step=cfg.data.length;
	for(var i=0;i<step;i++){
		var item=cfg.data[i];
		var color=item[2] || (item[2]=colors.pop());
		
		eAngel=sAngel+aAngel*item[1];
		
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.strokeStyle=color;
		ctx.lineWidth=0.1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel)
		ctx.fill();
		ctx.stroke();
		sAngel=eAngel;
		
		//加入所有项目文本以及百分百
		var text=$('<div class="text"></div>');
		text.text(cfg.data[i][0]);
		var per=$('<div class="per"></div>');
		per.text(cfg.data[i][1]*100+'%');
		text.append(per);
		var x=r+Math.sin(.5*Math.PI - sAngel)*r;
		var y=r+Math.cos(.5*Math.PI - sAngel)*r;
		
		if(x>w/2) {
			text.css('left',x/2+10);
		}else{
			text.css('right',(w-x)/2+10);
		}
		if(y>h/2) {
			text.css('top',(y/2)-10);
		}else {
			text.css('bottom',(h-y)/2+10);
		};
		if(cfg.data[i][2]) {
			text.css('color',cfg.data[i][2]);
		}		
		text.css('opacity',0);
		component.append(text);		
	}

	//加入一个蒙版层
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css('z-index',3);
	component.append(cns);	
	ctx.fillStyle='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth=1;	
	var draw=function(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per<=0){
			ctx.arc(r,r,r,0,2*Math.PI,true);
		}else{
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		};
		
		
		ctx.fill();
		ctx.stroke();
		if(per>=1) {
			component.find('.text').css('opacity',1);
		}else {
				component.find('.text').css('opacity',0);
		};	
	};

	component.on('onLoad',function(){
		var s=0;
		for (var i=0;i<100;i++) {
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);			
		}
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