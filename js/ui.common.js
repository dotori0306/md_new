$(document).ready(function(){
	inputFn();
	writeOn();
	sideMenu();
	subFn();
	accordionFn();
});

function sideMenu(){//side menu
	var gnbSwiper = new Swiper('#sidemenu_wrapper .swiper-container', {//gnb scroll
		direction: 'vertical',
		slidesPerView: 'auto',
		mousewheelControl: true,
		freeMode: true
	});

	$('.btn_sidemenu').on('click', function(e){//sidemenu open
		e.preventDefault();
		$('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
		TweenLite.to($('#sidemenu_wrapper'),0.7,{ease:Power4.easeOut,left:0,onComplete:function(){
				gnbSwiper.onResize();
			}})
		$('.topBtn').hide();
		//$('#gnb .menu3').addClass('active').siblings('li').removeClass('active');
	});

	$('.btn_sidemenu_close').on('click', function(){//sidemenu close
		gnbClose();
		$('.topBtn').show();
	})

	$('#gnb .dp1').on('click', function (e) {//sidemenu 1depth click
		e.preventDefault();
		$(this).parent('li').addClass('active').siblings('li').removeClass('active');
	});

	// ------------- 2022.01.18 수정
	$('#gnb .dp2 li.v2 > a').on('click', function(){//sidemenu 2depth click
		//e.preventDefault();
		var tgH = $(this).next('.dp3').find('ul').innerHeight();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			gnb_dp3_Resize(0, $(this))
		} else {
			$(this).addClass('active');
			gnb_dp3_Resize(tgH, $(this));
			$('#gnb .dp2 li.v2 > a').not($(this)).removeClass('active'); // 2022.01.25
			$('#gnb .dp2 li.v2 > a').not($(this)).next('.dp3').animate({'height': 0}, 400, 'easeOutCubic'); // 2022.01.25
		}
		return false;
	});

	function gnb_dp3_Resize(h,t){
		TweenLite.to(t.next('.dp3'),0.5,{ease:Power4.easeOut,height:h,onComplete:function(){
			gnbSwiper.update();
		}})
	}
	// 2022.01.18 수정 -------------

	function gnbClose(){
		$('body').removeClass('fixed').off('touchmove');
		$('.btn_sidemenu_close').removeClass('open');
		TweenLite.to($('#sidemenu_wrapper'),0.7,{ease:Power4.easeOut,left:'100%'});
	}
}

function inputFn(){
	$(".form_text input").on("focus",function(){
		$(this).next('label').hide();
	}).trigger('propertychange');
	$(".form_text input").on("blur",function(){
		if($(this).val().length<1){
			$(this).next('label').show();
		}
	});
	$(".form_text input").each(function(){
		if (!$(this).val().length == 0){
			$(this).next('label').hide();
		}
	});
	$('.form_text input').on('propertychange change keyup paste input', function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.siblings('.btn_del').toggleClass('hidden', !visible);
	});
	$('.form_text input').on('blur', function() {
		$(this).siblings('.btn_del').addClass('hidden');
	});

	$('.btn_del').on('mousedown', function() {
		return false;
	}).on('click', function() {
		$(this).siblings('input').val('')
			.trigger('propertychange').focus();
	});
}

function writeOn() {//input focus
	var $input = $('.form_text input[type="text"], .form_text input[type="password"], .form_text input[type="tel"], input[type="email"]');
	$input.on({
		focusin: function() {
			//console.log('e');
			var $this = $(this);
			$this.closest('.form_text').css({
				'border-color': '#1a1a1a',
				'z-index': '2'
			});
		},
		focusout: function() {
			var $this = $(this);
			$this.closest('.form_text').css({
				'border-color': '#e0e0e0',
				'z-index': '1'
			});
		}
	});
}


// 모바일일 경우 css 수정
// overflow: "hidden"->""
$(document).ready(function() {
var filter = "win16|win32|win64|mac|macintel";
if (navigator.platform) {
// mobile
if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
	$('nav').css("overflow", "");
}
}
});


