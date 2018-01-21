<?php while (have_posts()) : the_post(); ?>
<div class="container">
  <article class="entry">
    <header>
      <h1 class="entry-title" v-html="$options.filters.escapeBrackets(title)"></h1>
      <div class="entry-meta">
        <entry-time :date="date"></entry-time>
        <entry-category :categories="categories"></entry-category>
      </div>
    </header>
    <section class="entry-content" v-html="content"></section>
    <footer>
      <?php get_template_part('partials/entry/breadcrumb'); ?>
    </footer>
  </article>
</div>
<?php endwhile; ?>
