<?php

class REST_API {
    public function __construct() {
    }

    public function get_api_namespace() {
        return 'kiku/v1';
    }

    // To decimate API information.
    public function unset_api_data($response, $post, $request) {
        unset($response->data['date_gmt']);
        unset($response->data['modified_gmt']);
        unset($response->data['guid']);
        unset($response->data['type']);
        unset($response->data['author']);
        unset($response->data['slug']);
        unset($response->data['content']);
        unset($response->data['status']);
        unset($response->data['featured_media']);
        unset($response->data['comment_status']);
        unset($response->data['ping_status']);
        unset($response->data['sticky']);
        unset($response->data['template']);
        unset($response->data['format']);

        return $response;
    }

    public function rest_api_init() {
        register_rest_route($this->get_api_namespace(), '/post/(?P<id>\d+)', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => function($data) {
                $post_id = $data['id'];
                if (empty($post_id)) {
                    return null;
                }

                global $Entry, $post;
                $array = [];

                // related posts
                $related = $Entry->get_similar_posts(RELATED_POST_NUM, $post_id);
                // pager
                $pager = $Entry->pager($post_id);

                // set
                $array = [
                    'related' => $related,
                    'pager' => $pager,
                ];

                return $array;
            },
        ]);

        register_rest_route($this->get_api_namespace(), '/navigation', [
            'methods'  => WP_REST_Server::READABLE,
            'callback' => function($data) {
                return [
                    'site' => [
                        'name' => BLOG_NAME,
                        'url' => BLOG_URL,
                        'copyright' => "© " . Kiku\Util::get_copyright_year(),
                    ],
                    'header' => [],
                    'footer' => [
                        'menu' => $this->get_menus(),
                    ]
                ];
            }
        ]);

        // amazon product data
        register_rest_field('post', 'amazon_product', [
            'get_callback' => function($object, $field_name, $request, $type) {
                if (!$this->is_postId_route($request, $type)) {
                    return null;
                }
                global $post;
                $post = get_post($object['id']);
                $product_data = json_decode(get_post_meta($post->ID, CF_AMAZON_PRODUCT_TAG, true));
                return $product_data;
            },
            'update_callback' => null,
            'schema' => null,
        ]);

        // post category
        register_rest_field('post', 'categories', [
            'get_callback' => function($object, $field_name, $request, $type) {
                global $Entry;
                $object['categories'] = $Entry->get_category();
                return $object['categories'];
            },
            'update_callback' => null,
            'schema' => null,
        ]);

        // post tags
        register_rest_field('post', 'tags', [
            'get_callback' => function($object, $field_name, $request, $type) {
                global $Entry;
                $object['tags'] = $Entry->get_tag();
                return $object['tags'];
            },
            'update_callback' => null,
            'schema' => null,
        ]);

        // post thumbnail
        register_rest_field('post', 'thumbnail', [
            'get_callback' => function($object, $field_name, $request, $type) {
                global $Image;
                $url = $Image->get_entry_image($object['id'], false, 'thumbnail');
                return empty($url) ? null : $url;
            },
            'update_callback' => null,
            'schema' => null,
        ]);
    }


    public function get_menus() {
        if (!has_nav_menu(PRIMARY_NAVIGATION_NAME)) {
            return null;
        }

        $menu_ids = get_nav_menu_locations();
        $menus = wp_get_nav_menu_items($menu_ids[PRIMARY_NAVIGATION_NAME]);
        $array = [];

        foreach ($menus as $menu) {
            $menu_array = (array) $menu;
            $array[] = [
                'ID' => $menu_array['ID'],
                'title' => $menu_array['title'],
                'url' => $menu_array['url'],
            ];
        }

        return $array;
    }

    private function is_postId_route($request, $type) {
        if ($type !== 'post') {
            return false;
        }

        $route = preg_split('/\//', $request->get_route());
        $post_id = (int)end($route);

        return ($post_id === 0) ? false : true;
    }
}

$REST_API = new REST_API();
add_filter('rest_prepare_post', [$REST_API, 'unset_api_data'], 10, 3);
add_filter('rest_prepare_page', [$REST_API, 'unset_api_data'], 10, 3);
add_action('rest_api_init', [$REST_API, 'rest_api_init']);
