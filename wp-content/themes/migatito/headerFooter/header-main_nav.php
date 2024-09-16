<?php  if ( ! defined( 'ABSPATH' ) ) { exit; } 

   global $post;
?>

<header id="header" class="fixed-top d-flex align-items-center">
   <div class="container d-flex align-items-center">

      <div class="logo me-auto">
         <h1 class="text-light"><a href="index.html"><span>Gatopedia</span></a></h1>
         <!-- <a href="<?php echo get_site_url(); ?>">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/migatito_logo_header.png" alt="" class="img-fluid">
         </a> -->
      </div>
      <?php 
         wp_nav_menu( array (
                           'menu'       => 'Menu principal', //En CMS la opción "Dónde se muestra" se refiere a ete nombre
                           /* 'menu_class' => 'vvv', */
                           'container'  => 'nav',
                           'container_class' => 'navbar order-last order-lg-0',
                           'container_id' => 'navbar'
                        ) );

                        ?>
                        <i class="bi mobile-nav-toggle bi-list"></i>
   </div>
</header>