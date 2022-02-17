var nameBox = document.querySelector('.name'),
    telBox = document.querySelector('.tel'),
    numBox = document.querySelector('.number');

var backBtn = document.querySelector('.back_btn'),
    sendBtn = document.querySelector('.cn_btn'),
    confirmBtn = document.querySelector('.confirm_btn'),
    joinBtn = document.querySelector('.join_btn');

var checkbox = document.querySelectorAll('input[type="checkbox"]'),
    checkbox1 = document.querySelector('input[id="priv1"]'),
    checkbox2= document.querySelector('input[id="priv2"]'),
    priv1_btn= document.querySelector('.priv1_btn'),
    priv2_btn= document.querySelector('.priv2_btn');

var popClose = document.querySelector('.popup_close'),
    popWrapper = document.querySelector('.popup_wrapper'),
    popContainer = document.querySelector('.popup_container'),
    popup = document.querySelector('.popup');

var nameValue,
    telValue,
    numValue;

var cnNumberPass = false,
    cnNumAgain = false,
    confirmCnNum = false,
    serInfo,
    payKey;

var timer = document.querySelector('.timer'),
    SetTime,		// 최초 설정 시간(기본 : 초)
    tid;

var countDownDate = new Date('2021-10-30').getTime() + (1000 * 60 * 60 * 15);
var now = new Date().getTime();
distance = countDownDate - now;

//모바일 정규식
function isMobile(phoneNum) { 
    phoneNum;

    var regExp =/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/; 
    var myArray; 

    if(regExp.test(phoneNum)){ 
      myArray = regExp.exec(phoneNum); 
      return true; 
    }else { 
      return false; 
    } ;
};



function keyupEvent(input, btn, img){
    input.value = input.value.replace(/[^0-9]/gi,"")

    if( input.value.length !== 0 ) btn.setAttribute('src', 'img/' + img + '_on.png');
    else btn.setAttribute('src', 'img/' + img + '_off.png');
};

function errorMessege(error){
    var errText = '';
    error.responseJSON.errors.forEach(function(ele){
     errText += ele.message + '\n';
    })
    alert(errText);
}

function openPopup(imgName){
  popWrapper.style.display = 'block';
  popup.setAttribute('src', 'img/popup/' + imgName + '.png');
};


function msg_time() {	
  var m = Math.floor(SetTime / 60);
  var s =  (SetTime % 60);
  if(s < 10) s = '0' + s;

  var time = m + ":" + s ;
  
  timer.innerHTML = time;	
  SetTime--;

  if (SetTime < 0) {
    clearInterval(tid);	
    alert("인증번호 유효 시간이 초과되었습니다.");
    timer.innerHTML = '0:00'
  }
}

function TimerStart(){ 
  tid = setInterval('msg_time()', 1000) 
}

function joinBtnActive(ifText1, ifText2, ifText3){ 
  if( ifText1 && ifText2 && ifText3){
    joinBtn.setAttribute('src', 'img/join_on.png');
  }else{
    joinBtn.setAttribute('src', 'img/join_off.png');

  }
}

backBtn.addEventListener('click', function(){
  window.open('https://supporters.miraeassetpay.kr/', '_self')
});

popClose.addEventListener('click', function(){
  popWrapper.style.display = 'none';
});

priv1_btn.addEventListener('click', function(){
  openPopup('priv1');
});

priv2_btn.addEventListener('click', function(){
  openPopup('priv2');
});


nameBox.onkeyup = function(){
  joinBtnActive(checkbox1.checked, checkbox2.checked, cnNumberPass)
  nameValue = nameBox.value;
  
  if(nameValue == "") joinBtn.setAttribute('src', 'img/join_off.png');

};

telBox.onkeyup = function(){
    keyupEvent(this, sendBtn, 'cn');
    joinBtn.setAttribute('src', 'img/join_off.png');
    confirmBtn.setAttribute('src', 'img/confirm_off.png');
    numBox.value = "";
    cnNumberPass = false;
};

numBox.onkeyup = function(){
    keyupEvent(this, confirmBtn, 'confirm');
    joinBtn.setAttribute('src', 'img/join_off.png');
};

numBox.onchange = function(){
  numValue = numBox.value;
  if (numValue.length < 5) confirmCnNum = false;
};

