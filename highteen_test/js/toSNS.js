$(".sns_btn").on("click", sns_Click);

function sns_Click() {
    var sns = $(this).attr('value');
    var strTitle = $(document).attr('title');
    var url = window.location.href;
    toSNS(sns, strTitle, url);
}


function toSNS(sns, strTitle, url) {
    if (result == 'undefined') result = 0;
    var snsArray = new Array();
    var strMsg = strTitle + ' ' + url;

    var image = "https://ilotteshopping.com/highteen_test/image/thumb/" + result + ".png";
    var title;
    var description;
    var goUrl;
    
    if (result == 'undefined') {
        title = '내가 “하이틴 무비＂에 출연한다면?\n나의 하이틴 재질 알아보기';
        description = '';
        goUrl = 'https://ilotteshopping.com/highteen_test/';

    } else {
        if (result == 1) title = '10년 지기 절친, BEST FRIEND';
        if (result == 2) title = '프롬 파티 퀸, QUEEN BEE';
        if (result == 3) title = '파티여는 분위기 메이커, PARTY HOST';
        if (result == 4) title = '너드미 넘치는 전교 1등, NERD';
        if (result == 5) title = '당찬 소녀, CYNICAL';
        if (result == 6) title = '이 구역의 미친X, BITXX';
        if (result == 7) title = '반구석의 미스테리한 친구, MYSTERIOUS';
        if (result == 8) title = '연극동아리 지도 선생님, CLUB TEACHER';

        description = '내가 “하이틴 무비＂에 출연한다면?\n나의 하이틴 재질 알아보기';
        goUrl = 'https://ilotteshopping.com/highteen_test/0' + result + '/'
    }

    snsArray['twitter'] = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(goUrl+'?s=t');
    snsArray['facebook'] = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(goUrl+'?s=f');

    if (sns == 'kakao') {
        kakaoShare();
        CountCheck('카카오톡 공유하기 클릭');
    } else if (sns == 'insta') {
        instaShare();
    } else {
        if( sns == 'twitter') CountCheck('트위터 공유하기 클릭');
        if( sns == 'facebook') CountCheck('페이스북 공유하기 클릭');
        window.open(snsArray[sns]);
    }

    function kakaoShare() {
        Kakao.cleanup();

        Kakao.init('216b9781f31036b4c38fdfc1219e16e9');

        Kakao.Link.sendScrap({
            requestUrl: document.location.href
        });

        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: image,
                link: {
                    mobileWebUrl: 'https://ilotteshopping.com/highteen_test/',
                    webUrl: 'https://ilotteshopping.com/highteen_test/'
                },
                imageWidth: 1200,
                imageHeight: 600,
            },
            buttons: [{
                title: '자세히보기',
                link: {
                    mobileWebUrl: goUrl + '?s=k',
                    webUrl: goUrl
                }
            }, {
                title: '테스트해보기',
                link: {
                    mobileWebUrl: 'https://ilotteshopping.com/highteen_test/',
                    webUrl: 'https://ilotteshopping.com/highteen_test/'
                }
            }],
            fail: function () {
                alert('모바일 기기에서만 가능한 기능입니다.');
            }
        });
    }

    function instaShare() {

        var varUA = navigator.userAgent.toLowerCase();
        if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
            //IOS
            window.open('instagram://media', '_self');

        } else {
            //기타
            window.open('intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end', '_self');
        }

    }

}
