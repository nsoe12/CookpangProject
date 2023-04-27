<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CookpangPayment</title>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!--로고글씨체-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital@1&display=swap"
	rel="stylesheet">
<!--글씨체 여기까지3줄-->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/assets/css/payment.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/assets/js/payment.js">
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/all.min.css">

<script>
	window.onload = function() {
		document
				.getElementById("address_kakao")
				.addEventListener(
						"click",
						function() { //주소입력칸을 클릭하면
							//카카오 지도 발생
							new daum.Postcode(
									{
										oncomplete : function(data) { //선택시 입력값 세팅
											document
													.getElementById("address_kakao").value = data.address; // 주소 넣기
											document
													.querySelector(
															"input[name=address_detail]")
													.focus(); //상세입력 포커싱
										}
									}).open();
						});
	}
</script>




</head>
<body>
	<div class="Payment-main">
		<div class="Payment-body">
			<div class="Payment-bodytools">
				<div class="Payment-body-header">
					<div class="pay-logo">
						<a href="#">Payment</a>
						<h3>결제하기</h3>
					</div>
				</div>


				<div class="Payment-body-main">
					<!--아코디언메뉴-->
					<form
						action="${pageContext.request.contextPath}/order/orderListOk.or?orderNumber=${cost.getOrderNumber()}"
						method="post">
						<!--맨마지막 버튼 이후에 닫기있음-->
						<div class="que">
							<span>주문 고객</span>
						</div>
						<div class="anw">
							<span> <label for="anw1">
									<h3>주문 고객 이름</h3> <input id="anw1-1" type="text"
									name="userName" value="${order.getUserName()}">
									<h3>휴대전화 번호</h3> <input id="anw1-2" type="text"
									name="userPhoneNumber" value="${order.getUserPhoneNumber()}">
									<h3>(필수)이메일 주소</h3> <input id="anw1-3" type="text"
									name="userEmail" value="${order.getUserEmail()}">
							</label>
							</span>
						</div>

						<div class="que2">
							<span>배송지</span>
						</div>
						<div class="anw2">
							<span>
								<h3>받는분 이름</h3> <input id="anw2-1" type="text"
								name="orderRecipient">
								<h3>주소</h3> <input type="text" class="anw2-2" id="address_kakao"
								name="address" placeholder="주소 찾기" readonly />
								<h3>상세 주소</h3> <input id="anw2-3" type="text"
								placeholder="상세주소를 입력해 주세요." name="addressDetail" />
								<h3>(선택)배송 메세지</h3> <input id="anw2-4" type="text"
								placeholder="배송메세지를 입력해 주세요" name="orderMessage" />
							</span>
						</div>
						<!--여기까지 배송지입력-->

						<div class="pmt">
							<span>주문상품</span> <img src="#" alt="">
						</div>

						<div class="amt">
							<div class="checkoutProductMainSection">

								<c:forEach var="test" items="${test}" varStatus="status">
									<span>
										<div class="checkoutProductSection" style="display: flex;">


											<ul class="paymentLists">
												<li class="CheckoutProductsSectionstyle"><span>
														<img src="/upload/${test.getIngredientImageSystemName()}"
														alt="#"> <a class="productName" href="#"> </a>
												</span> 
												</li>
												
												<div class="arrangement">
													<li>
														<c:out value="${test.getIngredientName()}" /> 
														<c:out value="${test.getOrderItemQuantity()}" /> 개
													</li>
													<li class="ingredient-price">
														<c:out value="${test.getOrderItemQuantity()*test.getIngredientPrice()}" /> 원
													</li>
												</div>
												
											</ul>
										</div>
									</span>
								</c:forEach>
							</div>
						</div>

						<!--여기까지 제품목록-->
				
				</div>
				<!--바디툴-->
				<div class="Payment-body-footer">
					<div class="amount">
						<p>결제 금액</p>
						<strong style="color: red;">
							${cost.getOrderTotalCost()+3000} 원 </strong> <input type="hidden"
							name="paymentAmount" value="${cost.getOrderTotalCost()+3000}" />
					</div>


					<div class="amount-tag">
						<p>총 상품금액</p>
						<p style="text-align: end;">${cost.getOrderTotalCost()} 원</p>
						<p>총 배송비</p>
						<p style="text-align: end;">3000원</p>
						<!-- <p>할인금액</p>
						<p style="text-align: end;">0원</p> -->
					</div>
					<!--여기까지 결제금액-->

					<div class="pay-method">
						<p>결제 수단</p>
						<span class="pay-mtd">신용카드</span>
					</div>


					<div class="pay-method-radio-section">
						<ul class="pay-radio">

							<li><input type="radio" id="card" name="paymentMethod"
								value="신용카드"> <label for="card"> <span>신용카드</span>
							</label></li>

							<li><input type="radio" id="phone" name="paymentMethod"
								value="휴대폰"> <label for="phone"> <span>휴대폰</span>
							</label></li>


							<li><input type="radio" id="bank" name="paymentMethod"
								value="무통장 입금"> <label for="bank"> <span>무통장
										입금</span>
							</label></li>

							<li><input type="radio" id="payco" name="paymentMethod"
								value="payco"> <label for="payco"> <span>payco</span>
							</label></li>

							<li><input type="radio" id="naverpay" name="paymentMethod"
								value="네이버페이"> <label for="naverpay"> <span>네이버페이</span>
							</label></li>

							<li><input type="radio" id="kakaopay" name="paymentMethod"
								value="카카오페이"> <label for="kakaopay"> <span>카카오페이</span>
							</label></li>
						</ul>
					</div>
					<!----------여기까지 결제수단---------->
					<div class="pay-last-button">
						<button type="submit" class="pay-button-style">결제하기</button>
					</div>

					</form>
					<!--요기 닫기-->


				</div>
			</div>
		</div>
	</div>
	</div>
	</div>


	<script src="https://code.jquery.com/jquery-3.6.3.js"
		integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM="
		crossorigin="anonymous"></script>
	<script src="${pageContext.request.contextPath}/assets/js/payment.js"></script>
</body>





</html>