<?php
// File Security Check
if ( ! defined( 'ABSPATH' ) ) { exit; }

$context = array(
    //'context' => Timber::get_context(),
    'directory_theme' => get_stylesheet_directory_uri(),
    'site_url' => get_site_url()
);

Timber::render( 'views/footer.twig', $context );

?>