$(document).ready(function() {
  // 기본적인 컨텐츠가 전부 생성된 후에, 해당 컨텐츠를 컨트롤 하는 부분 추가
  swiperInit();
  coachMotion(".CoachMark");
});
/**
 * 스와이퍼 초기화 이후
 */
function swiperInit() {
  swiper.slideToLoop(getSwiperhashIndex(document.location.hash), 0);
  slideChangeEndEv();
  // slideChangeStartEv();
}

/**
 * url 에서 hash 값을 가져와서, 스와이퍼 내에 해당 해시값과 일치하는 페이지의 인덱스값 리턴
 * @param hashStr    url 에서 추출한 해시값
 * @returns {number}
 */
function getSwiperhashIndex(hashStr) {
  // 해쉬값이 없거나, 정의되지 않은 경우 지정된 페이지로 강제 이동
  if (hashStr == "" || typeof hashStr == "undefined")
    document.location.href = document.location.href + "#main";
  // 해쉬값이 존재하는 경우
  else {
    var swiperTotal = swiper.slides.length;
    for (var i = 0; i < swiperTotal; i++) {
      // 스와이퍼의 각 슬라이드 data-hash 값을 조회해서, url에서 추출된 해시값과 일치하는 index 검색
      var hashName = "#" + $(swiper.slides[i]).attr("data-hash");
      if (hashName == hashStr) return swiper.realIndex;
    }
  }
}
function coachMotion(obj) {
  var tl = new TimelineMax();
  tl.to(obj, 0.5, { opacity: 1 }).to(obj, 0.6, { opacity: 0, delay: 0.7 });
}
