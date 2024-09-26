<?php
/** *****************************
 * Template Name: Asociaciones
 *
 * @author Hugo Martinez
 * @package WordPress
 * @since 1.0
* *******************************/

if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

get_header();

$context = array(
    //'context' => Timber::get_context(),
    'post' => new Timber\Post(),
    'directory_theme' => get_stylesheet_directory_uri(),
    'site_url' => get_site_url()
);

Timber::render( 'views/asociaciones.twig', $context );


get_footer();