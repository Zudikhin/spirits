$(document).ready(function() {
    "use strict";

    // fullpage customization
    $('#fullpage').fullpage({
        sectionSelector: '.vertical-scrolling',
        scrollOverflow: true,
        beforeLeave: function(origin, destination, direction, trigger){
            console.log(origin.index);
            console.log(direction);
            if(origin.index == 0 && direction =='down'){
                $(".header").addClass("fixed");
                $('.video_slider').slick('slickPlay');
            } else if(origin.index == 1 && direction == 'up'){
                $(".header").removeClass("fixed");
            } else if(origin.index == 3 && direction == 'up'){
                $('.video_slider').slick('slickPlay');
            } else {
                $('.video_slider').slick('slickPause');
            }
        },
    }); 

    $(".main").addClass("animation");

    $('.video_slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
        autoplay: true,
        autoplaySpeed: 2400,
		speed: 500,
        pauseOnHover: false,
        fade: true,
        arrows: false
	});

    $('.video_slider').slick('slickPause');

    if ($(window).width() > 1199) {
        
        const slider = document.querySelector('.podcast_items');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });
        
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            beginMomentumTracking();
        });
        
        
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });
        
        // Momentum 
        
        var velX = 0;
        var momentumID;
        
        slider.addEventListener('wheel', (e) => {
            cancelMomentumTracking();
        });  
        
        function beginMomentumTracking(){
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }
        function cancelMomentumTracking(){
            cancelAnimationFrame(momentumID);
        }
        function momentumLoop(){
            slider.scrollLeft += velX;
            velX *= 0.95; 
            if (Math.abs(velX) > 0.5){
            momentumID = requestAnimationFrame(momentumLoop);
            }
        }
    }
});