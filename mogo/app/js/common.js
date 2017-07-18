//mobile menu

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
$("#mobile_menu").on("click", "a", function(event) {
  event.preventDefault();
  var id = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').stop().animate({
    scrollTop: top
  }, 1500);
});

//scrollbar
$(".accordion_item_content").mCustomScrollbar();

//accordion
$('.accordion_item_header').on('click', function() {
  var content = $(this).next()
  var parent = $(this).parent()
  if (parent.hasClass('active')) {
    parent.removeClass('active')
    content.stop().slideUp(400)
  } else {
    $('.accordion_item.active').removeClass('active').find('.accordion_item_content').stop().slideUp(400)

    parent.addClass('active')
    content.stop().slideDown(400)
  }
});
//slick
$('#work_quote_slider').slick({appendArrows: '#work_slider_controls', prevArrow: '#work_prev_arrow', nextArrow: '#work_next_arrow'});
$('#service_auote_slider').slick({appendArrows: '#service_slider_controls', prevArrow: '#service_prev_arrow', nextArrow: '#service_next_arrow'});
//header slider
$(".header_slider").slick({
  infinite: true,
  arrows: false,
  dots: false,
  autoplay: false,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1
});

//ticking machine
var percentTime;
var tick;
var time = 1;
var progressBarIndex = 0;

$('.pagging .wrapper .progressBar').each(function(index) {
  var progress = "<div class='inProgress inProgress" + index + "'></div>";
  $(this).html(progress);
});
$('.pagging .wrapper li').on({
  mouseenter: function() {
    isPause = true;
  },
  mouseleave: function() {
    isPause = false;
  }
})
function startProgressbar() {
  resetProgressbar();
  percentTime = 0;
  isPause = false;
  tick = setInterval(interval, 20);
}

function interval() {
  if (isPause === false) {
    if (($('.header_slider .slick-track figure[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
      progressBarIndex = $('.header_slider .slick-track figure[aria-hidden="false"]').data("slickIndex");
      startProgressbar();
    } else {
      percentTime += 1 / (time + 5);
      $('.inProgress' + progressBarIndex).css({
        width: percentTime + "%"
      });
      if (percentTime >= 100) {
        $('.single-item').slick('slickNext');
        progressBarIndex++;
        if (progressBarIndex > 3) {
          progressBarIndex = 0;
        }
        startProgressbar();
      }
    }
  }
}

function resetProgressbar() {
  $('.inProgress').css({
    width: 0 + '%'
  });
  clearInterval(tick);
}
startProgressbar();
// End ticking machine

$('.pagging .wrapper li').click(function() {
  clearInterval(tick);
  var goToThisIndex = $(this).find("span").data("slickIndex");
  $('.single-item').slick('slickGoTo', goToThisIndex, false);
  startProgressbar();
});
