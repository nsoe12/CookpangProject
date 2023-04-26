// 모달 열기 함수
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// 모달 닫기 함수
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// 모달 닫기 버튼에 클릭 이벤트 추가
document.querySelector(".close").addEventListener("click", closeModal);

// 모달 창 외부를 클릭하면 모달 창이 닫히도록 추가
/*window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("myModal")) {
    closeModal();
  }
});*/

// 소개글 아래에 숫자 늘어나는거
const myTextarea = document.getElementById("myTextarea");
const charCount = document.getElementById("charCount");

myTextarea.addEventListener("input", function () {
  const currentLength = myTextarea.value.length;
  const maxLength = myTextarea.getAttribute("maxlength");
  charCount.textContent = currentLength + " / " + maxLength;
});


// 여기서부터
// 검색창
let $search = $(".find2");
$search.click(() => {
  console.log("click");

  $(".sub-find").toggleClass("sub-find__close");
  $(".sub-find2").removeClass("sub-find2__close");
  // $(".sub-find").stop().animate({ left: "toggle" });
});

$(function () {
  $(".left_sub_menu").hide();
  $(".has_sub").click(function () {
    $(".left_sub_menu").fadeToggle(300);
  });
  // 왼쪽메뉴 드롭다운
  $(".sub_menu ul.small_menu").hide();
  $(".sub_menu ul.big_menu").click(function () {
    $("ul", this).slideToggle(300);
  });
  // 외부 클릭 시 좌측 사이드 메뉴 숨기기
  $(".overlay").on("click", function () {
    $(".left_sub_menu").fadeOut();
    $(".hide_sidemenu").fadeIn();
  });
});

// 알림창
let $search2 = $(".alarmm");
$search2.click(() => {
  console.log("click");

  $(".sub-find2").toggleClass("sub-find2__close");
	$(".sub-find").removeClass("sub-find__close");
  // $(".sub-find").stop().animate({ left: "toggle" });
});

$(function () {
  $(".left_sub_menu").hide();
  $(".has_sub").click(function () {
    $(".left_sub_menu").fadeToggle(300);
  });
  // 왼쪽메뉴 드롭다운
  $(".sub_menu ul.small_menu").hide();
  $(".sub_menu ul.big_menu").click(function () {
    $("ul", this).slideToggle(300);
  });
  // 외부 클릭 시 좌측 사이드 메뉴 숨기기
  $(".overlay").on("click", function () {
    $(".left_sub_menu").fadeOut();
    $(".hide_sidemenu").fadeIn();
  });
});

// 여기까지


//미리보기 여기서부터 
$('.change-picture').on('change',function(){
	let files = this.files;
	console.log(files);
	let src = URL.createObjectURL(files[0]);
	console.log(src);
	
	
	
	$('#img-box').html(
		
		
		`<img src= ${src} class='img-box-img'  />`
	)
	
});



$('.box1').on('blur', function(){
	let password = $(this).val();
	console.log(password);
	
	$.ajax({
		url : '/user/passwordAjax.edit',
		type : 'get',
		data : {password : password},
		success : function(result){
			let msg = result == 1 ? "비밀번호가 일치합니다." : "비밀번호를 다시 확인해주세요";
			$('.pass-msg').text(msg);
		}
	});
});




/*$pwInput.on('blur', function(){
   if(regex.test(  $(this).val()   )){
      $checkPwMsg.html('<p style="color:green">사용가능한 비밀번호입니다.</p>');
   }else{
      $checkPwMsg.html("사용 불가능한 비밀번호입니다. <br>영어, 숫자, 특수문자를 포함하여 8글자 이상 작성하세요!");
   }
});
*/
	const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
	
$(function() { 
  $("#password-form").submit(function(e) {
    e.preventDefault();

	let password1 = $("#password-form .box2").val();
    let password2 = $("#password-form .box3").val();
    let oldPassword = $("#password-form .box1").val();
    let $checkPwMsg = $(".password_check_msg2");
	
	if (!regex.test(password1)) {
      $checkPwMsg.html("사용 불가능한 비밀번호입니다. <br>영어, 숫자, 특수문자를 포함하여 8글자 이상 작성하세요!");
      return;
    } else if (password1 !== password2) {
      $(".password_check_msg").text('비밀번호를 확인해주세요');
      return;
    } else if (oldPassword === password1) {
      $(".password_check_msg2").text('이전 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.');
      return;
    }

    this.submit();
	
  });
});





//회원 삭제
$('.goodbye-btn').on('click', function(){
   
   if (window.confirm('정말 탈퇴하시겠습니까?')){
       window.location.href = "/user/Delete.edit";
   }
   else{
   }
});



// 검색 & 알림

$('.search-btn').on('click', function() {
	let searchCate = $('.drop-down').val();

	if (searchCate == 'user') {
		$.ajax({
			url: '/mainAjaxOk.m',
			type: 'get',
			data: { input: $('.find-btn').val().trim() },
			dataType: 'json',
			success: function(result) {
				console.log(result);
				addUserInfo(result);
				//$('.find-btn').val('');
			},
			error: function(a, b, c) {
				console.log(c);
			}
		});
	} else {
		findPost($('.find-btn').val().trim());
	}
});
// ================================================검색 Ajax==================================================== //

function findPost(keyword) {
	let form = document.createElement('form');
	form.setAttribute('charset', 'utf-8');
	form.setAttribute('method', 'get');
	form.setAttribute('action', '/mainSearch.m');

	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "keyword");
	hiddenField.setAttribute("value", keyword);
	form.appendChild(hiddenField);

	document.body.appendChild(form);
	form.submit();
}





function addUserInfo(result) {


	let text = '';

	result.forEach(info => {
		text += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="/upload/${info.userProfileImageSystemName}" alt="${info.userProfileImageSystemName}"
						class="man-img" /> <!-- </a> -->
					</a>
				</div>
				<div class="man-right">
					<div class="man-id">
						<a href="#"> ${info.userNickName} </a>
						<!-- <a href="#" class="man-id2">hot_boy</a> -->
					</div>
					<div class="man-name">
						${info.userName}
					</div>
				</div>
				
			</div>
		`;
	});

	$('.recent-searches-box').html(text);
}


// 검색 & 알림

// 뒤로 가기
$('.cancel-btn').on('click', function(){
   history.back();
});

// enter key -> find user & post
$('.find-btn').on('keyup', function(event) {
	let searchCate = $('.drop-down').val();

	if (event.which === 13) {
		if (searchCate == 'user') {
			$.ajax({
				url: '/mainAjaxOk.m',
				type: 'get',
				data: { input: $('.find-btn').val().trim() },
				dataType: 'json',
				success: function(result) {
					console.log(result);
					addUserInfo(result);
					//$('.find-btn').val('');
				},
				error: function(a, b, c) {
					console.log(c);
				}
			});
		} else {
			findPost($('.find-btn').val().trim());
		}
	}
});




