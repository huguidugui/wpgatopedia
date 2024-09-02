var $ = require('jquery')
var _ = require('underscore')
var validation = require('../components/validation/script')

module.exports = {

  init: function (view) {
    this.view = view
    this.form = $('.form-group')
    this.buttonForm = $('#submit')
    this.messageBox = $('.result')
    this.okMessage = 'Email enviado correctamente. ¡Muchas gracias!'
    this.errorMessage = 'Ocurrió un error en el envío del formulario.'
    this.errorValidationMessage = 'Existen errores en el formulario, revise los campos y recuerde que es obligatorio aceptar los términos legales'

    validation.updateErrorsOnChange(this.form)

    this.buttonForm.on('click', (e) => {
      this.onSubmitHandler(e, this.form)
    })
  },

  onSubmitHandler: function (e, form) {
    e.preventDefault()
    var _self = this

    if (validation.formIsReady(this.form)) {
      var email = $('#email').val()
      var source = $('#source').val()
      var data = { email: email, action: 'subscribe', source: source }
      $.ajax({
        type: 'POST',
        url: '/newsletter',
        data: data,
        dataType: 'text',
        async: true,
        crossDomain: true,
        complete: function (data) {
          var response = $.parseJSON(data['responseText'])
          if (response.data === 'OK') {
            $('button[type="submit"]').attr('disabled', 'disabled')
            _self.showFormOk(_self.okMessage)
            dataLayer.push({'event': 'Quote Home Insurance', 'Action': 'Submitted'})
          } else {
            _self.showFormError(_self.errorMessage)
          }
        }
      })
    } else {
      _self.showFormError(this.errorValidationMessage)
    }
  },
  showFormError: function (msg) {
    $(this.messageBox).text(msg).show().addClass('error')
  },
  showFormOk: function (msg) {
    $(this.messageBox).text(msg).show().removeClass('error')
  }
}
