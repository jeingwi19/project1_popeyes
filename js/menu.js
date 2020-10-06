	/* 패밀리사이트 */
	var $fliter_box = $("#filter .fliter_box"); //.fliter_box는 변수 $fliter_box라고 명한다 중요
	var $btn = $fliter_box.find("button").first(); //depth1 a:fliter_box Site라는 텍스트가 담긴 링크 / .fliter_box의 첫번째 자식의 a태그를 찾아라
	var $btnSubmit = $fliter_box.find("button").last(); //확인(새창열기 버튼)
	var tgHref;

	//1-1) $btn을 클릭해서 ul 태그 열어주기
	$btn.on("click", function (e) {
		e.preventDefault();

		$(this).next().stop().show().parent().addClass('on');

		//1-2) ul 태그에서 마우스가 떠나면 닫아주기
		$(this).next().on("mouseleave", function () {
			$(this).stop().hide().parent().removeClass('on');
		});

		//1-3) focus가 fliter_box 내부에 있지 않을 경우 닫아주기
		$fliter_box.find("button:first , button:last").on("blur", function () {
			setTimeout(function () {
				if (!$fliter_box.find("button").is(":focus")) $fliter_box.find(">ul").stop().hide();
			}, 1000);
		});

		//2) ul li button를 클릭하면 자신의 텍스트와 href를 변수에 담아 $btn에 글자를 강제로 바꾼다=> ul 태그 닫아주기
		$fliter_box.find(">ul>li>button").on("click", function (e) {
			e.preventDefault();
			var tgTxt = $(this).text();
			tgHref = $(this).attr("href");
			//console.log(tgTxt, tgHref);

			$btn.text(tgTxt).focus().next().stop().show();
		});
	});

	//follow quick menu
	// $(window).scroll(function () {
	// 	var scrollTop = $(document).scrollTop();
	// 	if (scrollTop < 900) {
	// 		scrollTop = 720;
	// 	}
	// 	$("#followquick").stop();
	// 	$("#followquick").animate({
	// 		"top": scrollTop
	// 	});
	// });