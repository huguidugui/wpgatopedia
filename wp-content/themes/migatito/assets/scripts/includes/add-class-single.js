module.exports = {
    init: function () {
          
        var cuerpo = document.querySelectorAll('body')[0];
        
        if(cuerpo.classList.contains('single')) {
            cuerpo.classList.remove('single');
        }
          
        if(cuerpo.classList.contains('single-post')) {
            cuerpo.classList.add('single');
        }
          
    }
}
  