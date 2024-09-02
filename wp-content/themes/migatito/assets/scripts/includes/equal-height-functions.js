const $ = require('jquery')
const _ = require('underscore')

const helpers = require('helpers')

module.exports = {
  init: function () {
    $(window).ready(() => {
      setTimeout(function () {
        $('.logo_hub').length > 0 && helpers.equalheight('.logo_hub > div')
        $('#related_articles').length > 0 && helpers.equalheight('#related_articles > ul > li')
      }, 500)
    })
    $(window).resize(() => {
      $('.logo_hub').length > 0 && helpers.equalheight('.logo_hub > div')
      $('#related_articles').length > 0 && helpers.equalheight('#related_articles > ul > li')
    })
  }
}
