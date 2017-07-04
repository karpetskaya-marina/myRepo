$(document).ready(function() {
	$(".burger").click(function() {
		$(this).toggleClass('open');
		$('#mobile_menu').toggleClass("show");
		$(".overlay").toggle();
	});
	$('.overlay, #mobile_menu li').click(function() {
		$('.overlay').toggle();
		$('.burger').toggleClass('open');
		$('#mobile_menu').toggleClass("show");
	});
	$("#mobile_menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
