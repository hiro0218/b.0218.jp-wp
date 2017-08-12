<article class="entry">
  <template v-if="loaded">
    <header>
      <h1 class="entry-title"><?php echo esc_html(get_the_title()); ?></h1>
      <div class="entry-meta">
        <?php get_template_part('partials/entry/time'); ?>
        <?php get_template_part('partials/entry/category'); ?>
      </div>
    </header>
    <section class="entry-content">
      <?php the_content(); ?>
    </section>
    <footer>
      <?php get_template_part('partials/entry/breadcrumb'); ?>
    </footer>
  </template>
  <template v-else>
    <?php get_template_part('partials/placeholder/single'); ?>
  </template>
</article>
