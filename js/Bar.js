/*  柱状图       */
var Bar=function(name,cfg){
	var component=new Base(name, cfg);
	$.each(cfg.data, function(idx ,item) {
  		var line=$('<div class="line"></div>');
  		var name=$('<div class="name"></div>');
  		var rate=$('<div class="rate"></div>');
  		var per=$('<div class="per"></div>');  		
  		var width=item[1]*100 + '%';
  		var bgStyle='';
  		if(item[2]) {
  			bgStyle='style="background-color :'+item[2]+' " ';
  		};
  		per.text(width);
  		rate.width(width);
  		rate.html('<div class="bg" '+bgStyle+'></div>');
  		name.text(item[0]);
  		line.append(name).append(rate).append(per);	  		
  		component.append(line);	
  	});
  	return component;
}
