//팔로우 숫자 늘리기
$('.profile-btn').on('click', '.profile-btn2', function() {
	followAjax();
});

function followAjax() {
	let userNumber = $('.yourNumber').val();
	
	console.log(userNumber);
	$.ajax({
		url: '/user/youPageFollow.us',
		type: 'get',
		data: {
			userNumber: userNumber,
		},
		success: function(result) {
			console.log(result);
			showFollow(result);


		},
		error: (xhr, status, error) => console.log(error),
	});
}

function showFollow(result) {
	console.log(result);

	let results = result.trim().split(",");
	let followTF = results[0];
	let followCount = parseInt(results[1]);


	if (followTF === "true") {

		$('.profile-btn2').html(
			`
		 <i class="followBtnOn">팔로잉됐다!</i>
			`
		)
	} else if (followTF === "false") {
		$('.profile-btn2').html(
			`<i class="followBtnOff">팔로우</i>
			`
		)
	}

	$('.followCnt').text(followCount);

}
//===================##===================


// 모달 열기 함수
// 팔로워 모달창
function openModal() {
	console.log("click");
	document.getElementById("myModal").style.display = "block";
}

// 모달 닫기 함수
function closeModal() {
	document.getElementById("myModal").style.display = "none";
}

// 모달 닫기 버튼에 클릭 이벤트 추가
document.querySelector(".close").addEventListener("click", closeModal);

// 모달 창 외부를 클릭하면 모달 창이 닫히도록 추가
/*
window.addEventListener("click", function(event) {
	if (event.target == document.getElementById("myModal")) {
		closeModal();
	}
});
*/

// 팔로잉 모달창
// 모달 열기 함수
function openModal2() {
	console.log("click");
	document.getElementById("myModal2").style.display = "block";
}

// 모달 닫기 함수
function closeModal2() {
	document.getElementById("myModal2").style.display = "none";
}

// 모달 닫기 버튼에 클릭 이벤트 추가
document.querySelector(".close2").addEventListener("click", closeModal2);

// 모달 창 외부를 클릭하면 모달 창이 닫히도록 추가
/*
window.addEventListener("click", function(event) {
	if (event.target == document.getElementById("myModal2")) {
		closeModal();
	}
});
*/

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
	// $(".sub-find").stop().animate({ left: "toggle" });
	$(".sub-find").removeClass("sub-find__close");
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

//회원 & 게시물 검색
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
				addUserInformation(result);
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





function addUserInformation(result) {


	let find = '';

	result.forEach(information => {
	if(information.userProfileImageSystemName==null){
					find += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="https://www.thechooeok.com/common/img/default_profile.png" alt="${information.userProfileImageSystemName}"
						class="man-img" />
					</a>
				</div>`
			
		}else{
		find += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="/upload/${information.userProfileImageSystemName}" alt="${information.userProfileImageSystemName}"
						class="man-img" />
					</a>
				</div>`
			}	
				
		if(information.userNumber == userNumber ){
			find +=`<div class="man-right">
					<div class="man-id">
						<a href="/mypage/mypageOk.my?userNumber=${information.userNumber}"> ${information.userNickName} </a>
						
					</div>
					<div class="man-name">
						${information.userName}
					</div>
				</div>
				
				</div>`
			
		}	else{	
			find+=`	<div class="man-right">
					<div class="man-id">
						<a href="/user/youPage.us?userNumber=${information.userNumber}"> ${information.userNickName} </a>
						
					</div>
					<div class="man-name">
						${information.userName}
					</div>
				</div>
				
				</div>`
		}
	});

	$('.recent-searches-box').html(find);
}

//회원 & 게시물 검색

//팔로워 유저목록 뽑기


