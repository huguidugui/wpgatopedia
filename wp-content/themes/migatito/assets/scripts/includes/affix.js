const $ = require('jquery')
require('bootstrap-affix')

module.exports = {
  init: function () {
    setTimeout(function () {
      if ($('html').data('smartbanner-original-margin-top') !== undefined) {
        $('#header').affix({
          offset: {
            top: 84
          }
        })
      } else {
        $('#header').affix()
      }
    }, 100)
  }
}
