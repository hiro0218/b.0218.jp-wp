<div class='wrap'>
    <h2><?php _e('Setting', 'kiku'); ?></h2>
    <?php settings_errors(); ?>
    <form method="post" action="options.php">
        <?php
        settings_fields('kiku-settings-group');
        do_settings_sections('kiku-settings-group');
        ?>
        <table class="form-table">
            <tbody>
                <tr>
                    <th><label><?php _e('Amazon Product Advertising API', 'kiku'); ?></label></th>
                    <td>
                        <label><input type="text" name="kiku_amazon_api_key" class="regular-text" value="<?php echo get_option(
                          'kiku_amazon_api_key'
                        ); ?>" placeholder="access key id" /></label>
                        <label><input type="text" name="kiku_amazon_secret_key" class="regular-text" value="<?php echo get_option(
                          'kiku_amazon_secret_key'
                        ); ?>" placeholder="secret access key" /></label>
                        <label><input type="text" name="kiku_amazon_associate_tag" class="regular-text" value="<?php echo get_option(
                          'kiku_amazon_associate_tag'
                        ); ?>" placeholder="associate tag" /></label>
                    </td>
                </tr>
                <tr>
                    <th rowspan="4"><?php _e('Insert data', 'kiku'); ?></th>
                    <td>
                        <label>
                            <?php _e('Insert to <code>&lt;head&gt;</code> tag', 'kiku'); ?><br>
                            <textarea name="kiku_insert_data_head" rows="4" wrap="off" class="large-text"><?php echo get_option(
                              'kiku_insert_data_head'
                            ); ?></textarea>
                        </label>
                    </td>
                <tr>
                    <td>
                        <?php foreach (get_post_types() as $post_type): ?>
                        <?php if (in_array($post_type, ['post', 'page'])) {
                          echo '<label for="kiku_ads1_post_types_' . $post_type . '"> ';
                          echo '<input type="checkbox" value="' .
                            $post_type .
                            '" id="kiku_ads1_post_types_' .
                            $post_type .
                            '" name="kiku_ads1_post_types[]"';
                          if (!empty(get_option('kiku_ads1_post_types'))) {
                            if (in_array($post_type, get_option('kiku_ads1_post_types'))) {
                              echo ' checked="checked"';
                            }
                          }
                          echo ' />' . $post_type . '</label>';
                        } ?>
                        <?php endforeach; ?>
                        <div>
                            <label>
                                <?php _e('Insert to the bottom of <code>&lt;!--more--&gt;</code>', 'kiku'); ?><br>
                                <code><?php _e('Element code', 'kiku'); ?></code>
                                <textarea name="kiku_ads1_content" rows="8" wrap="off" class="large-text"><?php echo get_option(
                                  'kiku_ads1_content'
                                ); ?></textarea>
                            </label>
                        </div>
                        <div>
                            <label>
                                <code><?php _e('Script code', 'kiku'); ?></code>
                                <textarea name="kiku_ads1_script" rows="2" wrap="off" class="large-text" placeholder="example: (adsbygoogle = window.adsbygoogle || []).push({});"><?php echo get_option(
                                  'kiku_ads1_script'
                                ); ?></textarea>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input name="kiku_ads1_more_tag_option" value="1" <?php echo get_option(
                                  'kiku_ads1_more_tag_option'
                                )
                                  ? 'checked="checked"'
                                  : ''; ?> type="checkbox">
                                <?php _e(
                                  'If the <code>&lt;!--more--&gt;</code> does not exist, to insert the data at the top of the post/page.',
                                  'kiku'
                                ); ?><br>
                            </label>
                        </div>
                    </td>
                </tr>
                </tr>
                <tr>
                    <td>
                        <?php foreach (get_post_types() as $post_type) {
                          if (in_array($post_type, ['post', 'page'])) {
                            echo '<label for="kiku_ads2_post_types_' . $post_type . '"> ';
                            echo '<input type="checkbox" value="' .
                              $post_type .
                              '" id="kiku_ads2_post_types_' .
                              $post_type .
                              '" name="kiku_ads2_post_types[]"';
                            if (!empty(get_option('kiku_ads2_post_types'))) {
                              if (in_array($post_type, get_option('kiku_ads2_post_types'))) {
                                echo ' checked="checked"';
                              }
                            }
                            echo ' />' . $post_type . '</label>';
                          }
                        } ?>
                        <label>
                            <?php _e('Insert to the bottom of content', 'kiku'); ?><br>
                            <code><?php _e('Element code', 'kiku'); ?></code>
                            <textarea name="kiku_ads2_content" rows="8" wrap="off" class="large-text"><?php echo get_option(
                              'kiku_ads2_content'
                            ); ?></textarea>
                        </label>
                        <label>
                            <?php _e('Insert to the bottom of content', 'kiku'); ?><br>
                            <code><?php _e('Script code', 'kiku'); ?></code>
                            <textarea name="kiku_ads2_script" rows="2" wrap="off" class="large-text" placeholder="example: (adsbygoogle = window.adsbygoogle || []).push({});"><?php echo get_option(
                              'kiku_ads2_script'
                            ); ?></textarea>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <?php _e('Insert advertisement content at the top of pagination. (home)', 'kiku'); ?><br>
                            <code><?php _e('Element code', 'kiku'); ?></code>
                            <textarea name="kiku_ads3_content" rows="8" wrap="off" class="large-text"><?php echo get_option(
                              'kiku_ads3_content'
                            ); ?></textarea>
                        </label>
                        <label>
                            <code><?php _e('Script code', 'kiku'); ?></code>
                            <textarea name="kiku_ads3_script" rows="2" wrap="off" class="large-text" placeholder="example: (adsbygoogle = window.adsbygoogle || []).push({});"><?php echo get_option(
                              'kiku_ads3_script'
                            ); ?></textarea>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th><?php _e('Filter in Front Page', 'kiku'); ?></th>
                    <td>
                        <label>
                            <p><?php _e('Comma-separated list of category IDs', 'kiku'); ?></p>
                            <input type="text" name="kiku_exclude_category_frontpage" class="regular-text" value="<?php echo get_option(
                              'kiku_exclude_category_frontpage'
                            ); ?>" id="kiku_exclude_category_frontpage" />
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
        <?php submit_button(); ?>
    </form>
</div>
