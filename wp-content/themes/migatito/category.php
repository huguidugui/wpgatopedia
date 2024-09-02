<?php
/** *****************************
 * Template Name: Category
 *
 * @author Hugo Martinez
 * @package WordPress
 * @since 1.0
* *******************************/

if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

get_header();

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = [ 'cat'   => 7,
          'paged' => $paged];

$context = array(
    //'context' => Timber::get_context(),
    'posts' => new Timber\PostQuery($args ),
    'pagination' => Timber::get_pagination(),
    'directory_theme' => get_stylesheet_directory_uri(),
    'site_url' => get_site_url()
);


Timber::render( 'views/category.twig', $context ); 


get_footer();