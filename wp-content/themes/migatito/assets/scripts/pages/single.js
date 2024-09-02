const $ = require('jquery')

module.exports = {
  init: function () {
    function checkChevron () {
      if ($('.content-title').css('display') === 'none') {
        $('.separator').last().hide()
      } else {
        $('.separator').last().show()
      }
    }
    $(window).ready(() => {
      checkChevron()
    })
    $(window).resize(() => {
      checkChevron()
    })
  }
}
