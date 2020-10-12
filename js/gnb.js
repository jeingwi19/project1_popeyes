$(document).ready(function () {
	//ie 스킵 네비게이션 작동
	$('#skip a').on('click', function () {
		var target = $(this).attr('href');
		console.log(target); //#content

		//$('#content')
		$(target).attr('tabIndex', -1).focus();

		return false;
	});

	var $header = $('#header');
	var $gnb = $('#gnb > ul');
	
	//1) depth2 ul 숨기기
	$gnb.find('li ul').hide();
	
	//2) 현재페이지 활성화를 위해 li.on 넣기위해 변수 선언
	var dep1 = $('body').data('dep-one') - 1;       
	var dep2 = $('body').data('dep-two') - 1;       
	console.log("depth1? "+dep1+" , depth2? "+dep2);
	
	//3) depth1 a - mouseenter focus
	$gnb.find('> li > a').on('mouseenter focus', function () {
		//초기화
		$gnb.find('> li.on').removeClass('on').children('ul').hide();
		$header.removeClass('active');

		//활성화
		$(this).parent().has('ul').closest($header).addClass('active');	//100% 너비의 파랑바 생성을 위한 클래스명 추가
		$(this).next().show().parent().addClass('on');
	});
	
	//4) $gnb에서 마우스가 벗어나면 mouseleave => 활성화 상태를 초기화면으로 되돌림
	$gnb.on('mouseleave', function () {
		//마우스가 떠나기전 마지막 활성화상태를 초기화
		$header.removeClass('active');
		$gnb.find('> li.on').removeClass('on').children('ul').hide();
		//body id="nav_3_1"을 통해 선언한 dep1과 dep2 변수에 맞는 li.on 추가
		if (dep1 >= 0) $gnb.children().eq(dep1).addClass('on').find('ul li').eq(dep2).addClass('on');
	});

	//5) $gnb에서 가장 첫번째와 마지막 a에서 blur 된 경우 - 초기화면으로 되돌리기(조건을 만족하는 경우만)
	$gnb.find('a:first, a:last').on('blur', function () {
		setTimeout(function () {
			//#gnb안에 있는 a태그가 포커스를 가지지 않는 경우만
			if ( !$gnb.find('a').is(':focus') ) $gnb.trigger('mouseleave');
		}, 10);
	});
		
	//6) 페이지 로딩후 보여질 화면 => li.on 넣어서 스타일이 적용된 화면
	if (dep1 >= 0) $gnb.trigger('mouseleave');

	

});