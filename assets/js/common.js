$(document).ready(function () {

  $('.js-counter').click(function (e) {
    var dir = $(this).data('dir');
    var $input = $(this).siblings('input');
    var val = parseInt($input.val());
    if (dir == 'down' && val > 1) {
      $input.val(val-1);
    } else {
      if (dir == 'up') {
        $input.val(val+1);
      }
    }
  });
  
  $('.js-profile-password-toggler').click(function (e) {
    e.preventDefault();
    $(this).parents('.form-group').addClass('hidden');
    $('.js-profile-password-wrapper').removeClass('hidden');
  });
  
  /* user company */
  $('.js-company-add-button').click(function (e) {
    e.preventDefault();
    $(this).addClass('hidden');
    $('.js-company-add-form').removeClass('hidden');
  });
  $('.js-company-add-form button[type=reset]').click(function (e) {
    $(this).parents('form').addClass('hidden');
    $('.js-company-add-button').removeClass('hidden');
  });
  $(document).on('af_complete', function(event, response) {
    var form = response.form;
    if (form.hasClass('js-company-add-form') && response.success) {
        window.location.reload();
    }
  });
  
});

$(window).load(function(){
  
  $('input[type=file], input[type=radio], input[type=checkbox], select').styler();
  
  (function ($) {

    $(function(){

      var $win = $(window),
          $header = $('header'),
          $main = $('main'),
          className = 'fixed',
          shift = 100, 
          height = $header.outerHeight(),
          progress = false;

      fixHeader();

      $win.on('scroll', fixHeader);

      function fixHeader() {
        if (progress) {
          setTimeout(fixHeader, 400);
          return;
        }
        var scrollTop = $win.scrollTop();
        if (scrollTop >= height + shift) {
          if (!$header.hasClass(className)) {
            progress = true;
            $header.addClass(className);
            $main.attr('style', 'margin-top: '+height+'px');
            $header.attr('style', 'top: -60px');
            $header.animate({top: "0"}, 200, function(){
              progress = false;
            });
          }
        } else {
          if ($header.hasClass(className)) {
            progress = true;
            $header.animate({top: "-60px"}, 200, function(){
              $header.removeClass(className);
              $main.attr('style', 'margin-top: 0');
              progress = false;
            });
          }
        }
      }

    });
    
    $('.js-news-slider').slick({
      draggable: false,
      infinite: false,
      swipe: false,
      touchMove: false,
      prevArrow: $('.js-news-slider-arrow-prev'),
      nextArrow: $('.js-news-slider-arrow-next')
    });

  })(window.jQuery);
  
});

(function ($) {
  
  $(function(){
    
    moveFilters = {

      init: function() {
        $filters = $('.filters');
        if ($filters.length == 0) return false;
        $wrapper = $filters.parents($filters.data('sticky-parent'));
        fHeight = $filters.outerHeight(true);
        fOffset = $filters.offset().top;
        wrHeight = $wrapper.outerHeight(true);
        wrOffset = $wrapper.offset().top;
        wHeight = $(window).height();
        fixedMenuHeight = 60;
        useAnimate = true;

        $('.filters').css({position: 'absolute', top: 0});
        this.move();
        
        $(window).on('scroll', function(){
          clearInterval(filtersCounter);
          var filtersCounter = setTimeout(moveFilters.move(), 100);
        });

      },

      animate: function(top) {
        if (useAnimate) {
          $filters.stop().animate({'top': top}, 300);
        } else {
          $filters.css({'top': top});
        }
      },

      move: function() {
        var scrollTop = $(window).scrollTop();
        var curTop = parseInt($filters.css('top'));

        if (scrollTop + wHeight > fOffset + fHeight) {
          var top = scrollTop - fOffset - (fHeight - wHeight);
          if (top > curTop && scrollTop + wHeight < wrOffset +wrHeight) {
            this.animate(top);
          } else if (curTop > scrollTop - wrOffset + fixedMenuHeight) {
            this.animate(scrollTop - wrOffset + fixedMenuHeight);
          }
        } else { 
          if (scrollTop >= fOffset + fixedMenuHeight ) {
            var top = scrollTop - fOffset + fixedMenuHeight;
            if (top < curTop) {
              this.animate(top);
            }
          } else {
            this.animate(0);
          }
        }
      }

    };
    
    $(window).load(function(){
      moveFilters.init();
    });

  });

})(window.jQuery);