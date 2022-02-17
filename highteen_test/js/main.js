
window.onload = function(){

var mySwiper = new Swiper(".swiper-container-main", {
		loop: false,
		autoHeight: true,
		touchStartPreventDefault:true,
		allowSlidePrev: false
	  });
	  
	_url = $(location).attr('href'); 

	var param = getUrlParams();
	goResult = param.result;

	if(goResult){
		mySwiper.slideTo(mySwiper.slides.length, 0)
		resultPageSet();
	}else{
		CountCheck('메인 페이지 유입');
	}

	TweenMax.to('.img_btn', 1, {opacity: 0.3, yoyo: true, repeat: -1})
	
};



var _url ,
	result,
	goResult,
	userData= {},
	link,
	noDoubleClick = true,
	doubleSubmitFlag = false,
	agent = navigator.userAgent.toLowerCase();

$("#start_btn").on('click', function(e){
	mySwiper.slideNext();
	mySwiper.allowSlideNext = false;
	CountCheck('START 버튼 클릭');
});

$('.sub_btn li').on('click', function(e){	
	var idx = mySwiper.realIndex;
	if(idx == 11 || !noDoubleClick) return false;
	setUserData(idx, listData[e.target.dataset.name][idx-1], listDataTxt[e.target.dataset.name][idx-1], e.target.dataset.name);
	imageActive(idx, e.target.dataset.name);	
	if(idx === 10) addUserData(userData);

	$(this).attr('value', 'onClick')
});

$('.reset_btn').on('click', function(){
	userData={};
	history.replaceState({}, null, location.pathname);
	window.location.reload()

	$('#container').css('height', 'auto');
	$('.sub_btn li').removeClass('on');
	$('.sub_btn li').css('background-image', 'none');
	$('.img_btn, .item_div').hide();
	$('.go_url, .shop_btn').show();

});

$('.img_btn').on('click', function (){
	downloadImage("image/save/" + result + ".jpg", "download", true);
});

$('.shop_btn').on('click', function(){
	link = $(this).index('.shop_btn');
	shopLanding(link);
	
});

$('.go_url').on('click', function(){
	window.open('https://www.lotteon.com/display/plan/planDetail/9265?mall_no=2', '_blank')
});

function getUrlParams() {
	var params = {};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	return params;
};

var bottomScroll = function(){
    $("body, html").stop(true).animate({
        "scrollTop": "200"
    }, 200);
};

var checkInput = function(i){
	if(!userData['sub'+i]){
		return  false;
	};
	return true;
};

var setUserData = function(idx, item, text, btn){
	var abc = [];
	userData['sub' + idx] = {
		num : item,
		txt : text,
		btnActive : btn
	};
	if(idx < 11) {
		abc.push(userData);
		postData['answer' + idx] = userData['sub' + idx].txt
	};
	
};

var arrCount = function(arr){
	var r = {};
	for (var i = 0; i < arr.length; ++i) {
    	if (!r[arr[i]]) r[arr[i]] = 0;
     	++r[arr[i]];
	};
	return r;
};

var maxData = function(data){
	var arrq = Object.keys(data).map(function ( key ) { return data[key]; });
	var max = Math.max.apply( null, arrq );
	return max;
};


var imageNon = function(idx){
	$('.sub'+ idx + '_btn li').removeClass('on');
	$('.sub'+ idx + '_btn li').css('background-image', 'none');
};

var imageActive = function(idx, item){
	imageNon(idx);
	$('.sub'+ idx + '_btn li[data-name="'+ item + '"]').addClass('on');
	$('.sub'+ idx + '_btn li.on').css('background-image', 'url("image/sub' + idx + '/'+item+'.png")');

	setTimeout(function(){
		mySwiper.allowSlideNext = true;
		if(checkInput(idx)) mySwiper.slideNext();
		mySwiper.allowSlideNext = false;
	}, 400);

	noDoubleClick = false;
};

var resultPageSet = function(data){
	if(goResult){
		result = goResult;
	} else {
		result = data.list.seq;
		history.pushState(null, "", "?result=" + result);
	};
	$('.img_btn, .item_div').show();

	$("#result_top > .bg").attr('src', 'image/end/'+result+'/top.png');
	$("#result_bot > .bg").attr('src', 'image/end/'+result+'/bot.png');
	$("#result_item").attr('src', 'image/end/'+result+'/swipe.png');
	$('.item_div').css('top', (goResult ? beauty_list[goResult].top : data.list.top));
	$("#container, .resultPage").css({"height": ( goResult ? beauty_list[goResult].height : data.list.height)});
	$(".link_box").val('https://ilotteshopping.com/highteen_test/0' + result ); 

	$('.img_btn').attr('name', result);
	$('.shop_btn').attr('name', result);

	$('.prod1').attr('src', "image/end/"+ result +"/1.png");
	$('.prod2').attr('src', "image/end/"+ result +"/2.png");
	$('.prod3').attr('src', "image/end/"+ result +"/3.png");
	if(result == 8) $('.prod4').show();
	if(result == 1) $('.go_url, .shop_btn').hide();
	
	CountCheck('결과 페이지 유입');
};

function CountCheck(datanum){
	$.ajax({
		url:'https://ims-api.imform.net/v1/lotte/highteen/log/',
		type: 'POST',
		data: {
			category : datanum
		},
		statusCode: {
			201: function(args) {
			},
			400: function(err){
				errorMessege(err);
			},
			404: function(err){
				errorMessege(err);
			},
		},
		error: function (err) {
		//400과 404를 제외한 에러가 발생했을시
			if(err.status !== 400 && err.status !== 404){
				alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
			}
		},    
		cache: false
	});
}

