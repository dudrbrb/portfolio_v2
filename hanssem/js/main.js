var paginationArr  =['HANSSEM INTERIOR', 'PACKAGE', 'HOUSE A CASE', 'HOME STYLING EVENT', 'INTERIOR TIP', 'STORE', 'ONLINE MODEL HOUSE']
var swiper = new Swiper(".swiper-container", {
    direction: 'vertical',
    slidesPerView: 1,
    speed: 560,
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (idx, className) {
          return '<span class="' + className + '">' + paginationArr[idx] +'</span>';
        }
      }
});

window.onload = function(){
  var swiperSlide = document.querySelectorAll('.swiper-slide');
  swiperSlide.forEach(function(e){ 
    e.style.background = "url(img/"+ (swiper.realIndex + 1) +"/bg.png)"
    swiper.realIndex++
  }); 

}