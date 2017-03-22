 /* 散点图组件对象 */
var Point =function ( name, cfg ) {
  	var component=new Base(name, cfg);
  	var base=cfg.data[0][1];  //以第一个数据的大小为比例 100% 	
  	//输出每一个point
  	$.each(cfg.data, function( idx,item) {
  		var point=$('<div class="point point_"'+idx+'></div>');	
  		var name=$('<div class="name">'+item[0]+'</div>');
  		var rade=$('<div class="per">'+(item[1]*100)+'%</div>');
  		name.append(rade);
  		point.append(name);
  		var per=(item[1]/base*100)+'%';  //算出比例
  		point.width(per).height(per);
  		if(item[2]) {
  			point.css('background-color',item[2]);
  		};
  		if(item[3] !== undefined && item[4] !== undefined) {
  			point.css('left',item[3]).css('top',item[4]);
  		};	
  		component.append(point);
  	});
  	
    return component;
}