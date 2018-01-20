<?php while (have_posts()) : the_post(); ?>
<div class="container">
  <article class="entry">
    <header class="entry-header">
      <h1 class="entry-title"><?php echo esc_html(get_the_title()); ?></h1>
      <div class="entry-meta">
        <?php get_template_part('partials/entry-time'); ?>
        <entry-category :categories="categories"></entry-category>
      </div>
    </header>
    <section class="entry-content">
      <?php the_content(); ?>
    </section>
    <amazon-product :amazon_product="amazon_product"></amazon-product>
    <footer>
      <?php get_template_part('partials/entry-breadcrumb'); ?>
      <entry-tag :tags="tags"></entry-tag>
      <?php get_template_part('partials/entry-share'); ?>
    </footer>
  </article>
</div>
<aside class="attached-info">
  <entry-related :relateds="relateds"></entry-related>
  <entry-pager :pagers="pagers"></entry-pager>
</aside>
<?php endwhile; ?>
