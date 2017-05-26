$(document).ready(function(){
  $('#community_slider').slick({
		slidesToShow: 2,
 		slidesToScroll: 2,
		appendArrows: '#community_controls',
		prevArrow: '#prevArrow',
		nextArrow: '#nextArrow',
		responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
	/*$('#design_slider').slick({
		asNavFor: '.phone_displays',
		appendArrows: '.controls',
		prevArrow: '.prevArrow',
		nextArrow: '.nextArrow'
  });*/
	var $status = $('.counter');
	$('#design_slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text('0'+i + '/' + '0'+slick.slideCount);
    });

    $('#design_slider').slick({
			asNavFor: '.phone_displays',
			appendArrows: '.controls',
			prevArrow: '.prevArrow',
			nextArrow: '.nextArrow'
    });
	$('.phone_displays').slick({
		arrows: false
  });
});
