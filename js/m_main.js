$(function(){
    var swiper = new Swiper(".swiper-container.type1", {
        loopAdditionalSlides: 1,
        loop:'true',
        autoplay : { 
            delay : 3000,
            disableOnInteraction : false,
        },
        speed: 1000,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    var swiper = new Swiper(".swiper-container.type1-1", {
        loopAdditionalSlides: 1,
        loop:'true',
        spaceBetween: 15,
        autoplay : { 
            delay : 3000,
            disableOnInteraction : false,
        },
        speed: 1000,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    var swiper = new Swiper('.swiper-container.type3', {
        loopAdditionalSlides: 1,
        slidesPerView: 'auto',
        autoplay : { 
            delay : 3000,
            disableOnInteraction : false,
        },
        speed: 1000,
    });
    var swiper = new Swiper('.swiper-container.type3', {
        loopAdditionalSlides: 1,
        slidesPerView: 'auto',
        loop:true,
        autoplay : { 
            delay : 3000,
            disableOnInteraction : false,
        },
        speed: 1000,
    });

    var mainVideo07 = $('.mov_slide'),
        mainSwiper07 = new Swiper('.mov_slide', {
            slidesPerView: 'auto',
            speed: 1000,
            freeMode: true,
            observer: true,
            observeParents: true,
            freeModeMomentumBounce: false
        });

    $('.mov_slide div a').on('click', function () {    
        $(this).parents('.swiper-slide').addClass('active');
        $(this).parents('.swiper-slide').siblings().removeClass('active');

        $('#video_frame').html('');
        $('.sc_mov .video_desc p').html('');

        var vod_src = '';
        var vod_txt = '';
        video_url = $(this).find("img").attr('title');
        vod_src = '<iframe src="https://www.youtube.com/embed/'+video_url+'?&mute=1&vq=hd1080&rel=0" frameborder="0" allowfullscreen></iframe>';

        vod_txt = $(this).find("img").attr('alt');

        $('#video_frame').html(vod_src);
        $('.sc_mov .video_desc p').html(vod_txt);    
    });

    $('.mov_slide div a').eq(0).trigger("click");
})
