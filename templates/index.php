<?php if (!have_posts()) : ?>
<div class="mdl-cell mdl-cell--12-col mdl-card mdl-color--transparent">
  <div class="alert alert-warning">
    <?php Kiku\Components\the_alert('alert-warning', 'Sorry, no results were found.', 'sage');  ?>
  </div>
</div>
<?php else: ?>
<div class="entry-home-container mdl-cell mdl-cell--12-col">
  <?php get_template_part('components/page-header'); ?>
  <?php while (have_posts()) : the_post(); ?>
    <?php get_template_part('partials/content', 'home'); ?>
  <?php endwhile; ?>
</div>
<?php endif; ?>
