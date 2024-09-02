<?php
/** *****************************
 * Template Name: Tag
 *
 * @author Hugo Martinez
 * @package WordPress
 * @since 1.0
* *******************************/

if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

get_header();

$term = get_queried_object();

// Obtén los posts relacionados con el tag
$args = [ 'post_type'   => 'post',
          'tag_id' => 9];

$context = array(
    //'context' => Timber::get_context(),
    'posts' => new Timber\PostQuery( $args ),
    'pagination' => Timber::get_pagination(),
    'directory_theme' => get_stylesheet_directory_uri(),
    'site_url' => get_site_url()
);

Timber::render( 'views/tag.twig', $context ); 


get_footer();