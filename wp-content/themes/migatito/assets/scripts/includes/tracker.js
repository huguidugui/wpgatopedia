const $ = require('jquery')

module.exports = {
  init: function () {
    var pageName = document.title
    var productId = 0
    if (typeof SaveTracker === 'function') {
      SaveTracker(pageName, productId)
    }
  }
}
