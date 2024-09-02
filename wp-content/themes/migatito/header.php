<?php
    if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check
    global $post;

?>
<!DOCTYPE html>

<!--[if IEMobile 7 ]><html dir="ltr" <?php language_attributes(); ?> class="no-js iem7"><![endif]-->
<!--[if lt IE 7 ]><html dir="ltr" <?php language_attributes(); ?> class="no-js ie6 oldie"><![endif]-->
<!--[if IE 7 ]><html dir="ltr" <?php language_attributes(); ?> class="no-js ie7 oldie"><![endif]-->
<!--[if IE 8 ]><html dir="ltr" <?php language_attributes(); ?> class="no-js ie8 oldie"><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html dir="ltr" id="html" class="no-js" <?php language_attributes(); ?>><!--<![endif]-->
    <head>
        <!-- aqui va IF if( WP_ENVIROMENT != 'local' ) entonces -> <meta name="robots" content="noindex"> -->    
        <?php 
            wp_head();
            //Todo esto viene de functions.php
            //add_meta_basic
            //add_meta_og
            //add_alternate
            //add_jsonld_menu
        ?>

        <style><?php include 'css/style_critical.min.css'; ?></style>
         <!--  <link rel="preload" href="<?php echo get_stylesheet_directory_uri(); ?>/fonts/iconfont.woff2" as="font" type="font/woff2" crossorigin> -->

        <?php if( ! is_front_page() ): ?>
            <link rel="preload" href="<?php echo get_stylesheet_directory_uri(); ?>/css/style.min.css?ver=<?php echo filemtime(plugin_dir_path( __FILE__ ).'/css/style.min.css'); ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/style.min.css?ver=<?php echo filemtime(plugin_dir_path( __FILE__ ).'/css/style.min.css'); ?>"></noscript>
        <?php else: ?>
            <link rel="preload" href="<?php echo get_stylesheet_directory_uri(); ?>/css/style_front_page.min.css?ver=<?php echo filemtime(plugin_dir_path( __FILE__ ).'/css/style_front_page.min.css'); ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/style_front_page.min.css?ver=<?php echo filemtime(plugin_dir_path( __FILE__ ).'/css/style_front_page.min.css'); ?>"></noscript>
        <?php endif; ?>

        <!-- <link rel="preload" href="<?php echo get_stylesheet_directory_uri(); ?>/vendor/animate.css/animate.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/vendor/animate.css/animate.min.css"></noscript>

        <link rel="preload" href="<?php echo get_stylesheet_directory_uri(); ?>/vendor/aos/aos.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/vendor/aos/aos.css"></noscript> -->

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>

    <body id="body">
        <!--[if lt IE 8]>
            <p class="browserupgrade">Estás utilizando un navegador <strong>obsoleto</strong>. Por favor, actualiza tu navegador para vivir una experiencia mejor, más segura y completa.</p>
        <![endif]-->

        <?php get_template_part( 'headerFooter/header', 'main_nav' ); ?>

        