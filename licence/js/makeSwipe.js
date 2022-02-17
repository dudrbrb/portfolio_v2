var swiper = new Swiper(".swiper-container", {
  loop: true,
  hashNavigation: {
    replaceState: true,
    watchState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  preventInteractionOnTransition: true,
});
swiper.on("slideChangeTransitionEnd", slideChangeEndEv);

/**
 * 슬라이드 변경 이벤트가 완전히 종료된 후 발생
 */
function slideChangeEndEv() {
  activeHeightSet();
  scrollUp();
  StartMotion();
}

function StartMotion() {
  var idx = swiper.realIndex;
  motionArray(idx);
  if (idx === 0) {
    $(".swiper-pagination").fadeOut();
  } else {
    $(".swiper-pagination").fadeIn();
  }
}

/**
 * 페이지 최상단으로 스크롤 이동
 */
function scrollUp() {
  $("body, html").stop(true).animate(
    {
      scrollTop: "0",
    },
    400
  );
}

/**
 * 활성화된 슬라이드의 이미지 높이값에 맞춰서, 스와이프 높이값 변경
 */
function activeHeightSet() {
  // 활성화된 슬라이드의 이미지 height값 ( bg )
  var activeHt = $(".swiper-slide-active > img").height();

  if (typeof activeHt === "undefined" || activeHt <= 1100) activeHt = 1100;

  //슬라이드 부모의 높이값을 지금 할성화된 bg의 높이값으로 변경
  $(".swiper-container").stop(true).animate(
    {
      height: activeHt,
    },
    200
  );
}
