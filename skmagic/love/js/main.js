$(window).on('load',function(){
  swiperInit();
  qTxtMotion();

  callResult()
});

var ans1_1, ans1_2, ans2_1, ans2_2, ans3_1, ans3_2, ans4_1, ans4_2;
var callAnsArr = [], answerArr = [];
/**
 * 스와이퍼 초기화 이후
 */
function swiperInit() {
  slideChangeEndEv();
  swipeBtn();
  goNext();
};


$('.start').on('click', function(){
  swiper.slideNext();
});



// popup
$(".btn").on('click', function(){
  if($(this).hasClass('btn1')) $(this).val("1")
  else $(this).val("2");
  
  var num1 = $(this).parent().children('.btn')[0].getAttribute('name');
  var num2 = $(this).parent().children('.btn')[1].getAttribute('name');

  var answer = $(this).val();
  var idx = swiper.realIndex;

  // 팝업 띄우기
  $("body, html").stop(true).animate({ scrollTop: "200"}, 400);
  $('.pop').attr('src', 'img/popup/' + idx + '.png'); //  뜨는 이미지 바꾸기
  $('.popup').fadeIn();
  
  $('.popup > span').removeClass();
  $('.popup > span').addClass('per' + idx);

  
  $('.per' + idx + ':nth-of-type(1)').html('('+callAnsArr[num1]+'%)')
  $('.per' + idx + ':nth-of-type(2)').html('('+callAnsArr[num2]+'%)')

  // 정답 저장
  answerArr.splice((idx - 1), 1, answer);
  // 다음 스와이프 활성화
  goNext(idx)

});

$('.pop_close').click(function() {
  $('.popup').hide();
  swiper.slideNext(400);
});



function swipeBtn(){
  var idx = swiper.realIndex;

  // 첫장, 마지막장에 버튼 안보이게
  if(idx === 0 || idx === 5){
    $('.swiper-button-next, .swiper-button-prev').hide();
    swiper.allowSlideNext = true;
  } else if(idx >= 1){
    swiper.allowSlideNext = false;
    $('.swiper-button-prev').show();
  }else{
    swiper.allowSlideNext = true;
  }
  // swiper.allowSlidePrev = false;

}


var getParameters = function (paramName) {
   // 리턴값을 위한 변수 선언
   var returnValue;
   // 현재 URL 가져오기
   var url = location.href;
   // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
   var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
   // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
   for (var i = 0; i < parameters.length; i++) {
       var varName = parameters[i].split('=')[0];
       if (varName.toUpperCase() == paramName.toUpperCase()) {
           returnValue = parameters[i].split('=')[1];
           return decodeURIComponent(returnValue);
       }
   }
};


function callResult(){
     var checkurl = 'https://ims-api.imform.net/v1/skmagic/lovevote/'
     $.ajax({
       url: checkurl,
       type: 'GET',
       statusCode: {
         204: function() {
           console.log('조회된 정보가 없습니다.')
         },
         200: function(data) {
           console.log(data)
           ans1 = data.data.q1[0].per;
           ans2 = data.data.q1[1].per;
           ans3 = data.data.q2[0].per;
           ans4 = data.data.q2[1].per;
           ans5 = data.data.q3[0].per;
           ans6 = data.data.q3[1].per;
           ans7 = data.data.q4[0].per;
           ans8 = data.data.q4[1].per;
        
           callAnsArr = [ans1, ans2, ans3, ans4, ans5, ans6, ans7 ,ans8];
           callAnsArr = callAnsArr.map(function(value){
            return Math.round(value);
           })
           
           console.log('success : ' + callAnsArr)
         },
         400: function(err){
           errorMessege(err);
         },
         404: function(err){
           errorMessege(err);
         }
       },
       error: function (err) {
         //400과 404를 제외한 에러가 발생했을시
         if(err.status !== 400 && err.status !== 404){
           alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
         }
       },
       cache: false,
       processData: false
     });
}
   
  
function sendResult(){
    var checkurl = 'https://ims-api.imform.net/v1/skmagic/lovevote/'
    $.ajax({
        url: checkurl,
        type: 'POST',
        data:{
          q1 : answerArr[0],
          q2 : answerArr[1],
          q3 : answerArr[2],
          q4 : answerArr[3],
        },
        statusCode: {
          204: function() {
            alert('조회된 정보가 없습니다.')
          },
          201: function() {
            console.log('sendResult success : ' + answerArr[0], answerArr[1], answerArr[2], answerArr[3], )
          },
          400: function(err){
           errorMessege(err);
           },
          404: function(err){
           errorMessege(err);
           },
        },
        error: function (err) {
         //400과 404를 제외한 에러가 발생했을시
         if(err.status !== 400 && err.status !== 404){
           alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
         }
        },    
       cache: false
    });
}
   
function errorMessege(error){
 var errText = '';
 error.responseJSON.errors.forEach(function(ele){
  errText += ele.message + '\n';
 })
 alert(errText);
}

