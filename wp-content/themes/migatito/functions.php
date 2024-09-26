<?php  
    if ( ! defined( 'ABSPATH' ) ) { exit; } // File Security Check

//Esta linea le dice a WP poner imagen destacada en la edición/creación de artículos
add_theme_support( 'post-thumbnails' );

//add_image_size( 'ratio_4x3', 900, 675, true);
//add_image_size( 'ratio_1x1', 675, 675, true);

// Esta función regresa el post->ID
function global_postID() {
    global $post;    
    if ( !is_null( $post ) ) {
       
        return $post_id = $post->ID;
    }
}
add_action('wp', 'global_postID');


/* -------------------------------------------------------------------------------------------------------
add_meta_basic: Agrega tags meta basicos para HTML en el header
add_action usa tercer parametro para priorizar que muestre primero antes que cualquier otro plugin que use wp_head
add_meta_basic hook usa: get_post_title(), get_post_description(), get_tags_post()
------------------------------------------------------------------------------------------------------- */
function add_meta_basic () { ?>
    <meta charset="UTF-8">
    <meta name="description" content="<?php echo get_meta_description(); ?>">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=6.0">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?php echo get_meta_title();?></title>
 
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon.png" type="image/x-icon">
<?php } //End  add_meta_basic

add_action('wp_head', 'add_meta_basic', 1);
/* -------------------------- END add_meta_basic HOOK ------------------------------------------------- */

function get_meta_title() {
	$metaTitle = '';

	if( is_page() ) {
		$metaTitle = get_post_meta(global_postID(), 'meta-title', true);
	} elseif ( is_category() ) {
		$categoria_actual = get_queried_object();

		$meta_title_explode = explode('||', $categoria_actual->category_description);

		//$term_id = get_queried_object_id();
		//$meta_description = get_term_meta($term_id, 'categoria_meta_description', true);

		$metaTitle = trim($meta_title_explode[0]);
	} else if ( is_single() ) {
		//$metaTitle = get_post_meta(global_postID(), 'meta-title', true);
		$post = get_post();
		$metaTitle = $post->post_title;
		//var_dump($metaTitle);
	}

	return $metaTitle;
}

function get_meta_description() {
	$metaDescription = '';

	if( is_page() ) {
		$metaDescription = get_post_meta(global_postID(), 'meta-description', true);
	} elseif ( is_category() ) {
		$categoria_actual = get_queried_object();

		$meta_description_explode = explode('||', $categoria_actual->category_description);

		//$term_id = get_queried_object_id();
		//$meta_description = get_term_meta($term_id, 'categoria_meta_description', true);

		$metaDescription = trim($meta_description_explode[1]);
	} else if( is_single() ){
		$metaDescription = get_post_meta(global_postID(), 'meta-description', true);
	}

	return $metaDescription;
}


