<?php

class SearchAction {
    public function render() {
        $args = [
            "@context" => "http://schema.org",
            "@type"    => "WebSite",
            "name"     => BLOG_NAME,
            "url"      => BLOG_URL,
            "potentialAction" => [
                "@type"       => "SearchAction",
                "target"      => BLOG_URL ."search/{query}",
                "query-input" => "required name=query",
            ]
        ];

        return $args;
    }
}
