<?php

class Widget {
    public function __construct() {
        add_filter('wp_list_categories', [$this, 'format_wp_list_categories'], 10, 2);
        add_filter('wp_nav_menu_items', [$this, 'remove_nav_menu_item_whitespace']);
        add_filter('widget_categories_args', [$this, 'order_widget_categories']);
        add_filter('widget_posts_args', [$this, 'exclude_category_posts']);
        if (is_admin()) {
            add_action('widgets_init', [$this, 'disabled_admin_page_widgets'], 11);
        }
    }

    // http://b.0218.jp/20130521115431.html
    public function format_wp_list_categories($output, $args) {
        $output = preg_replace('/ title=\"(.*?)\"/', '', $output);
        $output = preg_replace('/ class=\"(.*?)\"/', '', $output);
        $output = preg_replace('/[\[()\]]/', '', $output);
        $output = preg_replace('/<\/a> ([\d]+)/', ' <span class="count">(\1)</span></a>', $output);

        return \Kiku\Util::remove_white_space($output);
    }

    // https://gist.github.com/jeremyfelt/2353300
    public function remove_nav_menu_item_whitespace( $items ) {
        return \Kiku\Util::remove_white_space($items);
    }

    public function order_widget_categories($cat_args) {
        $cat_args['show_counts']  = 1;
        $cat_args['pad_counts']   = 1;
        $cat_args['hierarchical'] = 1;
        $cat_args['depth']        = 0;
        $cat_args['orderby']      = 'count';
        $cat_args['order']        = 'DESC';
        $cat_args['hide_empty']   = 1;
        $cat_args['use_desc_for_title'] = 0;
        //$cat_args['number'] = 10;

        return $cat_args;
    }

    public function exclude_category_posts($args) {
        $cats_str = get_option('kiku_exclude_category_frontpage');

        if (!empty($cats_str)) {
            $args['category__not_in'] = explode(",", $cats_str);
        }

        return $args;
    }

    public function disabled_admin_page_widgets() {
        // unregister_widget('WP_Widget_Pages');
        unregister_widget('WP_Widget_Calendar');
        unregister_widget('WP_Widget_Archives');
        unregister_widget('WP_Widget_Links');
        // unregister_widget('WP_Widget_Meta');
        unregister_widget('WP_Widget_Search');
        unregister_widget('WP_Widget_Text');
        // unregister_widget('WP_Widget_Categories');
        // unregister_widget('WP_Widget_Recent_Posts');
        unregister_widget('WP_Widget_Recent_Comments');
        unregister_widget('WP_Widget_RSS');
        unregister_widget('WP_Widget_Tag_Cloud');
        // unregister_widget('WP_Nav_Menu_Widget');
    }

}

$Widget = new Widget();