/* -------------------------------------------------------------------------------------------------------
 * DISABLE GUTENBERG STYLES
------------------------------------------------------------------------------------------------------- */
function dequeue_gutenberg_theme_css() {
    wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_enqueue_scripts', 'dequeue_gutenberg_theme_css', 100);


/* -------------------------------------------------------------------------------------------------------
 * Con esto se corrigió que daba 404 page/2/ , page/3/ ...
 * Cuando se dbaa click en la paginación
------------------------------------------------------------------------------------------------------- */
function remove_page_from_query_string($query_string)
{ 
    if ($query_string['name'] == 'page' && isset($query_string['page'])) {
        unset($query_string['name']);
        $query_string['paged'] = $query_string['page'];
    }      
    return $query_string;
}
add_filter('request', 'remove_page_from_query_string');

/* -------------------------------------------------------------------------------------------------------
 * REMOVE CSS AFTER UPDATE WP 6.1
------------------------------------------------------------------------------------------------------- */
function mywptheme_child_deregister_styles() {
    wp_dequeue_style( 'classic-theme-styles' );
}
add_action( 'wp_enqueue_scripts', 'mywptheme_child_deregister_styles', 10 );

/* -------------------------------------------------------------------------------------------------------
 * SCHEMA JSONLD MENU 
------------------------------------------------------------------------------------------------------- */

function add_jsonld_menu() { 

	$tag_start = '<script type="application/ld+json">' . "\n";
	$tag_end = '</script>' . "\n";
	$jsonld = '{"@context":"https://schema.org","@type":"ItemList","itemListElement":[{"@type":"SiteNavigationElement","position":"1","name":"Gatopedia.info - Conoce todas las razas de gatos","description":"Gatopedia.info Loremp ipsum.","url":"https://www.gatopedia.info/"},{"@type":"SiteNavigationElement","position":"2","name":"Nosotros - Descubre las personas detrás de gatopedia.info","description":"¿Buscas un seguro de Auto en México? Compara tu seguro, puedes ahorrar tiempo y dinero","url":"https://www.gatopedia.info/nosotros"},{"@type":"SiteNavigationElement","position":"3","name":"Asociaciones de gatos internacionales - Conoce la 4 principales catagorizadores de gatos","description":"Lore ppeim ghuop ienta digital que te ayuda a comparar precios y coberturas.","url":"https://www.gatopedia.info/asociaciones-internacionales-de-gatos"},{"@type":"SiteNavigationElement","position":"4","name":"Blog sobre gatos - Conoce datos curiosos sobre Gatopedia.info","description":"Loremp isspp  es contar con un seé se trata? Entra a Gatopedia.info y descúbrelo.","url":"https://www.gatopedia.info/blog-sobre-gatos"},{"@type":"SiteNavigationElement","position":"5","name":"Conoce a detalle cada - Gatopedia.info","description":"Lore kimnu rastreadores de recuperación satelital.","url":"https://www.gatopedia.info/razas-de-gatos"}]}';

	echo $tag_start . $jsonld . $tag_end;
}
add_action('wp_head', 'add_jsonld_menu');

/* -------------------------------------------------------------------------------------------------------
 * CLEAN WP HEAD
 * http://cubiq.org/clean-up-and-optimize-wordpress-for-your-next-theme
------------------------------------------------------------------------------------------------------- */
function clean_wp_head_rastreator() {
	remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook
	remove_action( 'wp_head', 'wlwmanifest' ); //  Rel link in the header of every page
	remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );

	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'set_comment_cookies', 'wp_set_comment_cookies' ); // remove cookie when user comment
 	remove_action( 'admin_print_styles', 'print_emoji_styles' );
 	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
 	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

	add_filter( 'the_generator', '__return_false' );
	add_filter( 'show_admin_bar', '__return_false' );
	add_filter( 'emoji_svg_url', '__return_false' );
	add_filter( 'manifest', '__return_empty_string' );

	/* Remove API links */
	remove_action( 'wp_head', 'rest_output_link_wp_head' );
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
	remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );

	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
	remove_action('wp_head', 'start_post_rel_link', 10, 0 );
	remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
	remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
	add_filter( 'wpseo_prev_rel_link', '__return_empty_string' );

	remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
	remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
	remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
	remove_action( 'wp_head', 'index_rel_link' ); // index link

	// remove allowed tags in comments
	global $allowedtags;
	unset($allowedtags['cite']);
	unset($allowedtags['q']);
	unset($allowedtags['del']);
	unset($allowedtags['abbr']);
	unset($allowedtags['acronym']);
}
add_action( 'after_setup_theme', 'clean_wp_head_rastreator' );



function theme_support_rastreator() {

	register_nav_menus( array(
		'principal' => __( 'Menu principal', 'Menu principal' )
	) );

}
add_action( 'after_setup_theme', 'theme_support_rastreator' );

