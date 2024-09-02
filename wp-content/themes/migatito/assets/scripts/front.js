const $ = require('jquery')
const _ = require('underscore')
//const helpers = require('helpers')

//require('smartbanner.js')
//require('cssrelpreload')

window.$ = $
window.jQuery = $

document.addEventListener("DOMContentLoaded", function(event) { 

  var views = [
    /*{
      sect: '#show_last_quote',
      module: require('./components/last-quote/script')
    },*/
    /* {
      sect: 'body',
      module: require('./includes/scroll-functions')
    }, */
    {
      sect: 'body',
      module: require('./includes/main-home')
    }
    /* {
      sect: 'body',
      module: require('./includes/os-detection')
    }, */

  ]

  _.each(views, (section) => {
    let view = $(section.sect)
    view.length && section.module.init(view)
  })

 // helpers.isTouchDevice()
  
});
