/**
 * 
 */

$(document).ready(function() {
	const $ingredientBtn = $('.ingredient-btn');
	const $recipeBtn = $('.recipe-btn');
	const $commentBtn = $('.comment-btn');

	const $ingredientBox = $('.ingredient-box');
	const $recipeContainer = $('.recipe-container');
	const $readCommentContainer = $('.read-comment-container');


	// 모든 게시물 내용 영역을 숨기는 함수
	function hideAllContents() {
		$('.js-contents').hide();
	}
	
	function clickComment(){
		hideAllContents();
		$readCommentContainer.show();
	}

	// 재료 보기 버튼 클릭 시 재료 내용 영역을 보여주는 이벤트 핸들러 등록
	$ingredientBtn.on('click', function() {
		hideAllContents();
		$ingredientBox.show();
	});

	// 레시피 보기 버튼 클릭 시 레시피 내용 영역을 보여주는 이벤트 핸들러 등록
	$recipeBtn.on('click', function() {
		hideAllContents();
		$recipeContainer.show();
	});

	// 댓글 보기 버튼 클릭 시 댓글 내용 영역을 보여주는 이벤트 핸들러 등록
	$commentBtn.on('click', function() {
		hideAllContents();
		clickComment();
	});
});

let $postingBtn = $('.comment-post-btn');


let postNumber = $postingBtn.data("postnumber");
let $postUserNumber = $(".post-user-number").val();

console.log(postNumber);

commentAjax();


function commentAjax() {
  // Promise 객체를 반환
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/comment/commentListOk.co',
      type: 'get',
      data: { postNumber: postNumber },
      dataType: 'json',
      success: function(data) {
        showComment(data);
        resolve(); // AJAX 요청이 성공하면 resolve()를 호출
      },
      error: function(xhr, status, error) {
        console.log(error);
        reject(error); // AJAX 요청이 실패하면 reject()를 호출
      },
    });
  });
}



function showComment(comments) {
  console.log(comments);
  let text = '';

  comments.forEach(comment => {
    text += `
    <li class="read-comment-box">
      <div class="comment-writer-img-box">
		<a href="/user/youPage.us?userNumber=${comment.userNumber}">
		`;

    if (comment.userProfileImageSystemName == null) {
      text += `
        <img src="https://www.thechooeok.com/common/img/default_profile.png" alt="댓글작성자 프로필 사진" class="comment-writer-profile-img">`;
    } else {
      text += `
        <img src="/upload/${comment.userProfileImageSystemName}" alt="댓글작성자 프로필 사진" class="comment-writer-profile-img">`;
    }

    text += `
		</a>
      </div>
      <div class="comment-content-box">
		<a href="/user/youPage.us?userNumber=${comment.userNumber}">
	        <div class="comment-writer-id">${comment.userNickname}</div>
		</a>
        <div class="read-comment-content">
          ${comment.commentContent}
        </div>
        <div class="read-comment-more">
          <div class="comment-write-time">${comment.commentTime}</div>`;

    if (comment.userNumber == userNumber || $postUserNumber == userNumber) {
      text += `
          <button type="button" class="comment-delete" data-number="${comment.commentNumber}">
            삭제하기
          </button>`;
    }

    text += `
        </div>
      </div>
    </li>`;
  });

  $('.read-comment').html(text);
}



let $comment = $('.comment-input');

//댓글 작성
$('.comment-post-btn').on('click', function() {
	let gapCheck = $('#comment-input').val().trim();
	if (gapCheck === '' || gapCheck.length === 0) {
		return;
	}
  $.ajax({
    url: '/comment/commentWriteOk.co',
    type: 'post',
    data: {
      postNumber: postNumber,
      userNumber: userNumber,
      commentContent: $('#comment-input').val()
    },
    success: function() {
      commentAjax().then(() => {
        // commentAjax 함수가 완료된 후에 실행
        $('#comment-input').val('');

        $('.js-contents').hide();
        $('.read-comment-container').show();
      }).catch((error) => {
        console.log('commentAjax 에러:', error);
      });
    }
  });
});
// 엔터키로 댓글 작성
$("#comment-input").on("keyup", function(event) {
	event.preventDefault();
	let gapCheck = $('#comment-input').val().trim();
if (gapCheck === '' || gapCheck.length === 0) {
		return;
	}
else if (event.which === 13) {
   $.ajax({
    url: '/comment/commentWriteOk.co',
    type: 'post',
    data: {
      postNumber: postNumber,
      userNumber: userNumber,
      commentContent: $('#comment-input').val()
    },
    success: function() {
      commentAjax().then(() => {
        // commentAjax 함수가 완료된 후에 실행
        $('#comment-input').val('');

        $('.js-contents').hide();
        $('.read-comment-container').show();
      }).catch((error) => {
        console.log('commentAjax 에러:', error);
      });
    }
  });
 }
});








