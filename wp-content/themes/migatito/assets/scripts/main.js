const $ = require('jquery')
const _ = require('underscore')
const helpers = require('helpers')

//require('smartbanner.js')
require('cssrelpreload')

window.$ = $
window.jQuery = $

const equalHeight = require('./includes/equal-height-functions')

$(document).ready(() => {
  var views = [
    /* {
      sect: 'body',
      module: require('./includes/affix')
    }, */
   /*  {
      sect: 'body',
      module: require('./components/cookie-warning/script')
    }, */
    /* {
      sect: 'body',
      module: require('./includes/scroll-functions')
    }, */
    {
      sect: 'body',
      module: require('./includes/tracking-functions')
    },
    /* {
      sect: 'body',
      module: require('./includes/os-detection')
    }, */
    {
      sect: '.ppc',
      module: require('./components/ppc-personalization/script')
    },
    {
      sect: '#show_last_quote',
      module: require('./components/last-quote/script')
    },
    {
      sect: 'body',
      module: require('./includes/brinco-1049000')
    },
    {
      sect: 'body',
      module: require('./includes/brinco-1050109')
    },
    {
      sect: '#articles-hub-list',
      module: require('./pages/category')
    },
   /*  {
      sect: '.interest_articles',
      module: require('./pages/interest')
    },
    {
      sect: '.rst_progress_container',
      module: require('./pages/progress-bar')
    }, */
    /* {
      sect: '.single',
      module: require('./pages/single')
    },
    {
      sect: '#unsuscribe_form',
      module: require('./pages/unsuscribe')
    },
    {
      sect: '#email_form',
      module: require('./pages/sendemail')
    }, */
    /* {
      sect: 'body',
      module: require('./includes/tracker')
    },
    {
      sect: 'body',
      module: require('./includes/prevent-default')
    },
    {
      sect: 'body',
      module: require('./includes/brinco-1049000')
    },
    {
      sect: 'body',
      module: require('./includes/brinco-1050109')
    }, */
   /*  {
      sect: 'body',
      module: require('./includes/add-class-single')
    } */
  ]

  _.each(views, (section) => {
    let view = $(section.sect)
    view.length && section.module.init(view)
  })

  equalHeight.init()
  helpers.isTouchDevice()
})
