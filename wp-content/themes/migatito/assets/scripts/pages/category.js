const $ = require('jquery')
const helpers = require('helpers')

module.exports = {
  init: function () {
    function equalHeightPerRow () {
      helpers.equalheight('.title')
      helpers.equalheight('.excerpt')
      helpers.equalheight('.article-item a')
    }
    $(window).ready(() => {
      setTimeout(function () {
        equalHeightPerRow()
      }, 500)
    })
    $(window).resize(() => {
      equalHeightPerRow()
    })
  }
}
