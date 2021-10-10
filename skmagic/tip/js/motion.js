function Motion() {
  topMotion();
  yMotion('.top_txt');
  clipMotion('.top_line1', 193);
  clipMotion2('.top_st_line');

  clipMotion('.box1_line1', 120);
  clipMotion('.box1_line2', 328);
  clipMotion2('.box1_st_line');
  twinkMotion('.box1_tw');
  imgMotion('.box1_img3');

  clipMotion('.box2_line1', 120);
  clipMotion('.box2_line2', 328);
  clipMotion2('.box2_st_line');
  twinkMotion('.box2_tw');
  imgMotion('.box2_img3');

  clipMotion('.box3_line1', 120);
  clipMotion('.box3_line2', 436);
  clipMotion2('.box3_st_line');
  twinkMotion('.box3_tw');
  imgMotion('.box3_img3');

  botMotion();
}

function topMotion(){
  var tl = new TimelineMax();
  tl.fromTo('.top_arr', 0.7, {y: -400 }, {y: 0})
  .fromTo('.top_img2', 0.5, {x: 400 }, {x: 0})
  .fromTo('.top_img1', 0.4, {x: -250 }, {x: 0, delay: -0.1});

  TweenMax.to('.scroll', 1.4, {y: 40, opacity: 0, repeat: -1, repeatDleay: 0.4})
  TweenMax.to('.arr', 0.6, {y: 8, yoyo: true, repeat: -1})
}

function botMotion(){
  var tl = new TimelineMax();
  tl.fromTo('.sd1', 0.7, {opacity: 0}, {opacity: 1})
  .fromTo('.leaf1', 0.6, {x: 200 }, {x: 0, delay: -0.3})
  .fromTo('.leaf2', 0.6, {x: -250 }, {x: 0, delay: -0.2})
  .fromTo('.sd2', 0.7, {opacity: 0}, {opacity: 1});

  scrollMotion(tl, '.sd1')

}

function clipMotion(obj, w) {
  var tl = new TimelineMax();
  tl.fromTo(obj, 0.5, { clip: 'rect(0px, 0px, 80px, 0px)' }, { clip: 'rect(0px, ' + w + 'px, 80px, 0px)', ease: Power0.easeIn })

  scrollMotion(tl, obj)
}

function clipMotion2(obj) {
  var tl = new TimelineMax();
  tl.staggerTo(obj, 0.7, { clip: 'rect(0px, 350px, 80px, 0px)', ease: Power0.easeIn }, 0.4)

  scrollMotion(tl, obj)
}

function opaMotion(obj) {
  var tl = new TimelineMax();
  tl.fromTo(obj, 0.5, { opacity: 0 }, { opacity: 1 })

  scrollMotion(tl, obj)
}

function yMotion(obj) {
  var tl = new TimelineMax();
  tl.fromTo(obj, 0.5, { opacity: 0, y: 50}, { opacity: 1, y: 0 })

  scrollMotion(tl, obj)
}

function twinkMotion(obj){
  var tl = new TimelineMax();
  tl.staggerTo(obj, 0.6,  { opacity: 0, yoyo: true, repeat: 1, delay: 1 }, 2).repeat(-1);

  scrollMotion(tl, obj)
}
function imgMotion(obj) {
  var tl = new TimelineMax();
  tl.fromTo(obj, 0.8, { rotation: 0}, { rotation: 8, yoyo: true, repeat: 5, ease: Power0.easeIn})

  scrollMotion(tl, obj)
}
function scrollMotion(tl, obj) {
  var controller = new ScrollMagic.Controller({});
  scene = new ScrollMagic.Scene({ triggerElement: obj, offset: -200 })
    .addTo(controller)
    .setTween(tl)
    .reverse(true)
}
