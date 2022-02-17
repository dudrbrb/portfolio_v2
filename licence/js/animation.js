function motionreset() {
  TweenMax.set([".tit", ".sub_tit"], { y: 0 });
  TweenMax.set([".man"], { x: 0 });
  TweenMax.set([".opa"], { opacity: 0 });
  TweenMax.set([".line1", ".line2"], { clip: "rect(0px, 0px, 16px, 0px)" });
}

function motionArray(idx) {
  var arr = [
    mainmotion(idx),
    subMotion1(idx, 1, ".sub1_tit", ".sub1 > .opa", ".sub1_man"),
    subMotion1(idx, 2, ".sub2_tit", ".sub2 > .opa", ".sub2_man"),
    subMotion1(idx, 3, ".sub3_tit", ".sub3 > .opa", ".sub3_man"),
    subMotion2(idx, 4, ".sub4_tit", ".sub4 > .opa", ".sub4_man"),
    subMotion1(idx, 5, ".sub5_tit", ".sub5 > .opa", ".sub5_man"),
    endingMotion(idx, 6, ".sub6_txt", ".sub6_img3", ".sub6_img2", ".sub6_img1"),
  ];
  return arr[idx];
}

function mainmotion(idx) {
  var flag = 0;

  var tl = new TimelineMax();
  tl.to(".main_tit", 0.5, { opacity: 1, y: 454 })
    .to(".main > .opa", 0.1, { opacity: 1 })
    .to(".mian_img1", 0.3, { x: -100, y: -90 })
    .to(".mian_img2", 0.3, { x: 120, y: -70 })
    .to(".mian_img3", 0.3, { x: 100, y: 80 })
    .to(".line1", 0.4, {
      clip: "rect(0, 230px, 16px, 0 )",
      ease: Power0.easeIn,
    })
    .to(".line2", 0.65, {
      clip: "rect(0, 391px, 16px, 0 )",
      ease: Power0.easeIn,
    })
    .to(".arrow", 0.5, {
      x: 10,
      yoyo: true,
      repeat: -1,
      ease: Power0.easeIn,
      delay: -2,
    });

  motionPlayKill(idx, tl, flag);
}

function subMotion1(idx, flag, obj1, obj2, obj3) {
  var flag;

  var tl = new TimelineMax();
  tl.to(obj1, 0.5, { opacity: 1, y: 454 })
    .staggerTo(obj2, 0.6, { opacity: 1 }, 0.3)
    .staggerTo(
      obj2,
      0.8,
      {
        rotation: 10,
        yoyo: true,
        repeat: -1,
        ease: Power0.easeIn,
      },
      0.3
    );
  var tl2 = new TimelineMax();
  tl2.to(obj3, 0.6, { x: 524, delay: 1.3 }).to(obj3, 0.6, {
    rotation: 6,
    yoyo: true,
    repeat: -1,
    ease: Power0.easeIn,
  });

  motionPlayKill(idx, tl, flag);
  motionPlayKill(idx, tl2, flag);
}

function subMotion2(idx, flag, obj1, obj2, obj3) {
  var flag;

  var tl = new TimelineMax();
  tl.to(obj1, 0.5, { opacity: 1, y: 454 })
    .staggerTo(obj2, 0.6, { opacity: 1 }, 0.3)
    .staggerTo(
      obj2,
      0.8,
      {
        rotation: 10,
        yoyo: true,
        repeat: -1,
        ease: Power0.easeIn,
      },
      0.3
    );
  var tl2 = new TimelineMax();
  tl2.to(obj3, 0.75, { x: 560, delay: 1.3 }).to(obj3, 0.8, {
    x: 550,
    yoyo: true,
    repeat: -1,
    ease: Power0.easeIn,
  });

  motionPlayKill(idx, tl, flag);
  motionPlayKill(idx, tl2, flag);
}

function endingMotion(idx, flag, obj1, obj2, obj3, obj4) {
  var flag;

  var tl = new TimelineMax();
  tl.to(obj1, 0.5, { opacity: 1, y: 700 })
    .to(obj2, 0.4, { x: 200 })
    .to(obj3, 0.4, { x: 340 })
    .to(obj4, 0.4, { x: 200 });

  motionPlayKill(idx, tl, flag);
}

function motionPlayKill(idx, el, flag) {
  el.pause();
  if (idx === flag) {
    el.play();
  } else {
    el.kill();
    motionreset();
  }
}