/* -------------------------------------------------------------------------------------------------------
 * NEW SCRIPT ENQUEUE
------------------------------------------------------------------------------------------------------- */
function migatito_enqueue_scripts() {
	$assets_url = get_stylesheet_directory_uri();
	
		if( ! is_front_page() ) {
			//wp_register_script('mg-scripts', $assets_url.'/js/main.min.dev.js', false, time(), true );
			//wp_enqueue_script( 'mg-scripts' );
			wp_register_style('mg-custom-css', $assets_url.'/vendor/swiper/swiper-bundle.min.css', false, time(), 'all');
			wp_enqueue_style('mg-custom-css');

			wp_register_script('mg-swiper-js', $assets_url.'/vendor/swiper/swiper-bundle.min.js', false, time(), true );
			wp_enqueue_script( 'mg-swiper-js' );
			wp_register_script('mg-purecounter-js', $assets_url.'/vendor/purecounter/purecounter_vanilla.js', false, time(), true );
			wp_enqueue_script( 'mg-purecounter-js' );

			wp_register_script('mg-theme-js', $assets_url.'/js/theme.min.js', false, time(), true );
			wp_enqueue_script( 'mg-theme-js' );

		} else {
			wp_register_script('mg-bootstrap-js', $assets_url.'/vendor/bootstrap/js/bootstrap.bundle.min.js', false, time(), true );
			wp_enqueue_script( 'mg-bootstrap-js' );

			/* wp_register_script('mg-aos-js', $assets_url.'/vendor/aos/aos.js', false, time(), true );
			wp_enqueue_script( 'mg-aos-js' ); */

			wp_register_script('mg-purecounter-js', $assets_url.'/vendor/purecounter/purecounter_vanilla.js', false, time(), true );
			wp_enqueue_script( 'mg-purecounter-js' );

			wp_register_script('mg-theme-js', $assets_url.'/js/theme.js', false, time(), true );
			wp_enqueue_script( 'mg-theme-js' );
		}
	
	//} 
	/* else {

		// PRODUCCION or TEST
		if( !is_front_page() ) {
			wp_register_script('rst-scripts', $assets_url.'/js/main.min.js', array('jquery'), filemtime(plugin_dir_path( __FILE__ ).'/js/main.min.js'), true );
			wp_enqueue_script( 'rst-scripts' );
		} else {
			wp_register_script('rst-front-scripts', $assets_url.'/js/front.min.js', array('jquery'), filemtime(plugin_dir_path( __FILE__ ).'/js/front.min.js'), true );
			wp_enqueue_script( 'rst-front-scripts' );
			wp_register_script('rst-banner-js', $assets_url.'/js/smartbanner.min.js', array('jquery'), filemtime(plugin_dir_path( __FILE__ ).'/js/smartbanner.min.js'), true );
			wp_enqueue_script( 'rst-banner-js' );
		}
	} */
}
add_action( 'wp_enqueue_scripts', 'migatito_enqueue_scripts');

/* -------------------------------------------------------------------------------------------------------
 * json ld de articulo
 * 
------------------------------------------------------------------------------------------------------- */
function add_json_ld_to_header() {
    // Verifica si estás en una página de un artículo individual
    if ( is_single() ) {
        $post = get_post(); // Obtiene la información del artículo actual
		$author = get_userdata($post->post_author);

        // Construye el fragmento JSON-LD
        $json_ld_data = array(
            "@context" => "http://schema.org",
            "@type" => "Article",
            "headline" => $post->post_title,
            "datePublished" => get_the_date('Y-m-d'),
            "dateModified" => get_the_modified_date('Y-m-d'),
            "author" => $author->data->display_name,
            "publisher" => array(
                "@type" => "Organization",
                "name" => get_bloginfo('name'),
                "logo" => get_template_directory_uri() . '/logo.png', // Cambia esto a la URL de tu logo
            ),
            //"description" => $post->post_excerpt, // Cambia esto a tu campo de descripción
            "mainEntityOfPage" => get_permalink(),
        );

        // Convierte el arreglo en una cadena JSON
        $json_ld_script = '<script type="application/ld+json">' . json_encode($json_ld_data) . '</script>';

        // Imprime el fragmento JSON-LD en el encabezado
        echo $json_ld_script;
    }
}

add_action('wp_head', 'add_json_ld_to_header');

/* -------------------------------------------------------------------------------------------------------
 * menu_principal
 * Creacion del menu principal que se muestra en menus dentro del CMS
------------------------------------------------------------------------------------------------------- */

/*function menu_principal(){
	wp_nav_menu( array(
		'menu' 			=> 'Menu principal',
		'menu_class' 	=> 'list-inline clearfix',
		'container' 	=> false
	) );
}*/


add_action ( 'init', function(){ require_once( get_template_directory() . '/inc/additional_functions.php' ); } );


?>