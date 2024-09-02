const $ = require('jquery')

module.exports = {
  init: function (view) {
    $('.icon_arrow_collapse').on('click', (e) => {
      $('#news_articles_guides_wrapper').slideToggle()
      var imgCollapse = $(e.currentTarget).find('i')
      if (imgCollapse.hasClass('icon-up-chevron')) {
        imgCollapse.removeClass('icon-up-chevron').addClass('icon-down-chevron')
      } else {
        imgCollapse.removeClass('icon-down-chevron').addClass('icon-up-chevron')
      }
    })
  }
}