// nav 마우스/터치 스크롤 기능
var dragFlag = false;
var x, y, pre_x, pre_y;
	$(function() {
		$('nav').mousedown(function(e) {
		dragFlag = true;
		var obj = $(this);
		console.log("obj:" + obj);
		x = obj.scrollLeft();
		y = obj.scrollTop();
		pre_x = e.screenX;
		pre_y = e.screenY;
		$(this).css("cursor", "pointer");
	});

	$('nav').mousemove(function(e) {
		if (dragFlag) {
			var obj = $(this);
			obj.scrollLeft(x - e.screenX + pre_x);
			obj.scrollTop(y - e.screenY + pre_y);
			return false;
		}
	});

	$('nav').mouseup(function() {
		dragFlag = false;
		$(this).css("cursor", "default");
	});

});

function mainTabFn() {
	var mainSwiper0401 = new Swiper('.main .main02 .cont01 .swiper-container', {
		slidesPerView: 'auto',
		speed: 1000,
		spaceBetween: 15,
		freeMode: true,
		observer: true,
		observeParents: true,
		freeModeMomentumBounce: false
	});
	var mainSwiper0501 = new Swiper('.main .main02 .cont03 .swiper-container', {
		slidesPerView: 'auto',
		speed: 1000,
		autoplay: false,
		loop : true,
		pagination: '.main02 .cont03 .swiper-pagination',
		observer: true,
		observeParents: true,
		paginationClickable:true
	});
}

function subFn(){
	/*
	$(".btns_wrapper .btn_all").on('click', function(e){
		e.preventDefault();
		var toggle_con = $(this).attr("href"),
			toggle_btn = $(this);

		if($(this).hasClass("on") === false){
			$(toggle_btn).addClass("on");
			$(toggle_con).show();
		}else if($(this).hasClass("on") === true){
			$(toggle_btn).removeClass("on");
			$(toggle_con).hide();
		}
	});
	*/
	$(window).load(function(){
		if($('.btns_bottom').hasClass("btn_fixed") === true){
			var ttibnrTop = $('#footer').offset().top;
			var stopSpot = ttibnrTop - $(window).innerHeight() ;
			$(window).scroll(function(){
				if( $(window).scrollTop() >=  stopSpot ){
					$('.btns_bottom').removeClass('btn_fixed').show();
				}else{
					$('.btns_bottom').addClass('btn_fixed').show();
				}
			});
		}
	});

	// 탭메뉴
	$('.js_tab li a').on('click', function (e) {
		var targetId = $(this).attr("href");
		e.preventDefault();
		$(this).parent('li').siblings().removeClass('active');
		$(this).parent('li').addClass('active');
		$(targetId).addClass('on').siblings().removeClass('on');
	});

	// 강의리스트 toggle
	$(".lecture_list .btn_toggle").on('click', function(e){
		e.preventDefault();
		var toggle_btn = $(this);

		if($(this).hasClass("on") === false){
			$(toggle_btn).addClass("on");
			$(toggle_btn).siblings('.cont_toggle').show();
		}else if($(this).hasClass("on") === true){
			$(toggle_btn).removeClass("on");
			$(toggle_btn).siblings('.cont_toggle').hide();
		}
	});

	// 교재상세 toggle
	$(".book_view_area .btn_more").on('click', function(e){
		e.preventDefault();
		var toggle_btn = $(this);

		if($(this).hasClass("on") === false){
			$(toggle_btn).addClass("on");
			$(toggle_btn).siblings('.cont_detail').show();
			$(toggle_btn).children().text("접기");
		}else if($(this).hasClass("on") === true){
			$(toggle_btn).removeClass("on");
			$(toggle_btn).siblings('.cont_detail').hide();
			$(toggle_btn).children().text("더보기");
		}
	});
}

function layerPop_open_m(el){
	var temp = $('#' + el);
	if($("body").hasClass('fixed')){
		$(".popup-layer").removeClass('open');
		temp.addClass('open').focus(); //.attr("tabindex", "0")
	}else{
		temp.addClass('open').focus(); //.attr("tabindex", "0")

		$("body").addClass('fixed').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
		});
	}
}

function layerPop_close_m(el){
	var temp = $('#' + el);
	temp.removeClass('open');
	self.focus();
	$("body").removeClass('fixed').off('scroll touchmove mousewheel');
}

