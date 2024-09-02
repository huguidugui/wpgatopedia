const $ = require('jquery')

module.exports = {
  init: function () {
    this.progressBar = $('.rst_progress_bar')

    var wintop = 0
    var docheight = $('article').height() + 300
    var winheight = $(window).height()
    var totalScroll = 0

    $(window).scroll(() => {
      wintop = $(window).scrollTop()
      winheight = $(window).height()
      totalScroll = (wintop / (docheight - winheight)) * 100
      this.progressBar.css('width', totalScroll + '%')
      if (wintop === 0) {
        this.progressBar.hide()
      } else {
        this.progressBar.show()
      }
    })
  }
}
