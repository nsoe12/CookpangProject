/**
 * 
 */

// 카테고리 선택시(체크박스) 스타일변경으로 표시
$(document).ready(function() {
	$('.category').on('click', function() {
		if ($(this).is(':checked')) {
			$(this)
				.closest('.category-list')
				.css('background-color', 'rgb(255 143 0 / 57%)');
			$(this)
				.closest('.category-list')
				.css('color', 'white');
				$(this)
				.closest('.category-list')
				.css('border', '0.2px solid white');
		} else {
			$(this)
				.closest('.category-list')
				.css('background-color', 'transparent');
			$(this)
				.closest('.category-list')
				.css('color', 'rgba(145, 88, 40, 0.79)');
				$(this)
				.closest('.category-list')
				.css('border', '0.2px solid #acacac66');
		}
	});
});


let $tmpInput = $('#file-input');

//사진 미리보기 추가

let $fileList = $('.preview-list');
let $cnt = $('.cnt');

console.log($tmpInput);

$tmpInput.on('change', function() {

	$('.image-upload-wrap').css("display", "none");
	$('.image-preview-wrap').css("display", "flex");

	
	let files = this.files;
	console.log(files);

	splitFile(files);
	
	//파일을 변경하면 원래 선택된 파일은 미리보기를 제거한다.
	$fileList.html('');


	for (let i = 0; i < files.length; i++) {
		let src = URL.createObjectURL(files[i]);
		//console.log('ddddddd');
		//console.log(src);

		$fileList.append(`
			<li>
				<img src="${src}" alt="미리보기 이미지" class="preview-image">
					<div class="btn-box">
						<button type='button' class='img-cancel-btn' data-name='${files[i].name}'>
							X
						</button>
					</div>
			</li>

		`);
	}
	length = $('.preview-image').length;
	checkEnd();
	
});

// 파일 분리해서 넣기



function splitFile(files) {
	
	console.log("=====================");
	console.log(files);
	let $input = $('.input');

	for (let i = 0; i < 10; i++) {
		if (i >= files.length) {
			let dt = new DataTransfer();

			$input[i].files = dt.files;
		} else {
			let dt = new DataTransfer();
			dt.items.add(files[i]);

			$input[i].files = dt.files;
		}

		console.log($input[i].files);
	}
};

// 삭제 버튼
$('.preview-list').on('click', ".img-cancel-btn", function() {
		let files = $tmpInput[0].files
		console.log("삭제!");

		$(this).parent().parent().remove();

		let fileName = $(this).data('name');
		let dt = new DataTransfer();


		for (let i = 0; i < files.length; i++) {
			if (files[i].name !== fileName) {
				dt.items.add(files[i]);
			}
		}

		files = dt.files;
		$tmpInput[0].files = files;
		
		length = $('.preview-image').length;
		
		if(idx != 0){
			idx--;
		}
		
		if(length == 0){
			$('.image-upload-wrap').css("display", "flex");
			$('.image-preview-wrap').css("display", "none");
		}
		
		if(idx == length-1){
			$previewList.css('left', -width * idx).css('transition', 'none');
		}
		console.log(`idx : ${idx}`)
		console.log(`length : ${length}`)
		checkEnd();
		splitFile(files);
	});





let $previewList = $('.preview-list');
let width = 720;
let idx = 0;
let length = 0;

checkEnd();

$('.next-btn').on('click', function() {
	console.log('next');
	idx++;

	$previewList.css('left', -width * idx).css('transition', '0.5s');
	checkEnd();
});

$('.prev-btn').on('click', function() {
	console.log('prev');

	idx--;

	$previewList.css('left', -width * idx).css('transition', '0.5s');
	checkEnd();
});



function checkEnd() {
	
	if(idx <= 0){
		$('.prev-btn').hide();
	}else {
		$('.prev-btn').show();
	}
	
	if(idx >= length - 1){
		$('.next-btn').hide();
	}else {
		$('.next-btn').show();
	}
}


// 체크박스가 선택되어있는지 여부 확인 메소드
function noneChecked() {
	let noneChecked = true;
	$('.category').each(function() {
		if ($(this).is(':checked')) {
			noneChecked = false;
			return false;
		}
	});

	return noneChecked;
}

//============================================
// 재료추가
$(document).ready(function() {
	function toggleMinusButtonVisibility() {
		$('.ingredient-element .element-minus').toggle(
			$('.ingredient-element').length > 1
		);
	}

	toggleMinusButtonVisibility();

	// 요소 플러스 버튼에 대한 이벤트 위임
	$('.ingredient-wrap').on('click', '.element-plus', function() {
		let ingredientElement = '<div class="ingredient-element">';
		ingredientElement += $(this).closest('.ingredient-element').html();
		ingredientElement += '</div>';

		console.log($(this))

		$(this)
			.closest('.ingredient-element')
			.after(ingredientElement);

		toggleMinusButtonVisibility();
	});

	// 재료 묶음 추가 요소 삭제 버튼에 대한 이벤트 위임
	$('.ingredient-wrap').on('click', '.element-minus', function() {
		$(this)
			.closest('.ingredient-element')
			.remove();
		toggleMinusButtonVisibility();
	});
});

//============================================
$(document).ready(function() {
	updateItemMinusVisibility();

	// 이벤트 위임을 사용하여 새로운 재료 항목 추가
	$('.item-edit-buttons').on('click', '.item-plus', function() {
		const newItem = $('.ingredient-item')
			.first()
			.clone();
		newItem
			.find('input[type="text"]')
			.val(''); // Clear input values
		$('.ingredient-items-container').append(newItem);
		updateItemMinusVisibility();
	});

	// 이벤트 위임을 사용하여 재료 항목 제거
	$('.item-edit-buttons').on('click', '.item-minus', function() {
		$('.ingredient-item')
			.last()
			.remove();
		updateItemMinusVisibility();
	});

	function updateItemMinusVisibility() {
		const itemCount = $('.ingredient-item').length;
		if (itemCount === 1) {
			$('.item-minus').hide();
		} else {
			$('.item-minus').show();
		}
	}
});

//===========================================





//===========================================

//ingredient category에 맞는 재료 뽑기
$(document).on('change', '#select', function() {
	let ingredientCategoryNumber = $(this).val();
	let target = this;

	console.log(ingredientCategoryNumber);

	$.ajax({
		url: '/post/postCategory.po',
		type: 'GET',
		data: {
			ingredientCategoryNumber: ingredientCategoryNumber
		},
		dataType: 'json',
		success: function(result) {
			console.log(result);


			let text = `<select name="ingredientNumber" id="" class="select-ingredient">
						<option value="-1" selected>선택하기</option>`;

			result.forEach(cate => {
				/*	text +=  `<select name="ingredientNumber" id="" class="select-ingredient">
							<option value="-1" selected>선택하기</option>`;*/


				text += `<option value="${cate.ingredientNumber}">
									${cate.ingredientName}
								</option>`;
			});
			text += `</select>`;


			//$('.ingredient-name-li').html(text);
			$(target).closest('ul').find('.ingredient-name-li').html(text);
		}
	});
});


//-------뒤로가기-------//

$('.cancel-btn i').on('click', function(){
   history.back();
});
