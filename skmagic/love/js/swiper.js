
var swiper = new Swiper(".swiper-container", {
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    observer: true
  });
  
  swiper.on("slideChangeTransitionEnd", slideChangeEndEv);
  swiper.on("slideChangeTransitionStart", motionreset);
  

/**
   * 슬라이드 변경 이벤트가 완전히 종료된 후 발생
   */
  function slideChangeEndEv() {
    var idx = swiper.realIndex;
    TweenMax.killTweensOf(['.m_tit', '.line', ".m_txt", ".tk"]);
    swipeBtn(idx); 
    scrollUp(idx); 
    goNext(idx);
    
  }
  

var scrollTl = new TimelineMax();
function scrollUp(idx){
  scrollTl.to('body,html', 0.33, {
    scrollTop: 0,
    ease: Power2.easeInOut, 
    onComplete:function(){
      motionArray(idx);
    }
})
}

  
// 정답 초기값 
var answerArr = []


function goNext(idx){
  var num = answerArr.length;
  if(idx <= num){
    swiper.allowSlideNext = true;
    
    $('.swiper-button-next').show();
  }else{
    $('.swiper-button-next').hide();
  }

}


// 마지막 페이지에서 선택한 값 불러오기
swiper.on("reachEnd", function(){
  console.log(answerArr)
  sendResult(answerArr)
});
