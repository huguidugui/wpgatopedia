module.exports = {
  init: function () {
        
        document.addEventListener('click', function (event) {
            if (!event.target.matches('.insurtech-mexico')) return;
            event.preventDefault();    
        }, false);
        
        document.addEventListener('click', function (event) {
            if (!event.target.matches('.amvo')) return;
            event.preventDefault();    
        }, false);
        
        document.addEventListener('click', function (event) {
            if (!event.target.matches('.geotrust')) return;
            event.preventDefault();    
        }, false);
    }
}
