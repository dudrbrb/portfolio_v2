
function motionreset() {
  TweenMax.set(['.m_tit', '.line'], {clip: "rect(0px, 0px, 200px, 0px)" });
  TweenMax.set([".m_txt", ".tk"], { y: 30, opacity: 0 });
}

function motionArray(idx) {
  var arr = [
    mainMotion(idx),
    subMotion(idx, 1, '.sub1 .tk', '.sub1 .line'),
    subMotion(idx, 2, '.sub2 .tk', '.sub2 .line'),
    subMotion(idx, 3, '.sub3 .tk', '.sub3 .line'),
    subMotion(idx, 4, '.sub4 .tk', '.sub4 .line'),
    finMotion(idx)
  ];
  return arr[idx];
}

function mainMotion(idx) {
  var flag = 0;

  var tl1 = new TimelineMax();
  tl1.fromTo('.m_tit', 0.7,{ clip: "rect(0px, 0px, 200px, 0px)"}, { clip: "rect(0px, 350px, 200px, 0px)"});

  var tl2 = new TimelineMax();
  tl2.staggerTo('.m_txt', 0.4, { opacity: 1, y: 0}, 0.3)
  .staggerTo('.main .line', 0.7, { clip: "rect(0px, 350px, 200px, 0px)"}, 0.3)

  scrollMotion(tl2, '.m_txt')
  motionPlayKill(idx, tl1, flag);
}


function subMotion(idx, flag, obj1, obj2 ) {
  var flag;
  
  var tl = new TimelineMax();
  tl.staggerTo(obj1, 0.4,  { opacity: 1, y: 0}, 0.25)

  var tl2 = new TimelineMax();
  tl2.staggerTo(obj2, 0.7, { clip: "rect(0px, 350px, 200px, 0px)"}, 0.4)

  scrollMotion(tl2, obj2)

  motionPlayKill(idx, tl, flag);
}


function finMotion(idx) {
  var flag = 5;
  
  var tl = new TimelineMax();
  tl.fromTo('.txt2', 0.7, {opacity: 0}, {opacity: 1})
  .fromTo('.sub5 .line3', 0.7, { clip: "rect(0px, 0px, 200px, 0px)"},{ clip: "rect(0px, 360px, 200px, 0px)"});

  clipMotion('.f_clip1')

  scrollMotion(tl, '.line2')
  motionPlayKill(idx, tl, flag);
}

function qTxtMotion(){
    var tl1 = new TimelineMax();
    tl1.staggerTo('.sub1_q', 0.8, {opacity: 0, yoyo: true, repeat: 1, delay: 1 }, 2).repeat(-1);

    var tl2 = new TimelineMax();
    tl2.staggerTo('.sub2_q', 0.8, {opacity: 0, yoyo: true, repeat: 1, delay: 1 }, 2).repeat(-1);

    var tl3 = new TimelineMax();
    tl3.staggerTo('.sub3_q', 0.8, {opacity: 0, yoyo: true, repeat: 1, delay: 1 }, 2).repeat(-1);

    var tl4 = new TimelineMax();
    tl4.staggerTo('.sub4_q', 0.8, {opacity: 0, yoyo: true, repeat: 1, delay: 1 }, 2).repeat(-1);

    TweenMax.to('.start_arr', 0.6, {x: 13, yoyo: true, repeat: 1, delay: 1 , repeat: -1, ease: Linear.easeNone });

}

function clipMotion(obj){
  var tl = new TimelineMax();
  tl.staggerTo(obj, 0.7, { clip: "rect(0px, 360px, 200px, 0px)"}, 0.3)

  scrollMotion(tl, obj)
}

function scrollMotion(tl, obj) {
  var controller = new ScrollMagic.Controller({});
  scene = new ScrollMagic.Scene({ triggerElement: obj, offset: -180 })
    .addTo(controller)
    .setTween(tl)
    .reverse(false)
}

function motionPlayKill(idx, el, flag) {
  el.pause();
  if (idx === flag) {
      el.play();
  } else {
    motionreset();
    el.kill();
  }
}
