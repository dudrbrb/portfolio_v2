window.onload = function(){
    makeSocial()
}

function makeSocial(){
    var socialBox = document.querySelector('.social_box');
    for(var i = 1; i < 9; i++){
        var socialContents = "<li>" +
            "<img class='thumb' src='img/social/"+i+".png'>" +
            "<div class='plus'>+</div>" +
            "</li>";

        socialBox.innerHTML += socialContents;
        
    }
}


var swiper = new Swiper(".swiper-container", {
    slidesPerView: 'auto'
});
  

var navi = document.querySelectorAll('nav li ul li');

[].forEach.call(navi, function(e){ 
  e.addEventListener("click", function(){
    var menuName = e.innerHTML;
    menuName == "인기메뉴" ? alert('준비중입니다'): alert(e.innerHTML)
  }, false); 
}); 