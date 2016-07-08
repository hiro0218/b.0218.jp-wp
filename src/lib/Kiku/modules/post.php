<?php
namespace Kiku\Modules;

// 省略文字数
function new_excerpt_length($length) {
    return EXCERPT_LENGTH;
}
add_filter('excerpt_length',   __NAMESPACE__ . '\\new_excerpt_length');
add_filter('excerpt_mblength', __NAMESPACE__ . '\\new_excerpt_length');

// 省略記号
function new_excerpt_more() {
    return EXCERPT_HELLIP;
}
add_filter('excerpt_more', __NAMESPACE__ . '\\new_excerpt_more');
add_filter('the_excerpt', ["Kiku\Util",'get_excerpt_content']);

// Sort Post query
function sort_query($query) {
    // influence: admin page's post list
    if ( $query->is_main_query()  ) {
        $query->set('orderby', 'modified');
        $query->set('order', 'desc');
    }

    return $query;
}
add_action( 'pre_get_posts',  __NAMESPACE__ . '\\sort_query' );

// remove page from search result
function remove_page_from_search_result($query) {
    if ( $query->is_search() ) {
        $query->set('post_type', 'post');
    }
    return $query;
}
add_action( 'pre_get_posts', __NAMESPACE__ . '\\remove_page_from_search_result' );

// Bug? (Wordpress 4.3)
// DataURI form CustomField is destroyed.
function repair_destroyed_datauri($content) {
    if ( !is_singular() ) {
        return $content;
    }
    return str_replace( ' src="image/', ' src="data:image/', $content );
}
add_filter('the_content', __NAMESPACE__ . '\\repair_destroyed_datauri', 11);