$('.follower').on('click', function() {
	console.log(userNumber);

	$.ajax({
		url: '/user/youPageFollower.us',
		type: 'get',
		data : { userNumber:userNumber },
		dataType: 'json',
		success: function(result) {
			console.log(result);
			addUserInfo(result);
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
});


//${info.userProfileImageSystemName ? '/upload/' + info.userProfileImageSystemName : 'default-profile-image.png'}
function addUserInfo(result) {


	let text = '';
	console.log(result);
	result.forEach(info => {
		text += `
		<div class="following-box1">
			<!-- 팔로워 프로필 사진 -->
			 <div class="following-img">
		
			`
		if(info.userProfileImageSystemName==null){
			text+=	`
			<img
		src="https://www.thechooeok.com/common/img/default_profile.png"
				alt="${info.userProfileImageSystemName}" class="following-img2" />
				
				`
				
			}else {
				text+=	`		
					<img
				src="/upload/${info.userProfileImageSystemName}"
						alt="${info.userProfileImageSystemName}" class="following-img2" />
						
						`
			}
			
			text+=	`
			</div>		
			<!-- 팔로워 이름, 아이디 -->
			<div class="following-nickname">
					<div class="following-nickname-box">
						<a href="/mypage/mypageOk.my?userNumber=${info.userNumber}">${info.userNickName}</a>
					</div>
				<div class="following-realname-box">${info.userName}</div>
			</div>
			<!-- 팔로워 취소 버튼 -->
			<div class="following-cancel">
								
			</div>
		</div>
		`;
	});


	$('.main').html(text);
}


showPostList(userNumber);


function showPostList(userNumber, page) {
	$.ajax({
		url: '/user/youPageListOk.us',
		type: 'get',
		data: {
			userNumber: userNumber,
			page : page
		},
		dataType: 'json',
		success: function(result) {
			postListTable(result);
			paging(result)
		}
	});
}
$('.paging').on('click', 'a', function(e){
	e.preventDefault();
	let userNumber = $(this).data('number');
	let page = $(this).data('page');
	showPostList(userNumber, page);
});
//======================================================

function paging(result) {
	console.log("================");
	console.log(result);
	
	if(result.userPost.length == 0){
		return;
	}
	let page = '';

	


	page += `
	
						<p class="paging-btn-prev">
								<a href="" data-number=${result.userPost[0].userNumber} data-page=${result.startPage - 1}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_prev.jpg"
									alt="" class="direction"  />
								</a>
						</p>`
	for(let i = result.startPage; i<=result.endPage; i++){
		
			if(i == result.page){
				page += `<p class="paging-num">
								<a href="" data-number=${result.userPost[0].userNumber} data-page=${i} class="active">${i}</a>
							</p>`
			}else{
				page += `<p class="paging-num">
								<a href="" data-number=${result.userPost[0].userNumber} data-page=${i} >${i}</a>
							</p>`
			}
			
		
	}
			page += `	<p class="paging-btn-next">
								<a href="" data-number=${result.userPost[0].userNumber} data-page=${result.Endpage + 1}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_next.jpg"
									alt="다음으로"  />
								</a>
							</p>
							<p class="paging-btn" id="paging-last" >
								<a href="" data-number=${result.userPost[0].userNumber} data-page=${result.realEndPage}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_d_next.jpg"
									alt="마지막으로" />
								</a>
							</p>`
		
		$(".paging").html(page);				
						
					
		


}


function postListTable(result) {

	let text = '';

		if(result.userPost.length == 0){
			console.log("@@@@@@@@@@@@@@@");
			text+= `	<div>
									<h1 class="list-none">아직 등록된 게시글이 없습니다!</h1>
								</div>
			
			`;
			
		}
		
	for (let i = 0; i < result.userPost.length; i++) {
		if (i % 3 == 0) {
			text += `	<div class="ccc">`;
		}

		text += `
						<div class="bbb">
							<a href="/post/postReadOk.po?postNumber=${result.userPost[i].postNumber}" class="go-post"> <img
								src="/upload/${result.userPost[i].postThumbnail}"
								class="thumbnail-img" />
							</a>
						</div>
		`;

		if (i % 3 == 2) {
			text += `
				</div>
			`;
		}

	}
	$(".main-bottom").html(text);

}



// youPage 팔로잉 리스트 뽑기
$('.following').on('click', function() {
	console.log(userNumber);

	$.ajax({
		url: '/user/youPageFollowing.us',
		type: 'get',
		data : { userNumber:userNumber },
		dataType: 'json',
		success: function(result) {
			console.log(result);
			addFollowingInfo(result);
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
});



function addFollowingInfo(result) {


	let text = '';
	console.log(result);
	result.forEach(info => {
		text += `
		<div class="following-box1">
			<!-- 팔로워 프로필 사진 -->
			 <div class="following-img">
		
			`
		if(info.userProfileImageSystemName==null){
			text+=	`
			<img
		src="https://www.thechooeok.com/common/img/default_profile.png"
				alt="${info.userProfileImageSystemName}" class="following-img2" />
				
				`
				
			}else {
				text+=	`		
					<img
				src="/upload/${info.userProfileImageSystemName}"
						alt="${info.userProfileImageSystemName}" class="following-img2" />
						
						`
			}
			
			text+=	`
			</div>		
			<!-- 팔로워 이름, 아이디 -->
			<div class="following-nickname">
					<div class="following-nickname-box">
						<a href="/mypage/mypageOk.my?userNumber=${info.userNumber}">${info.userNickName}</a>
					</div>
				<div class="following-realname-box">${info.userName}</div>
			</div>
			<!-- 팔로워 취소 버튼 -->
			<div class="following-cancel">
								
			</div>
		</div>
		`;
	});

	$('.main-following').html(text);
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

// enter key -> find user & post
$('.find-btn').on('keyup', function(event) {
	let searchCate = $('.drop-down').val();

if(event.which === 13){
	if (searchCate == 'user') {
		$.ajax({
			url: '/mainAjaxOk.m',
			type: 'get',
			data: { input: $('.find-btn').val().trim() },
			dataType: 'json',
			success: function(result) {
				console.log(result);
				addUserInformation(result);
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




