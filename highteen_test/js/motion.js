var subMotion = function(i){
	var tl = new TimelineMax();
	tl.staggerTo($('.action.sub'+i),1.0,{opacity:0, yoyo:true, repeat:1},2.0)
	.repeat(-1);

	if(i === 11) TweenMax.staggerTo($('.result_ac'), 1.5, {opacity:1}, 0.4);	
};