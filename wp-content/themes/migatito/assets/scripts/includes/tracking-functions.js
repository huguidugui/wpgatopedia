const $ = require('jquery')
const helpers = require('helpers')

module.exports = {

  init: function () {
    $('body').on('click', '.smartbanner__button', function () {
      dataLayer.push({ 'event': 'App_install_prompt', 'Status': 'Installed' })
    })

    if (typeof OneSignal === 'function') {
      setTimeout(function () {
        OneSignal.push(function () {
          var isPushSupported = OneSignal.isPushNotificationsSupported()
          if (isPushSupported) {
            var utmcurl = window.location.href.match(/^[^\#\?]+/)[0]
            var utmcsid = helpers.getCookie('GAGUIDH1')
            var utmcsr = 'direct'
            var utmccn = 'direct'
            var utmcmd = 'direct'
            var utmz = helpers.parseCookie(decodeURIComponent(decodeURIComponent(helpers.getCookie('__utmz'))))
            if (!$.isEmptyObject(utmz)) {
              utmcsr = utmz.utmcsr.replace(/[()]/g, '')
              utmccn = utmz.utmccn.replace(/[()]/g, '')
              utmcmd = utmz.utmcmd.replace(/[()]/g, '')
            }
            OneSignal.on('permissionPromptDisplay', function (permissionChange) {
              helpers._GASend('notification_prompt', 'displayed')
            })
            OneSignal.on('notificationPermissionChange', function (permissionChange) {
              var currentPermission = permissionChange.to
              helpers._GASend('notification_permission_change', currentPermission)
            })
            OneSignal.sendTags({
              source: utmcsr,
              campaign: utmccn,
              medium: utmcmd,
              url: utmcurl,
              sid: utmcsid
            }).then(function (tagsSent) {})
          }
        })
      }, 2000)
    }
  }
}
