var $ = require('jquery')
var _ = require('underscore')
var approve = require('approvejs')

module.exports = {
  rules: {
    'text': {
      required: true,
      range: {
        min: 1,
        max: 100
      }
    },
    'textOpt': {
      ignoreNull: true,
      range: {
        min: 1,
        max: 100
      }
    },
    'email': {
      required: true,
      email: true,
      range: {
        min: 1,
        max: 50
      }
    },
    'phone': {
      required: true,
      format: /^[6789]\d{8}$/
    },
    'phoneOpt': {
      ignoreNull: true,
      format: /^[6789]\d{8}$/
    },
    'cp': {
      format: /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/,
      range: {
        min: 5,
        max: 5
      }
    },
    'url': {
      url: true
    },
    'comments': {
      required: true,
      max: 500
    },
    'commentsOpt': {
      max: 500
    },
    'number': {
      required: true,
      numeric: true,
      max: 50
    },
    'date': {
      required: true,
      date: 'dmy'
    }
  },

  updateErrorsOnChange: function (form) {
    var select = form.find('select')
    var input = form.find('input[type="text"] , *[data-type="textarea"]')
    var checkbox = form.find('input[type="checkbox"]')

    select.on('change', (e) => {
      var select = $(e.currentTarget)
      select.val() !== '' && select.parents('.form-group').removeClass('error')
    })

    input.on('keyup change', (e) => {
      this.checkInputIsValid(e)
    })
    checkbox.on('change', (e) => {
      this.checkInputIsValid(e)
    })
  },

  checkInputIsValid: function (e) {
    var input = $(e.currentTarget)
    if (input.attr('type') === 'checkbox') {
      input.is(':checked') && input.removeClass('error')
    } else {
      approve.value(input.val(), this.rules[input.data('validate')]).approved && input.removeClass('error')
    }
  },

  formIsReady: function (form) {
    var canSend = true
    var textGroup = form.find('input[type="text"] , *[data-type="textarea"], input[type="checkbox"]')
    var selectGroup = form.find('select')
    var isValid = ''

    textGroup.each((index, element) => {
      var input = $(element)
      if (input.attr('type') === 'checkbox') {
        isValid = input.is(':checked')
      } else {
        isValid = approve.value(input.val(), this.rules[input.data('validate')]).approved
      }
      input.toggleClass('error', !isValid)
      if (!isValid) {
        canSend = false
      }
    })

    selectGroup.each((index, element) => {
      var select = $(element)
      var isValid = select.val() !== ''
      select.toggleClass('error', !isValid)
      if (!isValid) {
        canSend = false
      }
    })

    return canSend
  }
}
