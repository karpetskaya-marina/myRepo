$(document).ready(function() {
	$(".burger").click(function() {
		$(this).toggleClass('open');
		$('.main_menu ul').toggleClass("show");
		$(".overlay").toggle();
	});
});
