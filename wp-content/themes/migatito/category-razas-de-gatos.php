<?php
/** ************************************
 * Template Name: Category Razas de Gato
 *
 * @author Hugo Martinez
 * @package WordPress
 * @since 1.0
* ********************************** **/

if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

get_header();


$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = [ 'cat'   => 6,
          'orderby' => 'title',
          'order' => 'ASC',
          'paged' => $paged];

        


//$query = new WP_Query( $args );
$context = array(
    //'context' => Timber::get_context(),
    'posts' => new Timber\PostQuery($args),
    'pagination' => Timber::get_pagination(),
    'directory_theme' => get_stylesheet_directory_uri(),
    'site_url' => get_site_url()
);

/* echo '<pre>';
print_r($context);
echo '</pre>'; exit; */


Timber::render( 'views/min/category-razas-de-gatos.twig', $context ); 


get_footer();