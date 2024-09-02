const $ = require('jquery')
const _ = require('underscore')

const helpers = require('helpers')

module.exports = {
  init: function () {

    //helpers.setCookie('lastQuote', 'make%3DDucati%7Cmodel%3D1200%7CminPrice%3D26053.0%7CminPricePartner%3DGNP%7CcoverType%3DAmplia%7Ccaid%3DolpOscsGCcUieWd%252F7mZaTvfHdidpC%252FjUR3BIkQmApfo97IMuuqpM7wEpnFBI5PL1%7CminPartnerLogoUrl%3Dhttps%3A%2F%2Fcotizacion-moto.rastreator.mx%2Fassets%2Fimages%2Fpartnerlogo%2Fgnp.png%7ClastQuoteDate%3D15%2F11%2F2019%7CcjLandingUrl%3Dhttps%3A%2F%2Fseguros-moto.rastreator.mx%2Fcotizador%7CqpLandingUrl%3Dhttps%3A%2F%2Fcotizacion-moto.rastreator.mx%2Flanding%2Femail%7Cqrn%3DJSpl%2BDNyu1WrUdyG4V79aA%3D%3D', '30')

    //helpers.setCookie('lastQuote', 'make%3DChevrolet%7Cmodel%3DAVEO%7CminPrice%3D8748.0%7CminPricePartner%3Dwibe%7CcoverType%3DAmplia%7Ccaid%3DQbyW5ONCuUb6zW1l560Q5i%252FsahNl%252FLu3p0oNhfSdHQ8h0UB8m7y%252FT535tyExnWu%252F%7CminPartnerLogoUrl%3Dhttps%3A%2F%2Fcotizacion-auto.rastreator.mx%2Fassets%2Fimages%2Fpartnerlogo%2Fwibe.png%7ClastQuoteDate%3D15%2F11%2F2019%7CcjLandingUrl%3Dhttps%3A%2F%2Fseguros-auto.rastreator.mx%2Fcotizador%7CqpLandingUrl%3Dhttps%3A%2F%2Fcotizacion-auto.rastreator.mx%2Flanding%2Femail%7Cqrn%3DJSpl%2BDNyu1WrUdyG4V79aA%3D%3D', '30')

    var lasQuoteCookie = helpers.getCookie('lastQuote')
    if (lasQuoteCookie !== '' && lasQuoteCookie !== null) {

      $('.main_claim').addClass('main_personalized_home')
      const tpl = require('./main_personalized_home_block.hbs')

      var queryString = decodeURIComponent(decodeURIComponent(lasQuoteCookie))
      var data = helpers.parseCookie(queryString)
      var myHostname = window.location.hostname;
      var urlDinamic = myHostname.replace(/(https?:\/\/)?(www.)?/i, '');

      if (data['cjLandingUrl'] == 'https://seguros-moto.' + urlDinamic + '/cotizador') { //BIKE
        var qrn = 'JSpl+DNyu1WrUdyG4V79aA=='
      } else { //CAR
        // if (helpers.isTestingUrl()) {
        //   quoteUrl = 'https://cotizacion-auto.rastreatortest.mx'
        //   cjUrl = 'https://seguros-auto.rastreatortest.mx/cotizador'
        // }
        var qrn = 'YtGXP2d2FVZ%2BRqEWLFORslnjP3XyGXz8L8zPvnuTbK0%3D&ct'
      }

      data['btnText'] = 'Cotizar el seguro de otro vehículo'
      data['minPrice'] = parseInt(data['minPrice']).toLocaleString()
      data['quoteUrl'] = data['qpLandingUrl'] + '?cid=' + data['caid'] + '&qrn=' + qrn + '&returncode=rv_cms'
      data['cjUrl'] = data['cjLandingUrl']

      document.body.classList.remove("new_visitor")

      $('#main_claim_content').html(tpl(data))

      // if (!helpers.isTestingUrl()) {
      /* setTimeout(function () {
        dataLayer.push({
          'event': 'RV',
          'product name': 'seguros de auto'
        })
      }, 2000) */
      // }
    }
  }
}
