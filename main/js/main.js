var positionArr = [];
window.addEventListener('load', ()=>{
    navClickEvent();
    getScrollPosition();
    scrollEvent();
    makeWorks();
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

function makeWorks(){
    var list = [
        {
            title: 'sk magic 실시간 투표 이벤트',
            url: 'https://dudrbrb.github.io/portfolio/skmagic/love/index.html',
            skill: 'html / css / javascript / ajax',
            text: 'ajax통신을 이용해 고객듣의 투표율이 실시간으로 반영되어 보여지는 이벤트'
        },
        {
            title: 'sk magic 컨텐츠',
            url: 'https://dudrbrb.github.io/portfolio/skmagic/tip/index.html',
            skill: 'html / css / tweenmax / scraoll magic',
            text: '스크롤 함에 따라 인터렉티브한 모션이 나타나는 모바일 매거진',
        },
        {
            title: '롯데 하이틴 재질 테스트',
            url: 'https://dudrbrb.github.io/portfolio/highteen_test/',
            skill: 'html / css / javascript / tweenmax',
            text: 'mbti를 기반으로 제작된 테스트. 배포 당시 네이버 실시간 인기검색어 1위',
        },
        {
            title: '성범죄 전문센터',
            url: 'https://xn--z92bxyh5hlbx19c56ak97a.kr/',
            skill: 'adobe XD / vue / nuxt.js / scss / mysql',
            text: '성범죄에 관련하여 여러 사례와 문답 등을 알아보고, 직접자문을 구할 수 있는 반응형 사이트 SEO 최적화 작업 完',
        },
        {
            title: 'Ye & Partners',
            url: 'https://foreigner.lawfirmy.com/',
            skill: 'adobe XD / vue / nuxt.js / scss',
            text: '외국인들이 한국에서 법률 문제를 겪을 때, 도움을 구할 수 있도록 제작한 반응형 사이트',
        },
        {
            title: '자녀 양육비 계산기',
            url: 'https://ehon.booboolife.com/tool/%EC%96%91%EC%9C%A1%EB%B9%84%EA%B3%84%EC%82%B0%EA%B8%B0',
            skill: 'photoshop / vue / nuxt.js / scss / javascript',
            text: '부모의 소득, 자녀의 나이, 수 등 내용을 입력받아 부양자와 비부양자 각자의  양육비를 산정하여 나타내주는 계산기',
        },
        {
            title: '익선동',
            url: 'https://dudrbrb.github.io/portfolio/ikseon-dong/index.html',
            skill: 'photoshop / html / css / fullpage',
            text: '비상업 목적의 익선동 홍보 홈페이지 제작. 국제 커뮤니케이션 어워드 입선.',
        },
        {
            title: '한샘 리디자인',
            url: 'https://dudrbrb.github.io/portfolio/hanssem/index.html',
            skill: 'photoshop/ html / css / fullpage',
            text: '포트폴리오 목적으로 한샘 홈페이지 리디자인 및 퍼블리싱',
        },
        {
            title: 'Cook1015',
            url: 'https://dudrbrb.github.io/portfolio/cook1015/index.html',
            skill: 'photoshop/ html / css',
            text: '포트폴리오 목적으로 cook1015 홈페이지 리디자인 및 퍼블리싱',
        }
    ];

    var wrap = document.getElementsByClassName('thumb')[0];

    list.forEach((e, i) => {
        wrap.innerHTML += `<div>
                                <figure>
                                    <a href="${e.url}" target="_blank">
                                        <img src="img/works/${(i+1)}.png" alt="작업물1">
                                        <figcaption>OPEN PAGE</figcaption>
                                    </a>
                                </figure>
                                <strong>${e.title}</strong>
                                <span>${e.skill}</span>
                                <p>${e.text}</p>
                            </div>`;
    });
}