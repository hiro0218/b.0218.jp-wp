<?php
/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
  // Make theme available for translation
  // load_theme_textdomain('kiku', get_template_directory() . '/lang');

  /**
   * Enable plugins to manage the document title
   * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
   */
  add_theme_support('title-tag');

  /**
   * Register navigation menus
   * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
   */
  register_nav_menus(['primary_navigation' => __('Primary Navigation', 'kiku')]);

  /**
   * Enable post thumbnails
   * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
   */
  add_theme_support('post-thumbnails');

  /**
   * Enable HTML5 markup support
   * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
   */
  add_theme_support('html5', ['caption', 'gallery']);
});

/**
 * Register sidebars
 */
// add_action('widgets_init', function () {
//   register_sidebar([
//     'name'          => __('Primary', 'kiku'),
//     'id'            => PRIMARY_SIDEBAR_NAME,
//     'before_widget' => '<section class="widget %1$s %2$s">',
//     'after_widget'  => '</section>',
//     'before_title'  => '<h3 class="widget-title">',
//     'after_title'   => '</h3>'
//   ]);
// });