joinBtn.addEventListener('click', function(){
  if(distance <= 0){
    return alert('모집 기간이 마감되었습니다.')
  }
  var pattern = /([^가-힣\x20a-zA-Z])/i;
  var pattern2 = /\s/g;
  nameValue = nameBox.value;
  telValue = telBox.value;
  
    if (nameValue == "" || pattern.test(nameValue) || pattern2.test(nameValue)){
        alert("성함을 정확히 입력해 주세요.");
        return false;
    }

    if(cnNumberPass == false ){
      alert("전화번호 인증을 완료해주세요.");
      return false
    }

    
    //개인정보 제공 동의
    if (checkbox1.checked == false) {
      alert("개인정보 수집 이용 동의에 체크해주세요.");
      return false;
    } 
    
    if(checkbox2.checked == false){
      alert("개인정보 취급 위탁 동의에 체크해주세요.");
      return false;
    } 

    $.ajax({
      url:'https://api-mk1.miraeassetpay.kr/supporter/',
       type: 'POST',
      data:{
        name: nameValue,
        phone: telValue
      },
      statusCode: {
        201: function(args) {
          openPopup('join');
        },
        400: function(err){
          errorMessege(err);
        },
        404: function(err){
          errorMessege(err);
        },
      },
      error: function (err) {
        //400과 404를 제외한 에러가 발생했을시
        if(err.status !== 400 && err.status !== 404){
          alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
        }
      },    
      cache: false
    });
   
});

sendBtn.addEventListener('click', function(){
  if(distance <= 0){
    return alert('모집 기간이 마감되었습니다.')
  }
    telValue = telBox.value;
    mobileValidate = isMobile(telValue);

    if (telValue == "" || mobileValidate == false) {
      alert("전화번호를 정확히 입력해 주세요.");
      return false;
    } else{
      $.ajax({
        url:'https://ims-api.imform.net/v1/combine/phone-auth/new/',
        type: 'POST',
        data:{
          phone_num: telValue,
          client: "미래페이"
        },
        statusCode: {
          201: function(args) {
            if (args.response) return alert("이미 가입된 전화번호 입니다.");
            
            clearInterval(tid);		// 타이머 해제
            SetTime = 300;
            TimerStart();// 타이머 시작
            
            if( !cnNumAgain ) openPopup('cn_num1');
            else openPopup('cn_num2');
            payKey = args.payKey;

            confirmBtn.setAttribute('src', 'img/confirm_on.png');
            numBox.disabled = false;
            cnNumberPass = false;
            cnNumAgain = true;
            confirmCnNum = true;
          },
          400: function(err){
            errorMessege(err);
            numBox.innerHTML = "";
          },
          404: function(err){
            errorMessege(err);
            numBox.innerHTML = "";
          },
        },
        error: function (err) {
          //400과 404를 제외한 에러가 발생했을시
          if(err.status !== 400 && err.status !== 404){
            alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
            numBox.innerHTML = ""
          }
        },    
        cache: false
      });
    }
});

confirmBtn.addEventListener('click', function(){
    nameValue = nameBox.value;
    numValue = numBox.value;
    // if( !confirmCnNum ) return ;
    $.ajax({
      url:'https://ims-api.imform.net/v1/combine/phone-auth/check/',
       type: 'POST',
      data:{
        phone_num: telValue,
        code: numValue,
      },
      statusCode: {
        204: function() {
          alert('조회된 정보가 없습니다.');
        },
        200: function(args) {
          clearInterval(tid);		// 타이머 해제
          timer.innerHTML = '';
      
          openPopup('cn_success');
          joinBtnActive(checkbox1.checked, checkbox2.checked, nameValue !== "" && nameValue !== undefined, cnNumberPass)
          cnNumberPass = true;
        },
        400: function(err){
          errorMessege(err);

        },
        404: function(err){
        //   errorMessege(err);
          openPopup('cn_fail');
        },
      },
      error: function (err) {
        //400과 404를 제외한 에러가 발생했을시
        if(err.status !== 400 && err.status !== 404){
          alert("네트워크 오류로 서버와의 통신이 실패하였습니다.");
        }
      },    
      cache: false
    });
});


[].forEach.call(checkbox, function(e){ 
  e.addEventListener("click", function(){
    nameValue = nameBox.value;
    joinBtnActive(checkbox1.checked && checkbox2.checked, nameValue !== "" && nameValue !== undefined, cnNumberPass)
  }, false); 
}); 


