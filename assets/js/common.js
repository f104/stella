jQuery(function () {
    "use strict";

    $(document).ready(function () {
        $('<style>header h1:before{width:'+$('header h1').offset().left+'px}</style>').appendTo('head');
        $('.js-feedback').click(function(e){
          e.preventDefault();
          $(this).hide();
          $(this).siblings('form').show();
        });
        $('form').ajaxForm({
          dataType: 'json',
          success: function (res, statusText, xhr, form) {
            form.css({
              'opacity': '1',
              'pointer-events': 'all'
            });
            if (res.success) {
              form.html('Спасибо! Мы вам обязательно перезвоним.');
            }
          }
          , beforeSubmit: function (arr, $form, options) {
            $form.css({
              'opacity': '.5',
              'pointer-events': 'none'
            });
            return true;
          }
          , error: function () {
            $('form').css({
              'opacity': '1',
              'pointer-events': 'all'
            });
          }
        });
    });
  
});
