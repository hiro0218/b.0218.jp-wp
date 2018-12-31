<?php

class Posts
{
  public function __construct()
  {
    add_action('pre_get_posts', [$this, 'set_pre_get_posts']);
    add_filter('the_content', [$this, 'repair_destroyed_datauri'], 11);
    add_filter('the_excerpt', ["Util", 'get_excerpt_content']);
    add_filter('excerpt_length', [$this, 'change_excerpt_length']);
    add_filter('excerpt_mblength', [$this, 'change_excerpt_length']);
    add_filter('excerpt_more', [$this, 'change_excerpt_more']);
    remove_filter('sanitize_title', 'sanitize_title_with_dashes');
    add_filter('sanitize_title', [$this, 'sanitize_title_with_dots_and_dashes']);
    add_filter('name_save_pre', [$this, 'name_save_pre']);
    add_filter('wp_insert_term_data', [$this, 'wp_insert_term_data']);
  }

  // 省略文字数
  public function change_excerpt_length($length)
  {
    return EXCERPT_LENGTH;
  }

  // 省略記号
  public function change_excerpt_more()
  {
    return EXCERPT_HELLIP;
  }

  public function set_pre_get_posts($query)
  {
    $query = $this->sort_query($query);
    $query = $this->remove_page_from_search_result($query);

    return $query;
  }

  // Sort Post query
  private function sort_query($query)
  {
    // influence: admin page's post list
    if ($query->is_main_query()) {
      $query->set('orderby', 'modified');
      $query->set('order', 'desc');
    }

    return $query;
  }

  // remove page from search result
  private function remove_page_from_search_result($query)
  {
    if ($query->is_search()) {
      $query->set('post_type', 'post');
    }

    return $query;
  }

  // Bug? (Wordpress 4.3)
  // DataURI form CustomField is destroyed.
  public function repair_destroyed_datauri($content)
  {
    $content = $this->replace_relative_to_absolute_img_src($content);

    return str_replace(' src="image/', ' src="data:image/', $content);
  }

  private function replace_relative_to_absolute_img_src($content)
  {
    preg_match_all('/<img.*?src=(["\'])(.+?)\1.*?>/i', $content, $matches);

    foreach ($matches[2] as $src_url) {
      // to Absolute URL
      if (Util::is_image($src_url)) {
        $src_absolute_url = Util::relative_to_absolute_url($src_url);
        $content = str_replace('src="' . $src_url, 'src="' . $src_absolute_url, $content);
      }
    }

    return $content;
  }

  public function sanitize_title_with_dots_and_dashes($title)
  {
    $title = strip_tags($title);
    // Preserve escaped octets.
    $title = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $title);
    // Remove percent signs that are not part of an octet.
    $title = str_replace('%', '', $title);
    // Restore octets.
    $title = preg_replace('|---([a-fA-F0-9][a-fA-F0-9])---|', '%$1', $title);
    $title = remove_accents($title);

    if (seems_utf8($title)) {
      if (function_exists('mb_strtolower')) {
        $title = mb_strtolower($title, 'UTF-8');
      }
      $title = utf8_uri_encode($title);
    }

    $title = strtolower($title);
    $title = preg_replace('/&.+?;/', '', $title); // kill entities
    $title = preg_replace('/[^%a-z0-9 ._-]/', '', $title);
    $title = preg_replace('/\s+/', '-', $title);
    $title = preg_replace('|-+|', '-', $title);
    $title = trim($title, '-');
    $title = str_replace('-.-', '.', $title);
    $title = str_replace('-.', '.', $title);
    $title = str_replace('.-', '.', $title);
    $title = preg_replace('|([^.])\.$|', '$1', $title);
    $title = trim($title, '-'); // yes, again

    return $title;
  }

  public function name_save_pre($post_name)
  {
    global $post, $wp_rewrite;

    // generate permalink
    $post_date = $post->post_date;
    $post_date = date_parse($post_date);

    $slug = $wp_rewrite->permalink_structure;
    $slug = str_replace('%year%', $post_date['year'], $slug);
    $slug = str_replace('%monthnum%', $post_date['month'], $slug);
    $slug = str_replace('%day%', $post_date['day'], $slug);
    $slug = str_replace('%hour%', $post_date['hour'], $slug);
    $slug = str_replace('%minute%', $post_date['minute'], $slug);
    $slug = str_replace('%second%', $post_date['second'], $slug);

    $post_name = $slug;

    return $post_name;
  }

  public function wp_insert_term_data($data, $taxonomy, $args)
  {
    if (!empty($data) && empty($args['slug'])) {
      ver_damp($data);
      // $data['slug'] = ;
    }

    return $data;
  }
}

$Posts = new Posts();
