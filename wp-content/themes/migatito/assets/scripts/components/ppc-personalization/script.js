const $ = require('jquery')
const _ = require('underscore')

const helpers = require('helpers')

module.exports = {
  init: function () {
    var lastQuoteCookie = helpers.getCookie('lastQuote')
    if (!lastQuoteCookie) {
      $.ajax({
        url: '/wp-admin/admin-ajax.php',
        type: 'post',
        data: {
          action: 'post_utms',
          utm_term: helpers.urlParam('utm_term'),
          utm_campaign: helpers.urlParam('utm_campaign'),
          utm_source: helpers.urlParam('utm_campaign')
        },
        success: function (response) {
          var dataUtm = $.parseJSON(response)

          const tpl = require('./ppc_personalized_text_block.hbs')
          $('#show_last_quote').html(tpl(dataUtm))

          $('.main_claim').removeClass('main_personalized_home')
          $('.banner-dog a img').attr('src', dataUtm.ImageURL)

          if (!helpers.isTestingUrl()) {
            setTimeout(function () {
              dataLayer.push({
                'event': 'DCMT',
                'Set_Name': dataUtm['ContentSetName'],
                'Header': dataUtm['HeaderText']
              })
            }, 2000)
          }
        }
      })
    }
    $('#show_last_quote').show()
  }
}
