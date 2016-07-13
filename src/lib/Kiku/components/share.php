<?php
namespace Kiku\Components;

function the_share($twitter_flg = true, $facebook_flg = true, $hatena_flg = true, $line_flg = true) {
    if ( !is_singular() ) {
        return;
    }

    $title = the_title_attribute('echo=0');
    $title_encode = urlencode($title);
    $url_esc = esc_url(get_permalink());
    $lang = get_locale();

    $tooltip_twitter = __('Share on Twitter.', 'kiku');
    $tooltip_facebook = __('Share on Facebook.', 'kiku');
    $tooltip_hatena = __('Share on Hatena.', 'kiku');

    $twitter = <<< EOM
    <li>
        <a href="//twitter.com/share?url=$url_esc&text=$title"
        class="btn-twitter" title="{$tooltip_twitter}"
        rel="nofollow" onclick="openWindow(this.href,640,300); return false;">twitter</a>
    </li>
EOM;

    $facebook = <<< EOM
    <li>
        <a href="//www.facebook.com/sharer/sharer.php?u=$url_esc"
        class="btn-facebook" title="{$tooltip_facebook}"
        rel="nofollow" onclick="openWindow(this.href); return false;">facebook</a>
    </li>
EOM;

    $hatena = <<< EOM
    <li>
        <a href="//b.hatena.ne.jp/entry/$url_esc"
        class="hatena-bookmark-button btn-hatena"
        data-hatena-bookmark-title="$title"
        data-hatena-bookmark-layout="simple"
        title="{$tooltip_hatena}"
        rel="nofollow">hatena</a>
    </li>
EOM;

    $line = <<< EOM
    <li>
        <div class="line-it-button" style="display: none;" data-type="share-d" data-lang="{$lang}"></div>
    </li>
EOM;


    echo '<ul class="entry-share">';
    echo $twitter;
    echo $facebook;
    echo $hatena;
    echo $line;
    echo '</ul>';

    echo get_share_script();
}

function get_share_script() {
return <<< EOM
<script src="//scdn.line-apps.com/n/line_it/thirdparty/loader.min.js" async="async" defer="defer"></script>
<script src="//b.st-hatena.com/js/bookmark_button.js" defer="defer" async="async"></script>
<script>
function openWindow(href, w, h) {
    var w = (w) ? w : 480,
    h = (h) ? h : 450,
    x = (screen.width/2) - (w/2),
    y = (screen.height/2) - (h/2);
    var features = "width="+ w +",height="+ h +",top="+ y +",left="+ x +",menubar=0,toolbar=0,directories=0,toolbar=0,status=0,resizable=0";

    window.open(href, '', features);
    return false;
}
</script>
EOM;
}