//댓글 삭제
$('.read-comment').on('click', '.comment-delete', function(){
   let commentNumber = $(this).data('number');
   
   if (window.confirm('해당 댓글을 삭제하시겠습니까?')){
       $.ajax({
        url : "/comment/commentDeleteOk.co",
        type : "get",
        data : {commentNumber : commentNumber},
        success : function(){
           commentAjax();
        }
     });
   }
   else{
   }
});


//게시물 좋아요
$('.like-box').on('click','.like-btn', function(){
	likeAjax();
});

function likeAjax() {
	$.ajax({
		url: '/postLike/postLikeOk.pl',
		type: 'get',
		data: { userNumber: userNumber, 
					postNumber: postNumber
				},
		success: function(result){
			
			showLike(result);
		} ,
		
		error: (xhr, status, error) => console.log(error),
	});
}

function showLike(result) {
	let results = result.trim().split(",");
	let likeTF = results[0];
	let likeCount = parseInt(results[1]);
	
	console.log(likeTF);
	
		if(likeTF==="true"){
	
			$('.like-btn').html(
			`
			<i class="fa-solid fa-heart like-t js-like-btn"
													style="color: red;"></i>
			`
 			)
		} else if(likeTF==="false"){
			$('.like-btn').html(
			`
			<i class="fa-regular fa-heart like-f js-like-btn"></i>
			`
 			)
		}
		
		$('.like-count-btn').text(likeCount);
		
}

// x버튼(이전화면으로 돌아가기)
$('.close-btn').on('click', function(){
	history.back();
});

//게시물 저장
$('.save-box').on('click','.save-btn', function(){
	saveAjax();
});

function saveAjax() {
	$.ajax({
		url: '/postSave/postSaveOk.ps',
		type: 'get',
		data: { userNumber: userNumber, 
					postNumber: postNumber
				},
		success: function(result){
			
			showSave(result);
		} ,
		
		error: (xhr, status, error) => console.log(error),
	});
}

function showSave(result) {
	let saveTF = result.trim();
	
	console.log(saveTF);
	
		if(saveTF==="true"){
	
			$('.save-btn').html(
			`
			<i class="fa-solid fa-bookmark save-t"></i>
			`
 			)
		} else if(saveTF==="false"){
			$('.save-btn').html(
			`
			<i class="fa-regular fa-bookmark save-f"></i>
			`
 			)
		}
}		
		

// 게시물 이미지 슬라이드
let $readImgs = $('.read-imgs');
let width = 783.963;
let idx = 0;
let length = $('.read-img').length;
	console.log('.read-img');

checkEnd();

$('.next-btn').on('click', function() {
	console.log('next');
	idx++;

	$readImgs.css('left', -width * idx).css('transition', '0.5s');
	checkEnd();
	console.log(idx);
});

$('.prev-btn').on('click', function() {
	console.log('prev');

	idx--;

	$readImgs.css('left', -width * idx).css('transition', '0.5s');
	checkEnd();
	console.log(idx);
});

function checkEnd() {
	console.log(length);
	if (idx <= 0) {
		$('.prev-btn').hide();
	} else {
		$('.prev-btn').show();
	}

	if (idx >=length  - 1) {
		$('.next-btn').hide();
	} else {
		$('.next-btn').show();
	}
}

$('.more-btn').on('click', function(){
		$('.modal').css("display", "flex");
})

$('.modal-cancel-btn').on('click', function(){
		$('.modal').css("display", "none");
})



