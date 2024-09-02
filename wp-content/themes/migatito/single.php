<?php
/** *****************************
 * Template Name: Single
 *
 * @author Hugo Martinez
 * @package WordPress
 * @since 1.0
* *******************************/

if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

get_header();


$context = array(
    //'context' => Timber::get_context(),
    //'posts' => new Timber\PostQuery(),
    //'pagination' => Timber::get_pagination(),
    'post' => new Timber\Post(),
    'directory_theme' => get_stylesheet_directory_uri(),
    'site_url' => get_site_url()
);

/* echo '<pre>';
print_r($context['post']);
echo '</pre>'; exit;  */

Timber::render( 'views/single.twig', $context ); 


get_footer();