window.onload  = function() {
  catchAction()
}

let page = document.querySelectorAll('section'),
    pagenation = document.querySelectorAll('ul.title li');
    pageIndex = 0,
    nowMoving = false;

let beforeY= window.scrollY,
    initialX = null,
    initialY = null;

pagenation.forEach( i => {
    i.addEventListener('click', (e)=>{
        pageIndex = e.target.value;
    })
})

function catchAction() {
    window.addEventListener('scroll', e=>{wheelEvent(e)});
    window.addEventListener('touchstart', e=>{touchEventInit(e)});
    window.addEventListener('touchmove', e=>{touchEvent(e)});
    window.addEventListener("mousedown", e => {
      touchEventInit(e),
      window.addEventListener("mousemove", el =>{touchEvent(el)})
    });
    window.addEventListener("mouseup", e => {
      window.removeEventListener("mousemove",  el =>{touchEvent(el)});
    });

}

function wheelEvent(e){
    // 마우스 휠 이벤트
    if(nowMoving) return
    nowMoving = true;
    
    // e.deltaY > 0 ---> 스크롤 내릴 때 true 올릴 때 false
    let scrollDown = (window.scrollY > beforeY ? true : false);
    getPageIndex(scrollDown)
};

function touchEventInit(e){
  // 터치 시작 위치
  initialX = `${e.touches ? e.touches[0].clientX : e.clientX}`;
  initialY = `${e.touches ? e.touches[0].clientY : e.clientY}`;
}

function touchEvent(e){
  // 터치, 마우스 드래그 이벤트
  if(nowMoving) return
  nowMoving = true;

  const currentX = `${e.touches ? e.touches[0].clientX : e.clientX}`,
        currentY = `${e.touches ? e.touches[0].clientY : e.clientY}`;

  let diffX = initialX - currentX,
      diffY = initialY - currentY,
      touchDown = null;

  if( Math.abs(diffX) < Math.abs(diffY)){
    touchDown = (0 < diffY ? true : false)
  }

  getPageIndex(touchDown)
}

function getPageIndex(down){
    // 현재 페이지 인덱스 구하는 함수
    console.log(down)
    if(down){
      pageIndex == (page.length-1) 
      ? pageIndex = (page.length-1) 
      : ++pageIndex
    } else{
      pageIndex <= 0 
      ? pageIndex = 0 
      : --pageIndex
    }
    console.log(pageIndex)
    moveEvent(pageIndex);
};

function moveEvent(number){
    pageIndex = number; 

    let screenHeight = document.body.clientHeight,
        container = document.querySelector('#container');

    container.style.transform = `translateY(-${number * screenHeight} )`;
    setTimeout(() => {
        nowMoving = false;
    }, 400);
};

