const $ = require('jquery')

module.exports = {
  init: function () {

    $("#menu-menu-principal .first-menu-item a span.arrowIconDown").remove();
    $("#menu-menu-principal .first-menu-item a").prepend("<span class='closeMenuIcon'></span>");

    if (window.matchMedia('(max-width: 768px)').matches) {
        $('.showMenuButton, .closeMenu, .menuCms-overlay').on('click', (e) => {
            e.stopPropagation;
            $('.menuCms').toggleClass('menu-visible');
            if($('.menuCms').hasClass('menu-visible')) {
                $('.menuCms-overlay').addClass('active');
            }
            else {
                $('.menuCms-overlay').removeClass('active');
            }
        });
        $('.menuCmsSection__items').each(function () {
            var _this = $(this).children('.sub-menu').prev('a');
            _this.on('click', () => {
                $(this).siblings().children('.sub-menu').slideUp();
                _this.next().slideToggle();
            });
        });
    }
    
  }
}
