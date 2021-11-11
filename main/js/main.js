var positionArr = [];
window.addEventListener('load', ()=>{
    navClickEvent();
    getScrollPosition();
    scrollEvent();
    window.addEventListener('scroll', function(){
        scrollEvent()
    });
});


function navClickEvent(){
    var pagenation = document.querySelectorAll('ul.title li');
    
    pagenation.forEach( i => {
        i.addEventListener('click', (e)=>{
            document.getElementById(e.target.innerText).scrollIntoView({ block: "start", behavior: "smooth"});
        });
    });
}


function getScrollPosition(){
    var section = document.querySelectorAll('section');
    section.forEach((e, i) => {
        var position = e.getBoundingClientRect().top + window.pageYOffset - (i < 3 ? 400 : 800);
        positionArr.push(position)
    });
}

function scrollEvent(){
    positionArr.forEach((pos, idx) => {
        if( window.scrollY > pos ){
            switch(idx) {
                case 0: mainMotion()
                     break;
                case 1: introduceMotion()
                     break;
                case 2: workMotion()
                     break;
                case 3: contactMotion()
                     break;
                default: mainMotion()
                     break;
            }
        }
    })
}

function mainMotion(){
    var title = document.querySelector('#Main .title'),
        fl1 = document.querySelector('#Main .fl1'),
        fl2 = document.querySelector('#Main .fl2'),
        bg1 = document.querySelector('#Main .bg1'),
        bg2 = document.querySelector('#Main .bg2'),
        bg3 = document.querySelector('#Main .bg3');

    title.style.cssText = "opacity: 1; transform: translate(0, 0)";
    bg1.style.cssText = "transform: translate(220px, 280px)";
    bg2.style.cssText = "transform: translate(0, 0); opacity: 1;";

    setTimeout(() => {
        bg3.style.cssText = "clip: rect(0px, 540px, 200px, 0px)";
        fl1.style.cssText = "clip: rect(0px, 150px, 150px, 0px)";
        fl2.style.cssText = "transform: scale(1) rotate(0deg)";
    }, 200);
}

function introduceMotion(){
    var fl = document.querySelector('#Introduce .fl1'),
        img = document.querySelector('#Introduce .profil');
    
    fl.style.cssText = "transform: scale(1) rotate(0deg)";
    img.style.cssText = "opacity: 1; transform: translateY(0)"
}
function workMotion(){
    var fl1 = document.querySelector('#Works .fl1'),
        fl2 = document.querySelector('#Works .fl2'),
        thumb = document.querySelectorAll('#Works figure');
    
    fl1.style.cssText = " clip: rect(0px, 500px, 500px, 0px);";
    fl2.style.cssText = " clip: rect(0px, 500px, 500px, 0px);";

    thumb.forEach((e, idx)=> {
        setTimeout(() => {
           e.style.cssText = 'opacity: 1; transform: translate(0)' 
        }, 180*idx);
    });
}

function contactMotion(){
    var icon =  document.querySelectorAll('#Contact .icon');
    icon.forEach((e, idx)=> {
        setTimeout(() => {
        e.style.cssText = 'clip: rect(0px, 200px, 200px, 0px)' 
        }, 180*idx);
    });
}