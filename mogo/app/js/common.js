$(document).ready(function() {
	$(".burger").click(function() {
		$(this).toggleClass('open');
		$('.navigation ul').toggleClass("show");
		$(".overlay").toggle();
	});
	$(".overlay").click(function() {
		$(this).toggle();
		$(".burger").removeClass("open");
		$(".navigation ul").removeClass("show");
	});
});
