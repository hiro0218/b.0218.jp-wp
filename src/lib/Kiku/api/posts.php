<?php
add_action('rest_api_init', function() {
    // related posts
    register_rest_field('post', 'related', [
        'get_callback' => function($object, $field_name, $request) {
            global $Entry;
            return $Entry->get_similar_posts(RELATED_POST_NUM, $object['id']);
        },
        'update_callback' => null,
        'schema' => null,
    ]);

    // next/prev posts
    register_rest_field('post', 'pager', [
        'get_callback' => function($object, $field_name, $request) {
            global $Entry;
            return $Entry->pager($object['id']);
        },
        'update_callback' => null,
        'schema' => null,
    ]);

    // amazon product data
    register_rest_field('post', 'content', [
        'get_callback' => function($object, $field_name, $request) {
            global $post;
            $post = get_post($object['id']);
            $product_data = json_decode(get_post_meta($post->ID, CF_AMAZON_PRODUCT_TAG, true));
            $object['content']['amazon_product'] = $product_data;
            return $object['content'];
        },
        'update_callback' => null,
        'schema' => null,
    ]);

    // post thumbnail
    register_rest_field('post', 'thumbnail', [
        'get_callback' => function($object, $field_name, $request) {
            global $Image;
            $url = $Image->get_entry_image(true, $object['id']);
            return empty($url) ? null : $url;
        },
        'update_callback' => null,
        'schema' => null,
    ]);
});

// Global javaScript variables
add_action('wp_head', function () {
    $vars = [
        'per_page' => (int)get_option('posts_per_page'),
        'paged' => (int)(get_query_var('paged')) ? get_query_var('paged') : 1,
    ];
    $vars = json_encode($vars, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

    echo '<script>';
    echo 'var WP = '. $vars;
    echo '</script>'. PHP_EOL;
});
