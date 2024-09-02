module.exports = {
    init: function () {
          
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        window_width = w.innerWidth||e.clientWidth||g.clientWidth,
        window_height = w.innerHeight||e.clientHeight||g.clientHeight;

        if(window_width < 767 ){
            var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
    
            if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
                var html = document.querySelectorAll('html')[0]
                console.log(html);
                
                window.addEventListener("load", function() { 
                    html.style.marginTop  = '0px';
                });

                 /*  $(window).on('load', function() {
                    $("html").css("margin-top", "0");
                });  */
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
            } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
            }
        
        }
    }
}
  

