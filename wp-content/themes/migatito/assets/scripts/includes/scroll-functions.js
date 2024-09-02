const $ = require('jquery')

module.exports = {
  init: function () {
    //const sideBarDiv = $('.sidebar > span')
    const sideBarDiv = document.querySelectorAll('.sidebar > span');

    this.scrolTop = $('.scroll-top')
    //this.scrolTop = document.querySelectorAll('.scroll-top')

    this.scrolTop.on('click', (event) => {
      event.preventDefault()
      /* $('html,body').animate({
        scrollTop: 0
      }, 'slow') */
      window.scrollTo({top: 0, behavior: 'smooth'});
    })

    this.checkForShowBtn()
    sideBarDiv.length && this.checkForFixSidebar()
    $(window).scroll(() => {
      this.checkForShowBtn()
      sideBarDiv.length && this.checkForFixSidebar()
    })
  },

  checkForShowBtn: function () {
    this.scrolTop.toggleClass('on', $(window).scrollTop() > 500)
  },

  checkForFixSidebar: function () {
    const content = $('#fullcontent')
    //const content = document.querySelectorAll('#fullcontent')
    const sidebar = $('.sidebar > span')
    //const sidebar = document.querySelectorAll('.sidebar > span')
    const heightContent = content.outerHeight()
    const heightSidebar = sidebar.outerHeight()

    if ($(window).scrollTop() > (heightSidebar - 90)) {
      if ($(window).scrollTop() > (heightContent - heightSidebar) + 90) {
        sidebar.css({
          top: (heightContent - heightSidebar),
          position: 'absolute'
        })
      } else {
        sidebar.attr('style', '').addClass('fixed')
      }
    } else {
      sidebar.removeClass('fixed')
    }
  }
}
