$(document).ready(function() {
	//1) 로딩이 완료된후 초기화면 설정
	var tgIdx = $('#menuTab').data('index');
	var tg1 = '#menuTab #tab' + tgIdx;
	var tg2 = '#menuTab #tabpanel' + tgIdx;
	$(tg1).addClass('active').attr({'tabIndex': 0, 'aria-selected': true}).siblings().attr('aria-selected', false);
	$(tg2).addClass('active').attr({'tabIndex': 0, 'aria-hidden': false}).siblings('#tabpanel').attr('aria-hidden', true);

  /* 2) 탭버튼에서 키보드를 누르는 이벤트(keydown) - 키보드 제어*/
  $('.tab').on('keydown', function (e) {
    var key = e.keyCode;
    console.log(key); //왼쪽방향키 37 , 오른쪽 방향키 39, 스페이스바 32 , 엔터 13
    switch (key) {
      case 37:    //왼쪽 방향키
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
        else $(this).prev().attr('tabIndex', 0).focus();
        break;
      case 39:  //오른쪽 방향키
        $(this) .attr('tabIndex', -1);
        if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
        else $(this).next().attr('tabIndex', 0).focus();
        break;
      case 36:  //HOME 키는 가장 처음으로
        e.preventDefault();
        $(this).siblings('.first').attr('tabIndex', 0).focus();
        break;
      case 35:  //END 키는 가장 마지막으로
        e.preventDefault();
        $(this).siblings('.last').attr('tabIndex', 0).focus();
        break;
      case 32:  //스페이스바
      case 13:  //엔터
        var $tg = $(this);
        activeOn($tg);
        break;
    }
  });

  //3) 탭 클릭 이벤트
  $('.tab').on('click', function () {
    var $tg = $(this);
    activeOn($tg);
  });

  function activeOn($target) {
    $target.addClass('active').attr({'aria-selected': true, tabIndex: 0}).siblings().removeClass('active').attr({'aria-selected': false, tabIndex: -1});
    $('#' + $target.attr('aria-controls')).addClass('active').attr({'aria-hidden': false, tabIndex: 0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden': true, tabIndex: -1});
  }

  /* 정렬하기 */
	var $fliter_box = $("#filter .fliter_box"); //.fliter_box는 변수 $fliter_box라고 명한다 중요
	var $btn = $fliter_box.children("a"); //depth1 a:fliter_box Site라는 텍스트가 담긴 링크를 찾아라

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
			//console.log(tgTxt);

			$btn.text(tgTxt).focus().next().stop().hide();
		});
	});




	
	
});

$(document).ready(function() {
	//키보드 제어 접근성 추가
	$('.card').on({ //.card를 찾아서 foucusin해라
	focusin: function () {
		$(this).addClass('flip');//focus가 되었을땐 .flip을 추가해주어라
	},
	focusout: function () {
		$(this).removeClass('flip');//focus가 out 되었을땐 .flip을 해제해라.
	}
	});
});