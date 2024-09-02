const $ = require('jquery')
const _ = require('underscore')

const helpers = require('helpers')

module.exports = {
  init: function () {
    const template = require('./cookie_bar.hbs')
    const ckwp = helpers.getCookie('cookie_rst')

    if (ckwp === '' || ckwp === null) {
      $('body').append(template())

      _.defer(() => {
        const cookieWrapper = $('#cookie_wrapper')
        setTimeout(() => { cookieWrapper.addClass('open') }, 300)

        $('#close_coockies').on('click', (event) => {
          event.preventDefault()
          cookieWrapper.removeClass('open')
          helpers.setCookie('cookie_rst', '1', 365)
          setTimeout(() => { cookieWrapper.remove() }, 210)
        })
      })
    }
  }
}
