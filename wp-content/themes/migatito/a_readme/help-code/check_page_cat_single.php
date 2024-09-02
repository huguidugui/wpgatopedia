<?php 
if ( is_category() ) {
    /* $cat = get_category( get_query_var('cat') );
    echo $_SERVER['REQUEST_URI'];
    echo "<br>";
    echo '<pre>';
    var_dump( $cat);
    echo '</pre>';  */
    echo "category"; 
} elseif (is_single()) {
    echo "single"; 
} elseif (is_page()) {
    //echo $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    echo "<br>";
    echo "page"; 
}