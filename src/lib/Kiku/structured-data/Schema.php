<?php

class Schema {
    public function __construct() {}

    private function make_script_tag(string $json) {
        $script = '<script type="application/ld+json">'. PHP_EOL .'%s</script>'. PHP_EOL;
        return sprintf($script, $json);
    }

    private function array_to_json($array) {
        return json_encode($array, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ). PHP_EOL;
    }

    public function make_article() {
        require_once(realpath(__DIR__) .DIRECTORY_SEPARATOR .'Article.php');
        $Article = new Article();
        $array = $Article->render();
        if ($array) {
            echo $this->make_script_tag($this->array_to_json($array));
        }
    }

    public function make_blog_posting() {
        require_once('BlogPosting.php');
        $BlogPosting = new BlogPosting();
        $BlogPosting->render();
    }

    public function make_breadcrumb_list() {
        require_once('BreadcrumbList.php');
        $BreadcrumbList = new BreadcrumbList();
        $BreadcrumbList->render();
    }

    public function make_website() {
        require_once('WebSite.php');
        $WebSite = new WebSite();
        $WebSite->render();
    }

}