var userAddInfo = function(data){
	$.ajax({
      url:'https://ims-api.imform.net/v1/lotte/highteen/',
      type: 'POST',
      data: data,
      statusCode: {
        201: function(args) {
        },
        400: function(err){
         errorMessege(err);
        },
        404: function(err){
         errorMessege(err);
        },
      },
      error: function (err) {
        //400과 404를 제외한 에러가 발생했을시
        if(err.status !== 400 && err.status !== 404){
          alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
        }
      },    
      cache: false
    });

};

function errorMessege(error){
	var errText = '';
	error.responseJSON.errors.forEach(function(ele){
	 errText += ele.message + '\n';
	})
	alert(errText);
}
	


function downloadImage(imageUrl, fName, bool) {
	var ua = String(navigator.userAgent).toLowerCase();
  
	if (/msie|trident/i.test(navigator.userAgent)) {
	  var canvas = document.createElement("canvas");
	  var img = document.createElement("img");
	  img.onload = function(e) {
		canvas.width = img.width;
		canvas.height = img.height;
		var context = canvas.getContext("2d");
		context.drawImage(img, 0, 0, img.width, img.height);
		window.navigator.msSaveBlob(canvas.msToBlob(), fName + ".jpg");
	  };
	  img.src = imageUrl;
	} else {
	//   console.log(bool);
	  if (!/iphone|ipad/.test(ua) && bool === true) {
		imageUrl = imageUrl.replace("ios", "android");
		if (agent.indexOf("kakaotalk") != -1) {
			kakaoDown(imageUrl);
		}
		else createDownTag(imageUrl, fName);
	  } else createDownTag(imageUrl, fName);
	}
}
function createDownTag(imageUrl, fName) {
	var $a = $("<a>")
		.attr("href", imageUrl)
		.attr("download", fName)
		.appendTo("body");
	$a[0].click();
	$a.remove();
}

/**
 * 카카오 브라우저 이미지 다운
 */
function kakaoDown(path) {
	window.open("https://ims-api.imform.net/v1/lotte/imgdown/?path=" + path);
};



var shopLanding = function(subLoad){
	if(result == 2){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205944952', '_blank'); CountCheck('에이엔29 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205944954', '_blank'); CountCheck('에이엔29 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205944953', '_blank'); CountCheck('에이엔29 상품3'); }
	};
	if(result == 3 ){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205944958', '_blank'); CountCheck('유라고 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205944957', '_blank'); CountCheck('유라고 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205960009', '_blank'); CountCheck('유라고 상품3'); }
	}
	if(result == 4){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205947595', '_blank'); CountCheck('세인트페인 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205960359', '_blank'); CountCheck('세인트페인 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205960358', '_blank'); CountCheck('세인트페인 상품3'); }
	};
	if(result == 5){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205916647', '_blank'); CountCheck('아바몰리 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205922714', '_blank'); CountCheck('아바몰리 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205922712', '_blank'); CountCheck('아바몰리 상품3'); }
	};
	if(result == 6){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205916654', '_blank'); CountCheck('EYEYE 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205916650', '_blank'); CountCheck('EYEYE 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205916651', '_blank'); CountCheck('EYEYE 상품3'); }
	};
	if(result == 7){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205960914', '_blank'); CountCheck('바이탈싸인 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205928439', '_blank'); CountCheck('바이탈싸인 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205928441', '_blank'); CountCheck('바이탈싸인 상품3'); }
	};
	if(result == 8){
		if(subLoad == 0) {window.open('https://www.lotteon.com/p/product/LE1205944951', '_blank'); CountCheck('해브레스 상품1'); }
		if(subLoad == 1) {window.open('https://www.lotteon.com/p/product/LE1205928438', '_blank'); CountCheck('해브레스 상품2'); }
		if(subLoad == 2) {window.open('https://www.lotteon.com/p/product/LE1205928437', '_blank'); CountCheck('해브레스 상품3'); }
		if(subLoad == 3) {window.open('https://www.lotteon.com/p/product/LE1205922713', '_blank'); CountCheck('해브레스 상품4'); }
	
	};
};
	



$(document).on("click", ".link_btn", function(e) { 
	CountCheck('URL 공유하기 클릭');
	// 링크복사 시 화면 크기 고정 
	var html = "<input id='clip_target' type='text' value='' style='position:absolute;top:-9999em;'/>"; 
	$(this).append(html); 

	var input_clip = document.getElementById("clip_target"); 
	//현재 url 가져오기 
	
	var _url = 'https://ilotteshopping.com/highteen_test/0' + result; 
	$("#clip_target").val(_url); 


	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) { 
		var editable = input_clip.contentEditable;
		var readOnly = input_clip.readOnly; 
		input_clip.contentEditable = true; 
		input_clip.readOnly = false; 

		var range = document.createRange();
		range.selectNodeContents(input_clip); 

		var selection = window.getSelection(); 
		selection.removeAllRanges(); 
		selection.addRange(range); 
		input_clip.setSelectionRange(0, 999999); 
		input_clip.contentEditable = editable; 
		input_clip.readOnly = readOnly; 
	} else { 
		input_clip.select(); 
	} try {
		 var successful = document.execCommand('copy'); 
		 input_clip.blur(); 
		 if (successful) { 
			 alert("URL이 복사 되었습니다. 원하시는 곳에 붙여넣기 해 주세요."); 
		} else { 
			alert('이 브라우저는 지원하지 않습니다.'); 
		} 
	} catch (err) { 
		alert('이 브라우저는 지원하지 않습니다.'); 
	} ;
}); 
//클립보드 복사
