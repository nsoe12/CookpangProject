// 여기서부터
// 검색창
let $search = $(".find2");
$search.click(() => {
	console.log("click");

	$(".sub-find").toggleClass("sub-find__close");
	$(".sub-find2").removeClass("sub-find2__close");
	// $(".sub-find").stop().animate({ left: "toggle" });
});

$(function() {
	$(".left_sub_menu").hide();
	$(".has_sub").click(function() {
		$(".left_sub_menu").fadeToggle(300);
	});
	// 왼쪽메뉴 드롭다운
	$(".sub_menu ul.small_menu").hide();
	$(".sub_menu ul.big_menu").click(function() {
		$("ul", this).slideToggle(300);
	});
	// 외부 클릭 시 좌측 사이드 메뉴 숨기기
	$(".overlay").on("click", function() {
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

$(function() {
	$(".left_sub_menu").hide();
	$(".has_sub").click(function() {
		$(".left_sub_menu").fadeToggle(300);
	});
	// 왼쪽메뉴 드롭다운
	$(".sub_menu ul.small_menu").hide();
	$(".sub_menu ul.big_menu").click(function() {
		$("ul", this).slideToggle(300);
	});
	// 외부 클릭 시 좌측 사이드 메뉴 숨기기
	$(".overlay").on("click", function() {
		$(".left_sub_menu").fadeOut();
		$(".hide_sidemenu").fadeIn();
	});
});

// 여기까지

// ================================================검색 Ajax==================================================== //

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
	console.log(result);
	result.forEach(info => {

		if (info.userProfileImageSystemName == null) {
			text += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="https://www.thechooeok.com/common/img/default_profile.png" alt="${info.userProfileImageSystemName}"
						class="man-img" />
					</a>
				</div>`

		} else {
			text += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="/upload/${info.userProfileImageSystemName}" alt="${info.userProfileImageSystemName}"
						class="man-img" />
					</a>
				</div>`
		}

		if (info.userNumber == userNumber) {
			text += `<div class="man-right">
					<div class="man-id">
						<a href="/mypage/mypageOk.my?userNumber=${info.userNumber}"> ${info.userNickName} </a>
						
					</div>
					<div class="man-name">
						${info.userName}
					</div>
				</div>
				
				</div>`

		} else {
			text += `	<div class="man-right">
					<div class="man-id">
						<a href="/user/youPage.us?userNumber=${info.userNumber}"> ${info.userNickName} </a>
						
					</div>
					<div class="man-name">
						${info.userName}
					</div>
				</div>
				
				</div>`
		}

	});

	$('.recent-searches-box').html(text);
}



//==========================================클릭 이벤트 할꺼임 건들지 마삼 카테고리꺼임==================================




// 새로고침 때문에 click이벤트를 줘도 console.log를 해도 콘솔에 값이 안나온다.
// 그렇기 때문에 click이벤트를 주는것이 아니라 로드가 된 다음을 생각하자
// 역시 ajax 공부를 하는게 짱이다
$(document).ready(function() {
	const urlSearch = new URLSearchParams(location.search);
	const categoryNumber = urlSearch.get('categoryNumber');

	let $cateBox = $(".category-box");

	for (let i = 0; i < $cateBox.length; i++) {
		if ($cateBox.eq(i).data("id") == categoryNumber) {
			$cateBox.eq(i).addClass('selected');
		}
	}

});

// a태그를 span으로 바꿔서 onclick으로 경로 보내기 (도전해보자)


//==========================================클릭 이벤트 할꺼임 건들지 마삼 카테고리꺼임==================================






