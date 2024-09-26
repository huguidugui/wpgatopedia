<?php
/**
 * BREADCRUMBS
 * FAQ'S
 * CARRUSEL
 * 
 */

/* =====================================================================================
 * -------------------------------------------------------------------------------------
 * BREADCRUMBS
 * -------------------------------------------------------------------------------------
 * =====================================================================================
*/
function my_breadcrumbs() {
    global $post;
    if ( is_category() ) {
        $current_page = get_queried_object();

        $context = array(
            'title' => $current_page->cat_name,
            'directory_theme' => get_stylesheet_directory_uri(),
            'site_url' => get_site_url()
        );

        Timber::render( 'views/breadcrumbs/bread_category.twig', $context );

    } elseif( is_page() ) {
        $current_page = get_queried_object();

        if( $current_page->post_parent != 0 ) {
            echo "Hay más de dos elementos";
        }
        
        $context = array(
            'title' => $current_page->post_title,
            'directory_theme' => get_stylesheet_directory_uri(),
            'site_url' => get_site_url()
            //'context' => Timber::get_context(),
            /* 'post_parent' => $info_post->post_parent,
            'homeclass' => $homeclass,
            'anc_array' => $anc_array,
            'title_art' => $title_art,
            'site_url' => get_rocket_cdn_url(get_site_url()) */
        );
        Timber::render( 'views/breadcrumbs/bread_page.twig', $context );

    } elseif ( is_single() ) {  

        $current_page = get_queried_object();
        $cats = get_the_category( $current_page->ID );
        $info_array = array();
        $i = 2;

        //Meter el home poniendo el primer arreglo con posición 1
        array_push($info_array, array('url' => get_site_url(), 
                                        'cat_name' => "Inicio", 
                                        'position' => 1));

        foreach ( $cats as $cat ) {

            $url = get_term_link( $cat->term_id, 'category');           
            array_push($info_array, array('url' => $url, 
                                            'cat_name' => $cat->cat_name, 
                                            'position' => $i));
            $i++;
        }
  
        $context = array(
            'info_array' => $info_array,
            'title' => $current_page->post_title,
            'site_url' => get_site_url(),
            "permalink" => get_permalink()
        );
    
        Timber::render( 'views/breadcrumbs/bread_single.twig', $context );
    } //END elseif ( is_single() )
} 



/* =====================================================================================
 * -------------------------------------------------------------------------------------
 * FAQ'S
 * -------------------------------------------------------------------------------------
 * =====================================================================================
*/
function showSectionFaqs( $atts ) {

    $string_json = ( isset ($atts['faqs']) ) ? $atts['faqs'] : '';

    $faqsCambiarQuotes = str_replace("'", "\"", $string_json);
    $faqs = str_replace("!!!", "]", $faqsCambiarQuotes);
    $faqs_json = json_decode( $faqs );
    
    $context = array(
        'context' => Timber::get_context(),
        'faqs' => $faqs_json->mainEntity
    );

    Timber::render( 'views/shortcodes/faq_section.twig', $context );
}
add_shortcode( 'show-section-faqs', 'showSectionFaqs' );

/* =====================================================================================
 * -------------------------------------------------------------------------------------
 * CARRUSEL
 * -------------------------------------------------------------------------------------
 * =====================================================================================
*/
function showCarrusel( $atts ) {

    /* $string_json = ( isset ($atts['faqs']) ) ? $atts['faqs'] : '';
    $title_faqs = ( isset ($atts['title']) ) ? $atts['title'] : 'Preguntas frecuentes'; */

    /* $faqsCambiarQuotes = str_replace("'", "\"", $string_json);
    $faqs = str_replace("!!!", "]", $faqsCambiarQuotes);
    $faqs_json = json_decode( $faqs ); */
    
    $context = array(
        'context' => Timber::get_context()
        /* 'faqs' => $faqs_json->mainEntity,
        'title' => $title_faqs */
    );

    Timber::render( 'views/shortcodes/carrusel-gatos.twig', $context );
}
add_shortcode( 'show-carrusel', 'showCarrusel' );


function pesoPromedioGato( $atts ) {

    $peso = ( isset ($atts['peso']) ) ? $atts['peso'] : '';

    $context = array(
        'context' => Timber::get_context(),
        'peso' => $peso
    );

    Timber::render( 'views/shortcodes/peso_promedio.twig', $context );
}
add_shortcode( 'peso-promedio-gato', 'pesoPromedioGato' );

