const $ = require('jquery')
const _ = require('underscore')

module.exports = {
  equalheight: function (container) {
    var currentTallest = 0
    var currentRowStart = 0
    var rowDivs = new Array()
    var jQueryel
    var topPosition = 0
    var currentDiv = 0

    $(container).each(function () {
      jQueryel = $(this)
      $(jQueryel).height('auto')
      topPosition = jQueryel.position().top

      if (currentRowStart !== topPosition) {
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest)
        }

        rowDivs.length = 0
        currentRowStart = topPosition
        currentTallest = jQueryel.height()
        rowDivs.push(jQueryel)
      } else {
        rowDivs.push(jQueryel)
        currentTallest = (currentTallest < jQueryel.height())
          ? (jQueryel.height())
          : (currentTallest)
      }

      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest)
      }
    })
  },

  getUrlParam: function (name, url) {
    if (!url) url = location.href
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
    var regexS = "[\\?&]" + name + "=([^&#]*)"
    var regex = new RegExp(regexS)
    var results = regex.exec(url)

    return results == null ? null : results[1]
  },

  checkTouchDevice: function () {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
  },

  isTouchDevice: function (queryString) {
    var el = document.getElementById('html')
    if (this.checkTouchDevice()) {
      el.classList.add('touch')
    } else {
      el.classList.add('notouch')
    }
  },

  fireCheck: function () {
    var ua = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    return ua
  },

  edgeCheck: function () {
    var ua = navigator.userAgent.toLowerCase().indexOf('edge') > -1
    return ua
  },

  explorerCheck: function () {
    var ua = navigator.userAgent.toLowerCase().indexOf('trident') > -1
    return ua
  },

  _GASend: function (category, action) {
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action
    })
  },

  urlParam: function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)
    if (results == null) {
      return null
    } else {
      return decodeURI(results[1]) || 0
    }
  },

  isLocalhostUrl: function () {
    var localhostUrls = [
      'localhost'
    ]

    return _.find(localhostUrls, function (env) {
      return window.location.href.indexOf(env) >= 0
    }) !== undefined
  },

  isTestingUrl: function () {
    var testingUrls = [
      'localhost', 'rastreatortest'
    ]
    return _.find(testingUrls, function (env) {
      return window.location.href.indexOf(env) >= 0
    }) !== undefined
  },

  setCookie: function (cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires="+d.toUTCString()
    document.cookie = cname + "=" + cvalue + "; " + expires
  },

  getCookie: function (cname) {
    let name = cname + "="
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0)==' ') { c = c.substring(1) }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },

  parseCookie: function (queryString) {
    var obj = {}
    var pairs = queryString.split('|')
    var i
    for (i in pairs) {
      var split = pairs[i].split('=')
      obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1])
    }
    return obj
  }

}
