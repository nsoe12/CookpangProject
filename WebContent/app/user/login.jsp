<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/assets/css/login.css">
	
	
	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  
  
<script async defer crossorigin="anonymous"
	src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v10.0&appId=1588150011384568"
	nonce="SiOBIhLG"></script>
<script
	src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
	charset="utf-8"></script>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>

 //기존 로그인 상태를 가져오기 위해 Facebook에 대한 호출
    function statusChangeCallback(res){
      statusChangeCallback(response);
    }
    
    function fnFbCustomLogin(){
      FB.login(function(response) {
        if (response.status === 'connected') {
          FB.api('/me', 'get', {fields: 'name,email'}, function(r) {
            console.log(r);
          })
        } else if (response.status === 'not_authorized') {
          // 사람은 Facebook에 로그인했지만 앱에는 로그인하지 않았습니다.
          alert('앱에 로그인해야 이용가능한 기능입니다.');
        } else {
          // 그 사람은 Facebook에 로그인하지 않았으므로이 앱에 로그인했는지 여부는 확실하지 않습니다.
          alert('페이스북에 로그인해야 이용가능한 기능입니다.');
        }
      }, {scope: 'public_profile,email'});
    }
    
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '790499885980880', // 내 앱 ID를 입력한다.
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
      });
      FB.AppEvents.logPageView();   
    }; */
    </script>

<!--반드시 중간에 본인의 앱아이디를 입력하셔야 합니다.-->
<script async defer crossorigin="anonymous"
	src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v10.0&appId=790499885980880"
	nonce="SiOBIhLG"></script>

<!-- 네이버 스크립트 -->
<script
	src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
	charset="utf-8"></script>

<script>

var naverLogin = new naver.LoginWithNaverId(
		{
			clientId: "zUs15_Xdm3rauoNNSInJ", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
			callbackUrl: "http://localhost:5500/naverLogin", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
			isPopup: false,
			callbackHandle: true
		}
	);	

naverLogin.init();

window.addEventListener('load', function () {
	naverLogin.getLoginStatus(function (status) {
		if (status) {
			var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.
    		
			console.log(naverLogin.user); 
    		
            if( email == undefined || email == null) {
				alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
				naverLogin.reprompt();
				return;
			}
		} else {
			console.log("callback 처리에 실패하였습니다.");
		}
	});
});


var testPopUp;
function openPopUp() {
    testPopUp= window.open("https://nid.naver.com/nidlogin.logout", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1");
}
function closePopUp(){
    testPopUp.close();
}

function naverLogout() {
	openPopUp();
	setTimeout(function() {
		closePopUp();
		}, 1000);
	
	
}


</script>


<!-- 카카오 스크립트 -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
Kakao.init('7fef91bf95cdad42e5bfa94145a6ae04'); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단
//카카오로그인
function kakaoLogin() {
    Kakao.Auth.login({
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
        	  console.log(response)
          },
          fail: function (error) {
            console.log(error)
          },
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }
 //카카오로그아웃  
function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
        	console.log(response)
        },
        fail: function (error) {
          console.log(error)
        },
      })
      Kakao.Auth.setAccessToken(undefined)
    }
  } 
</script>


<title>Document</title>
</head>
<body>
	<div class="wrapper">

		<div class="login-form">
			<h1>CookPang</h1>

			<form action="${pageContext.request.contextPath}/user/loginOk.us"
				method="POST">
				
						<div class="input-group">

							<label for="id">아이디</label> <input type="text" id="id"
								name="userId" value="${requestScope.userId}"
								placeholder="아이디를 입력하세요." required />
						</div>
						<div class="input-group">
							<label for="password">비밀번호</label> <input type="password"
								id="password" name="userPassword" placeholder="비밀번호를 입력하세요."
								required />
						</div>

						<div class="input-group checkbox-wrap">
							<div class="remember-wrap">
								<input type="checkbox" id="remember" name="remember"
									value="check" /> <label for="remember" id="remember-id">아이디
									기억하기</label>
							</div>
						</div>
						<button type="submit">로그인</button>

					

				<div class="input-group" id="input-line">
					<div class="line"></div>
					<div class="or">또는</div>
					<div class="line"></div>
				</div>

				<div class="login-social">
					<div class="btn-wrap">
						<a href="javascript:void(0)" id="fbLogin"
							onclick="fnFbCustomLogin();" scope="public_profile, email"> <img
							src="https://2bob.co.kr/skin/nodskin_argio/images/btn_login_face.jpg"
							alt="">
						</a> <a href="javascript:void(0)" id="naverIdLogin_loginButton"> <img
							src="https://2bob.co.kr/skin/nodskin_argio/images/btn_login_naver.jpg"
							alt="">
						</a> <a href="javascript:void(0)" id="" onclick="kakaoLogin();"> <img
							src="https://2bob.co.kr/skin/nodskin_argio/images/btn_login_kakao.jpg"
							alt="">
						</a>
						<!-- <div id="naver_id_login" style="display:none;">
                <a href="https://nid.naver.com/oauth2.0/authorize?response_type=token&amp;client_id=rHKnO5mBP35PpDXBrUsk&amp;
                redirect_uri=https%3A%2F%2F2bob.co.kr%2Fskin%2Fnodskin_argio%2FnaverLo.php&amp;
                state=0c58b192-3095-40a9-a321-978c664a252d" 
                onclick="window.open(this.href, 'naverloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=600, height=550'); 
                return false" id="naver_id_login_anchor">
                <img src="http://static.nid.naver.com/oauth/big_g.PNG" border="0" title="네이버 아이디로 로그인" 
                width="222px" height="48px">
              </a>
              </div> -->
					</div>

				</div>
			</form>
		</div>

		<div class="recover">
			<label for="find-password">비밀번호를 잊어버리셨나요? <a href="${pageContext.request.contextPath}/user/findPassword.us">비밀번호
					찾기</a>
			</label>
		</div>
	</div>

	<div class="bottom">
		<div class="member">
			계정이 없으신가요? <a href="${pageContext.request.contextPath}/user/join.us">
				회원가입 </a>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	
	<script src="${pageContext.request.contextPath}/assets/js/login.js"></script>

	
</body>
</html>