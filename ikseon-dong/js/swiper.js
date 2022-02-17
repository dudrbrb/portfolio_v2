// mian swiper
var naviArr  =['', '익선동의 역사','인선동의 옛 흔적','익선동의 명소','후기 & 오시는 길']

var mainSwiper = new Swiper(".main-swiper", {
    direction: 'vertical',
    slidesPerView: 1,
    speed: 560,
    mousewheel: true,
    pagination: {
        el: '.main-pagi',
        clickable: true
    },
    on:{
      slideChange : mainPagi
    }
  });
  
  var swiper1 = new Swiper(".swiper1", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    loop:true,
    autoplay: true
});

var swiper1Nav = new Swiper(".swiper1-nav", {
  slidesPerView: 'auto',
  centeredSlides: true,
  loop:true
});

swiper1.controller.control = swiper1Nav;
swiper1Nav.controller.control = swiper1;


var swiper2 = new Swiper(".swiper2", {
  slidesPerView: 'auto',
  autoplay: true,
  loop:true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  on:{
    slideChange : swiper2Pagi
  }
});

var swiper3 = new Swiper(".swiper3", {
  slidesPerView: 'auto',
  autoplay: true,
  loop:true,
  navigation: {
    nextEl: '.swiper3-next',
    prevEl: '.swiper3-prev',
  },
});

var swiper4 = new Swiper(".swiper4", {
  slidesPerView: 'auto',
  autoplay: true,
  loop:true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

function mainPagi(){
  var idx = this.realIndex,
  bullets = this.pagination.bullets,
  activeBullet = this.pagination.bullets[idx];

  [].forEach.call(bullets, function(e){ 
   e.innerHTML = "";
  });
  
  if(idx == 2 || idx==3) {
    [].forEach.call(bullets, function(e){ 
      e.style.background = "#3d352e";
      e.style.color = "#3d352e";
    })
  }else{
    [].forEach.call(bullets, function(e){ 
      e.style.background = "#f0e8d9";
      e.style.color = "#f0e8d9";
    })
  } 

  activeBullet.innerHTML = naviArr[idx];
  activeBullet.style.background ="none";
}

function swiper2Pagi(){
  var pagiBox = document.querySelector('.swiper2-pagi');
  var idx = this.realIndex + 1;

  pagiBox.innerHTML = idx + '/3'
}