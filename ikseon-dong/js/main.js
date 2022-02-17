window.onload = function(){
  maingBgSet();
}




function maingBgSet(){
  var swiperSlide = document.querySelectorAll('.main-wrapper > .swiper-slide');
  swiperSlide.forEach(function(e){ 
    e.style.background = "url(img/"+ (mainSwiper.realIndex + 1) +"/bg.png)"
    mainSwiper.realIndex++
  }); 
}


function addClass(e, c) {
    e.classList.add(c);
    return e;
};

function removeClass(e, c) {
    e.classList.remove(c);
    return e;
};

function getElementIndex(e, range) {
    if (!!range) return [].indexOf.call(e, range);
    return [].indexOf.call(e.parentNode.children, e);
}

