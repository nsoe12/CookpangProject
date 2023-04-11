/**
 * 
 */

$(document).ready(function () {
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

  // 재료 보기 버튼 클릭 시 재료 내용 영역을 보여주는 이벤트 핸들러 등록
  $ingredientBtn.on('click', function () {
    hideAllContents();
    $ingredientBox.show();
  });

  // 레시피 보기 버튼 클릭 시 레시피 내용 영역을 보여주는 이벤트 핸들러 등록
  $recipeBtn.on('click', function () {
    hideAllContents();
    $recipeContainer.show();
  });

  // 댓글 보기 버튼 클릭 시 댓글 내용 영역을 보여주는 이벤트 핸들러 등록
  $commentBtn.on('click', function () {
    hideAllContents();
    $readCommentContainer.show();
  });
});

let $postingBtn = $('.comment-post-btn');


let postNumber = $postingBtn.data("postnumber");


commentAjax();

function commentAjax(){
   $.ajax({
      url : '/comment/commentListOk.co',
      type : 'get',
      data : {postNumber : postNumber},
      dataType : 'json',
      success : showComment,
	  error: (xhr, status, error) => console.log(error),
   });
}

function showComment(comments) {
	let text= '';

  comments.forEach(comment => {
    text +=`
    	<li class="read-comment-box">
											<div class="comment-writer-img-box">
												
												<!-- 임시 댓글 프로필사진 -->
														<img src="https://www.thechooeok.com/common/img/default_profile.png"
															alt="댓글작성자 프로필 사진" class="comment-writer-profile-img">
													
											</div>
											<div class="comment-content-box">
												<!-- 임시 댓글작성자 아이디 -->
												<div class="comment-writer-id">${comment.userId}</div>
												<div class="read-comment-content">
													<!-- 임시 댓글 내용 -->
													${comment.commentContent}
													
												</div>
												<div class="read-comment-more">
													<div class="comment-write-time">${comment.commentTime}</div>
													<!--댓글번호  -->
													<button type="button" class="comment-delete">삭제하기
													</button>
												</div>
											</div>
										</li>

    `
	$('.read-comment').html(text);
  });



}


















