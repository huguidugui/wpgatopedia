const $ = require('jquery')
var approve = require('approvejs')

module.exports = {
  init: function () {
    var rules = {
      required: true,
      email: true
    }
    var _sef = this

    $('#unsuscribe_form').on('submit', function (e) {
      e.preventDefault()
      var email = $('#email').val()
      if (approve.value(email, rules).approved) {
        var data = { email: email, action: 'unsuscribe' }
        $.ajax({
          type: 'POST',
          url: '/newsletter',
          data: data,
          dataType: 'text',
          async: true,
          crossDomain: true,
          complete: function (data) {
            console.log(data);
            var response = $.parseJSON(data['responseText'])
            if (response.data === 'OK') {
              $('button[type="submit"]').attr('disabled', 'disabled')
              _sef.showFormOk('La petición de baja ha sido procesada. Muchas gracias.')
            } else {
              _sef.showFormError('Ocurrió un error en el envío del formulario.')
            }
          }
        })
      } else {
        module.exports.showFormError('El formato del email no es correcto.')
      }
    })
  },
  showFormError: function (msg) {
    $('#email-success').text(msg)
    $('#email-success').show()
    $('#email-success').addClass('error')
  },
  showFormOk: function (msg) {
    $('#email-success').text(msg)
    $('#email-success').show()
    $('#email-success').removeClass('error')
  }
}
