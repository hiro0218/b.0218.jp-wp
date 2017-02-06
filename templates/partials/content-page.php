<?php while (have_posts()) : the_post(); ?>
<article class="entry">
  <header>
    <h1 class="entry-title"><?php the_title(); ?></h1>
    <?php get_template_part('partials/entry/meta'); ?>
  </header>
  <div class="entry-content">
    <?php the_content(); ?>
  </div>
  <footer>
    <nav>
      <?php get_template_part('partials/entry/breadcrumb'); ?>
    </nav>
  </footer>
</article>
<?php endwhile; ?>
