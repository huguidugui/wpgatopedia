module.exports = {
    init: function () {
          
        
        window.addEventListener("load", function() { 
            var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            window_width = w.innerWidth||e.clientWidth||g.clientWidth,
            window_height = w.innerHeight||e.clientHeight||g.clientHeight;
    
            if(window_width < 767 ) {
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
                } else if (/Android/.test(userAgent)) {
                    os = 'Android';
                } else if (!os && /Linux/.test(platform)) {
                    os = 'Linux';
                }
            }

            const newSection = d.createElement("section");
            newSection.classList.add('d-flex', 'align-items-center', 'showin-responsive-hiddein-desktop-barra-app');
            newSection.setAttribute('id', 'topbar-android');
            //const newContent = d.createTextNode( os );

            newSection.innerHTML  = `
            <div class="container">
                <div class="col-12 d-flex justify-content-around">
                    <div class="topbar-img d-flex justify-content-center align-items-center">
                        <a href="https://play.google.com/store/apps/details?id=mx.rastreator.coreapp">
                            <picture>
                            <source srcset="<?php echo get_rocket_cdn_url(get_stylesheet_directory_uri()); ?>/img/rastreatormx_app_icon.webp" type="image/webp">
                            <img 
                                src="<?php echo get_rocket_cdn_url(get_stylesheet_directory_uri()); ?>/img/rastreatormx_app_icon.png"
                                alt="App Android Rastreator"
                                title="App Android Rastreator"
                                width="64"
                                height="64"
                                loading="eager">
                            </picture>
                        </a>
                    </div>
                    <div class="topbar-text d-flex flex-column justify-content-center">
                        <span class="title-first-cotiza">Cotiza tu seguro de auto</span>
                        <span class="title-second-cotiza">Rastreator.mx</span>
                        <span class="title-second-cotiza">Gratis - En Google Play</span>
                     </div>
                     <div class="topbar-button d-flex justify-conten-center align-items-center">
                        <a href="https://play.google.com/store/apps/details?id=mx.rastreator.coreapp" class="btn">Instalar</a>
                     </div>
                </div>
            </div>`;

           // newSection.innerHTML (newContent);

            //console.log(newSection);
            //      d.getElementById("os_type").value = os;
            /*  d.cookie = "osCookie = 123123"  */
           // parent = d.getElementById('body-principal');
           parent = d.getElementById('header');
            //d.insertBefore(newSection, parent);
            parent.insertAdjacentElement('beforebegin', newSection)

           
        });
    }
}
  

