<?php
/** *****************************
 * Template Name: FrontPage
 *
 * @author Hugo Martinez
 * @package WordPress
 * @since 1.0
* *******************************/

if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

$args_random_razas = array(
    'category'    => 6,      // ID categoría RAZAS DE GATOS
    'numberposts' => 12,     // Número de artículos a mostrar
    'orderby'     => 'rand'  // Ordenar aleatoriamente
);

// 3 Articulos aleatorios
$args_random_articulos = array(
    'category'    => 7,      // ID categoría BLOG
    'numberposts' => 3,      // Número de artículos a mostrar
    'orderby'     => 'rand', // Ordenar aleatoriamente
);

$colores = ["purple", "green", "blue", "pink", "black", "red"];
// Desordena el arreglo original
shuffle($colores);
// Toma los primeros 4 elementos del arreglo desordenado
$colores_aleatorios = array_slice($colores, 0, 4);


$faqs_for_shortcode = "{'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':'¿Qué es gatopedia?','acceptedAnswer':{'@type':'Answer','text':'Gato pedia es un sitio web para amantes de las razas de gatos que quiera conocer más a detalle de cada michi.'}},{'@type':'Question','name':'¿Qué voy a encontrar en gatopedia?','acceptedAnswer':{'@type':'Answer','text':'Vas a encontrar toda la información relacionada a las razas de gatos mostrada de un forma dinámica para conocer a fondo cada Raza de gato.'}}!!!}";
$faqs_for_jsonld = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué es gatopedia?","acceptedAnswer":{"@type":"Answer","text":"Gato pedia es un sitio web para amantes de las razas de gatos que quiera conocer más a detalle de cada michi."}},{"@type":"Question","name":"¿Qué voy a encontrar en gatopedia?","acceptedAnswer":{"@type":"Answer","text":"Vas a encontrar toda la información relacionada a las razas de gatos mostrada de un forma dinámica para conocer a fondo cada Raza de gato."}}]}';

get_header();

$context = array(
    //'context' => Timber::get_context(),
    //'post' => new Timber\Post(),
    'random_razas' => Timber::get_posts($args_random_razas),
    'random_articulos' => Timber::get_posts($args_random_articulos),
    'directory_theme' => get_stylesheet_directory_uri(),
    'colores_aleatorios' => $colores_aleatorios,
    'site_url' => get_site_url(),
    'faqs_for_shortcode' => $faqs_for_shortcode,
	'faqs_for_jsonld' => $faqs_for_jsonld
);

Timber::render( 'views/front-page.twig', $context );

$args = array(
    'fields' => array('user_login', 'user_meta'), // Retrieve user login and user meta
    'meta_key' => 'wp_capabilities', // Filter by 'wp_capabilities' meta key
);

// Retrieve users
$args = array(
    'fields' => array('user_login', 'user_meta'), // Retrieve user login and user meta
    'meta_key' => 'wp_capabilities', // Filter by 'wp_capabilities' meta key
);

// Retrieve users
$users = get_users($args);

/* echo '<pre>';
var_dump($users);
echo '</pre>'; exit; */

get_footer();

