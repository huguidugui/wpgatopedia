<?php
/*
	Template Name: 404
*/

// File Security Check
if ( ! defined( 'ABSPATH' ) ) { exit; }

//add_filter('body_class','custom_error_class');
?>

<?php get_header(); // prints theme header ?>


<section id="hero" class="hero d-flex align-items-center">
	<div class="container">
        
		
		<div class="row">
			<div class="col-md-9 col-lg-9">
				<h1>Lo sentimos, página web actualmente no disponible...</h1>
				<p class="mt-2">
                    Quizás alguna de las siguientes herramientas te puedan ser de utilidad:
                </p>
			</div>
			<div class="col-md-3 col-lg-3 d-flex flex-column justify-content-center align-items-center mt-lg-0 mt-md-0 mt-sm-0 mt-3">
                <p>¿Necesitas ayuda? </p>
                
			</div>
		</div>
        <div class="row">
			<div class="col-6 hr-bottom page-404 pb-4">
                
            </div>
            <div class="col-6 hr-bottom page-404 pb-4">
                
            </div>
        </div>
        <div class="row my-5">
            <div class="col-12">
               
            </div>
        </div>
	</div>
</section>

<?php get_footer(); // prints theme footer ?>
