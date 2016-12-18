<footer id="footer" class="footer-navigation mdl-mini-footer">
  <div class="mdl-mini-footer__left-section">
    <?php if (has_nav_menu('primary_navigation')): ?>
      <nav><?php wp_nav_menu([
        'container' => '',
        'theme_location' => 'primary_navigation',
        'menu_class' => 'mdl-mini-footer__link-list'
      ]);?></nav>
    <?php endif; ?>
  </div>
  <div class="mdl-mini-footer__right-section">
    <span>&copy; <?php echo Kiku\Util::get_copyright_year(); ?> <a href="<?= BLOG_URL; ?>"><?= BLOG_NAME; ?></a>.</span>
  </div>
</footer>
