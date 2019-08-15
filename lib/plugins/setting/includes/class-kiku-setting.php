<?php
require_once LIB_PATH . 'plugins/Template/Kiku-base.php';
require_once LIB_PATH . 'plugins/Template/Kiku-loader.php';
// require_once LIB_PATH . 'plugins/Template/Kiku-i18n.php';
require_once LIB_PATH . 'plugins/setting/admin/class-kiku-setting-admin.php';

class Kiku_Setting extends Kiku_base
{
  public function __construct()
  {
    $this->plugin_name = 'kiku-setting';
    $this->version = '1.0.0';

    $this->load_dependencies();
    $this->define_admin_hooks();
  }

  private function load_dependencies()
  {
    $this->loader = new Kiku_Loader();
  }

  private function define_admin_hooks()
  {
    $plugin_admin = new Kiku_Setting_Admin($this->get_plugin_name(), $this->get_version());

    $this->loader->add_action('admin_menu', $plugin_admin, 'add_admin_page');
  }
}
