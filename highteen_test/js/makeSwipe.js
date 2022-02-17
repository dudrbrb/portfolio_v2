
var postData = {};
var mySwiper = new Swiper(".swiper-container-main", {
	loop: false,
	autoHeight: true,
	touchStartPreventDefault:true,
	allowSlidePrev: false
});

var mySwiper2 = new Swiper(".swiper-container-product", {
	loop: false,
	observer: true,
	observeParents: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	spaceBetween: 15
});

mySwiper.on('slideChangeTransitionEnd', slideChnageHanlder);

function slideChnageHanlder(){
	noDoubleClick = true;
	var idx = mySwiper.realIndex;

	if(idx === 0){
		$("#start_btn").css('display','block');
	} else {
		$("#start_btn").css('display','none');
	}
	// if(idx == 10) $('.pageNum').css('left', '16px')
	if(idx == 10) mySwiper.allowSlideNext = false;
	scrollUp();
	if(idx == 11)  slideCount();

	console.log(idx)
};	

function slideCount() {
	var title = $('.swiper-slide-active').attr('data-name');
	// data-name 가져와서 카운팅에 넣음
	imFlow.swiperEvent(title);
}



function scrollUp() {
    $("body, html").stop(true).animate({
        "scrollTop": "0"
    }, 200);
};


var slide = document.querySelectorAll('.swiper-container-main .swiper-slide');
var i = 0;
[].forEach.call(slide, function(t){ 
	var idx = t.getAttribute('name');
	if(idx){
		var contents = '<img class="bg" src="image/bg.png" > '+ 
		'<div class="question">'+ 
		'<img class="abc" src="image/sub'+ idx +'/tit.png" />'+ 
		'</div>'+ 
		'<img class="step" src="image/sub'+ idx +'/step.png" />'+ 
		'<img class="btn_bg" src="image/sub'+ idx +'/btn.png" />'+ 
		'<div class="nav_bg">'+ 
		'	<div class="pageNumBox">'+ 
		'		<img src="image/nav/'+ idx +'.png" class="pageNum">'+ 
		'	</div>'+ 
		'</div>'+ 
		'<ul class="sub_btn sub'+ idx +'_btn">'+ 
		'	<li data-name="b1"></li>'+ 
		'	<li data-name="b2"></li>'+ 
		'</ul>'+ 
		'<ul class="sub_btn sub'+ idx +'_btn" style="top:689px;">'+ 
		'	<li data-name="b3"></li>'+ 
		'	<li data-name="b4"></li>'+ 
		'</ul>';

		t.innerHTML += contents;
	}
})




 function addUserData(data){
	if(Object.keys(data).length < 10){
		alert('잘못된 접근입니다.');
		return mySwiper.slideTo(0);
	} 
	var arr = [], txtData = '', seqList=[];
	Object.keys(data).map(function(key){
		txtData += data[key].num.trim().split(',') +',';
	});

	txtData = txtData.substr(0, txtData.length -1).replace(/ /gi, "");
	


	for(var i = 0; i < txtData.length; i++){
		if(txtData.split(',')[i] === undefined) continue;
		arr.push(txtData.split(',')[i]);
	};
	
	var arrCnt = arrCount(arr);
	var maxNum = maxData(arrCount(arr));

	for(k in arrCnt) {
		if(beauty_list[k] === undefined) continue;
		if(arrCnt[k]>=maxNum){
			seqList.push({
				seq : beauty_list[k].seq,
				cnt : arrCnt[k],
				pick : beauty_list[k].pick,
				top : beauty_list[k].top,
				height : beauty_list[k].height
			})
		} 
	}
	var seqSort = seqList.sort(function(a, b){
		return b.seq - a.seq ;
	});
	userData.list = seqSort[0];
	userData.arrCnt = arrCnt;

	postData.mbti = data.list.pick;

	resultPageSet(userData);
	userAddInfo(postData);
};

