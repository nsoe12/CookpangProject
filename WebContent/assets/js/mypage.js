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



// click 이벤트(게시물)
let manageMember = document.querySelector("#post1");
console.log(manageMember);

manageMember.addEventListener("click", function() {
	console.log("click2");
	let memberMenu = document.querySelector("#bottom1");

	let isTrue = memberMenu.style.display == "block";

	hidden();
	active(this);
	if (isTrue) {
		$("#post1").show();
	} else {
		memberMenu.style.display = "block";
	}

	showPostList();
});

//======================================================
showPostList(userNumber);

function showPostList(userNumber, page) {
	$.ajax({
		url: '/mypage/mypageListOk.my',
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
$('.next-page1 .paging').on('click', 'a', function(e){
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
		
		$(".next-page1 .paging").html(page);				
						
					
		


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
	$(".PostList").html(text);

}





// click 이벤트(구매내역)
let managePost = document.querySelector("#post2");

managePost.addEventListener("click", function() {
	let memberPost = document.querySelector("#bottom2");
	let isTrue = memberPost.style.display == "block";
	hidden();
	active(this);
	if (isTrue) {
		$("#post2").show();
	} else {
		memberPost.style.display = "block";
	}
	showPaymentList();
});


showPaymentList(userNumber);

 function showPaymentList(userNumber, page) {
	$.ajax({
		url: '/mypage/paymentListOk.my',
		type: 'get',
		data: {
			userNumber: userNumber,
			page : page
		},
		dataType: 'json',
		success: function(paymentResult) {
			postPaymentTable(paymentResult);
			pagingPayment(paymentResult);
		}
	});
}

$('.next-page2 .paging').on('click', 'a', function(e){
	e.preventDefault();
	let userNumber = $(this).data('number');
	let page = $(this).data('page');
	showPaymentList(userNumber, page);
});



function postPaymentTable(paymentResult){
/*console.log("^^^^^^^^^^^^^^^^^");
console.log(paymentResult);*/
	
	let pay = '';
	
	if(paymentResult.userPaymentList.length == 0){
			console.log("@@@@@@@@@@@@@@@");
			pay+= `	<div>
									<h1 class="list-none">구매 내역이 없습니다!</h1>
								</div>
			
			`
			
		}else{
	
	
	
		pay = `<div class="history-name">
                     <div class="history-number">주문번호</div>
                     <div class="history-picture">상품사진</div>
                     <div class="history-name2">상품이름</div>
                     <div class="history-date">구매날짜</div>
                     <div class="history-price">상품가격</div>
                     <div class="history-price">수량</div>
                     <div class="history-price">주문상태</div>
                  </div>`
				}

	for (let i = 0; i < paymentResult.userPaymentList.length; i++){
		 
		pay += `<div class="purchase-ok1">
                     	<div class="ok-number">${paymentResult.userPaymentList[i].orderNumber}</div>
                     	<div class="ok-picture">
                        	<a href="#"> <img
                           src="/upload/${paymentResult.userPaymentList[i].ingredientImageSystemName}"
                           alt="" class="ok-picture-img" />
                        	</a>
                     	</div>
                     	<div class="ok-name">
                        	<a href="#">${paymentResult.userPaymentList[i].ingredientName}</a>
                    	</div>
                     	<div class="ok-date">${paymentResult.userPaymentList[i].orderDate}</div>
                     	<div class="ok-price">${paymentResult.userPaymentList[i].orderItemPrice}</div>
					 	<div class="ok-amount">${paymentResult.userPaymentList[i].orderItemQuantity}</div>
                     	<div class="ok-orderStatus">${paymentResult.userPaymentList[i].orderStatus}</div>
                  	</div>`
	}
		$(".purchase-history").html(pay);
}

// 구매내역 페이징 처리

	function pagingPayment(paymentResult) {
	console.log("================");
	console.log(paymentResult);
	
	if(paymentResult.userPaymentList.length == 0){
		console.log("&*&*&*&*&*&*&&*&*");
		return;
	}
	
	let pagingPay= '';

	/*pagingPay = `<div class="paging" >`*/


	pagingPay += `
	
						<p class="paging-btn-prev">
								<a href="" data-number=${paymentResult.userPaymentList[0].userNumber} data-page=${paymentResult.startPage - 1}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_prev.jpg"
									alt="" class="direction"  />
								</a>
						</p>`
	for(let i = paymentResult.startPage; i<=paymentResult.endPage; i++){
		
			if(i == paymentResult.page){
				pagingPay += `<p class="paging-num">
								<a href="" data-number=${paymentResult.userPaymentList[0].userNumber} data-page=${i} class="active">${i}</a>
							</p>`
			}else{
				pagingPay += `<p class="paging-num">
								<a href="" data-number=${paymentResult.userPaymentList[0].userNumber} data-page=${i} >${i}</a>
							</p>`
			}
			
		
	}
			pagingPay += `	<p class="paging-btn-next">
								<a href="" data-number=${paymentResult.userPaymentList[0].userNumber} data-page=${paymentResult.Endpage + 1}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_next.jpg"
									alt="다음으로"  />
								</a>
							</p>
							<p class="paging-btn" id="paging-last" >
								<a href="" data-number=${paymentResult.userPaymentList[0].userNumber} data-page=${paymentResult.realEndPage}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_d_next.jpg"
									alt="마지막으로" />
								</a>
							</p>`
							
			/*pagingPay = `</div>`*/
		$(".next-page2 .paging").html(pagingPay);				
	    console.log("##############3");
}
	
	




// click 이벤트(찜한레시피)
let managePay = document.querySelector("#post3");
managePay.addEventListener("click", function() {
	let memberPay = document.querySelector("#bottom3");
	let isTrue = memberPay.style.display == "block";
	hidden();
	active(this);
	if (isTrue) {
		
		$("#post3").show();
	} else {
		memberPay.style.display = "block";
	}
	showLikeList();
});


// 찜한 리스트 불러오기

showLikeList(userNumber);

 function showLikeList(userNumber, page) {
	$.ajax({
		url: '/mypage/mypageLikeOk.my',
		type: 'get',
		data: {
			userNumber: userNumber,
			page : page
		},
		dataType: 'json',
		success: function(saveResult) {
			postLikeTable(saveResult);
			pagingLike(saveResult);
		}
	});
}

$('.pagingLike').on('click', 'a', function(e){
	e.preventDefault();
	let userNumber = $(this).data('number');
	let page = $(this).data('page');
	showLikeList(userNumber, page);
});

function postLikeTable(saveResult) {

	console.log(saveResult);
	let text = '';
		if(saveResult.userSavePost.length == 0){
			text+= `	<div>
									<h1 class="list-none">아직 등록된 게시글이 없습니다!</h1>
								</div>
			
			`;
		}
	for (let i = 0; i < saveResult.userSavePost.length; i++) {
		
		/*text = ``*/
		
		if (i % 3 == 0) {
			text += `	<div class="ccc">`;
		}

		text += `
						<div class="bbb">
							<a href="/post/postReadOk.po?postNumber=${saveResult.userSavePost[i].postNumber}" class="go-post"> <img
								src="/upload/${saveResult.userSavePost[i].postThumbnail}"
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
	$(".LikeRecipe").html(text);

}

//찜한 리스트 페이징 처리
function pagingLike(saveResult) {
	console.log("================");
	console.log(saveResult);
	
	let likePage = '';
	
	if(saveResult.userSavePost.length == 0){
		return;
		}
	


	likePage += `
	
						<p class="paging-btn-prev">
								<a href="" data-number=${saveResult.userSavePost[0].userSaveNumber} data-page=${saveResult.page - 1}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_prev.jpg"
									alt="" class="direction"  />
								</a>
						</p>`
	for(let i = saveResult.startPage; i<=saveResult.endPage; i++){
		
		
			if(i == saveResult.page){
				likePage += `<p class="paging-num">
								<a href="" data-number=${saveResult.userSavePost[0].userSaveNumber} data-page=${i} class="active">${i}</a>
							</p>`
			}else{
				likePage += `<p class="paging-num">
								<a href="" data-number=${saveResult.userSavePost[0].userSaveNumber} data-page=${i} >${i}</a>
							</p>`
			}
			
		
	}
			likePage += `	<p class="paging-btn-next">
								<a href="" data-number=${saveResult.userSavePost[0].userSaveNumber} data-page=${saveResult.page + 1}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_next.jpg"
									alt="다음으로"  />
								</a>
							</p>
							<p class="paging-btn" id="paging-last" >
								<a href="" data-number=${saveResult.userSavePost[0].userSaveNumber} data-page=${saveResult.realEndPage}> <img
									src="https://2bob.co.kr/skin/nodskin_argio/images/paging_d_next.jpg"
									alt="마지막으로" />
								</a>
							</p>`
							
		$(".pagingLike").html(likePage);				
						
					
		


}





// 히든 주기
function hidden() {
	let $test = $(".test");
	$("#bottom1").hide();
	$test.hide();
}

// banner에 클릭 이벤트
// 클릭시 글 위에 border 생성
function active(target) {
	$("#post1").removeClass("active-banner");
	$("#post2").removeClass("active-banner");
	$("#post3").removeClass("active-banner");

	$(target).addClass("active-banner");
}

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
	
	
	let search = '';

	result.forEach(information => {
		if(information.userProfileImageSystemName==null){
					search += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="https://www.thechooeok.com/common/img/default_profile.png" alt="${information.userProfileImageSystemName}"
						class="man-img" />
					</a>
				</div>`
			
		}else{
		search += `
			<div class="search-man">
				<div class="man-left">
					<a href="#"> <img
						src="/upload/${information.userProfileImageSystemName}" alt="${information.userProfileImageSystemName}"
						class="man-img" />
					</a>
				</div>`
			}
				
		if(information.userNumber == userNumber ){
			search +=`<div class="man-right">
					<div class="man-id">
						<a href="/mypage/mypageOk.my?userNumber=${information.userNumber}"> ${information.userNickName} </a>
						
					</div>
					<div class="man-name">
						${information.userName}
					</div>
				</div>
				
				</div>`
			
		}	else{	
			search+=`	<div class="man-right">
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

	$('.recent-searches-box').html(search);
}

//회원 & 게시물 검색

// postList 페이징 처리




// myPage 팔로잉 리스트 뽑기
$('.following').on('click', function() {
	console.log(userNumber);

	$.ajax({
		url: '/follow/followingAjax.fo',
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


//팔로워 유저목록 뽑기


$('.follower').on('click', function() {
	console.log(userNumber);

	$.ajax({
		url: '/follow/followerAjax.fo',
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



function addUserInfo(result) {


	let text = '';
	console.log(result);
	result.forEach(info => {
		text += `
		<div class="follower-box1">
			<!-- 팔로워 프로필 사진 -->
			 <div class="follower-img">
			<img
		src="/upload/${info.userProfileImageSystemName}"
				alt="${info.userProfileImageSystemName}" class="follower-img2" />
			</div>		
			<!-- 팔로워 이름, 아이디 -->
			<div class="follower-nickname">
					<div class="follower-nickname-box">
						<a href="/user/youPage.us?userNumber=${info.userNumber}">${info.userNickName}</a>
					</div>
				<div class="follower-realname-box">${info.userName}</div>
			</div>
			<!-- 팔로워 취소 버튼 -->
			<div class="follower-cancel">
								
			</div>
		</div>
		`;
	});

	$('.main').html(text);
}



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















































