function accordionFn() {
	var $faq = $(".accordion_list li"),
		$faq_desc = $faq.find('.answer'),
		$faq_tit = $(".accordion_list li a"),
		speed = 400;

	$faq_tit.on('click', function () {
		var currentTit = $(this).parent('li');

		if($(this).hasClass('on')){
			$(this).removeClass('on').next().slideUp().closest('li').removeClass('active');
		} else {
			$(this).addClass('on').next().slideDown().closest('li').addClass('active').siblings('li').removeClass('active').find('a').removeClass('on').next().slideUp();
		};
	});
}

function mypageTabFn(){
	var mypageListSwiper = new Swiper('.mypage_lecture_list', {
		slidesPerView: 'auto',
		speed: 1000,
		spaceBetween: 15,
		freeMode: true,
		freeModeMomentumBounce: false
	});
	mypageListSwiper.slideTo($('.mypage_lecture_list').find('.active').index(), 0);
}
// 인터넷 강좌 서브메인 배너
function lectureSlide(){
	var campus_slide = new Swiper('.lecture_slide', {
		effect: 'coverflow',
		speed: 800,
		autoplay: 3000,
		grabCursor: true,
		centeredSlides: true,
		loop: true,
		slidesPerView: 'auto',
		coverflow: {
			rotate: 0,
			stretch: 35,
			depth: 150,
			modifier: 1,
			slideShadows: false //true
		},
		pagination: '.lecture_slide .swiper-pagination',
		paginationClickable:true,
		spaceBetween:40
	});

	// 인터넷 강좌 서브메인 toggle
	$(".lecture_main .search_btn").on('click', function(e){
		e.preventDefault();
		var toggle_btn = $(this);

		if($(this).hasClass("on") === false){
			$(toggle_btn).addClass("on");
			$(toggle_btn).siblings('.tab_wrap_type2').show();
		}else if($(this).hasClass("on") === true){
			$(toggle_btn).removeClass("on");
			$(toggle_btn).siblings('.tab_wrap_type2').hide();
		}
	});
}

// 직영학원 서브메인 배너
function academyMainFn(){//main swipe
	var swiper = new Swiper('.academy_main_slide', {
		effect: 'coverflow',
		speed: 300,
		grabCursor: true,
		centeredSlides: true,
		loop: true,
		slidesPerView: 'auto',
		coverflow: {
			rotate: 0,
			stretch: 15,
			depth: 50,
			modifier: 1,
			slideShadows: false //true
		},
		paginationClickable:true,
		spaceBetween:40,
		pagination: '.academy_main_slide .swiper-pagination',
		paginationType: 'fraction',
		nextButton: '.academy_main_slide .swiper-button-next',
		prevButton: '.academy_main_slide .swiper-button-prev'
	});
}

// 교수홈 : 개설강좌 배너
function profSlide(){
	var profSwiper = new Swiper('.prof_lecture .bnr_wrap .swiper-container', {
		slidesPerView: 'auto',
		speed: 1000,
		autoplay: 4000,
		loop : true,
		pagination: '.bnr_wrap .swiper-pagination',
		paginationClickable:true
	});
}

// 고객센터 서브메인 배너
function customerMainFn(){
	var customerManiSwiper = new Swiper('.faq_slide', {
		slidesPerView: 'auto',
		speed: 1000,
		spaceBetween: 15,
		freeMode: true,
		freeModeMomentumBounce: false
	});
}

// 교재 메인
function bookMainFn(){
	var bookSwiper01 = new Swiper('.book_main .book_main_bnr .swiper-container', {
		slidesPerView: 'auto',
		speed: 1000,
		autoplay: 3000,
		disableOnInteraction: false,
		loop : true,
		pagination: '.book_main_bnr .swiper-pagination',
		paginationType: 'fraction',
		nextButton: '.book_main_bnr .swiper-button-next',
		prevButton: '.book_main_bnr .swiper-button-prev'
	});
	var bookSwiper02 = new Swiper('.book_main .book_main01 .swiper-container', {
		slidesPerView: 'auto',
		speed: 1000,
		spaceBetween: 20,
		freeMode: true,
		freeModeMomentumBounce: false
	});
}