import api from '@scripts/api';
import mokuji from '@scripts/module/mokuji';
import common from '@scripts/module/common';

// vue components
import amazonProduct from '@components/amazon-product.vue';
import entryBreadcrumb from '@components/entry-breadcrumb.vue';
import entryCategory from '@components/entry-category.vue';
import entryTag from '@components/entry-tag.vue';
import entryTime from '@components/entry-time.vue';
import entryShare from '@components/entry-share.vue';
import entryRelated from '@components/entry-related.vue';
import entryPager from '@components/entry-pager.vue';

export default {
  init() {
    new Vue({
      el: '#app',
      components: {
        amazonProduct,
        entryCategory,
        entryTag,
        entryTime,
        entryBreadcrumb,
        entryShare,
        entryRelated,
        entryPager,
      },
      data: {
        isPost: WP.page_type === 'posts',
        post: {
          link: '',
          title: '',
          content: '',
          date: {
            publish: null,
            modified: null,
          },
          categories: [],
          amazon_product: null,
          tags: [],
        },
        relateds: [],
        pagers: {},
      },
      created: function() {
        this.requestPostData();
      },
      methods: {
        requestPostData: function() {
          var response = WP.page_type === 'posts' ? api.getPosts(WP.page_id) : api.getPages(WP.page_id);

          response
            .then(response => {
              let json = response.data;

              this.setDatetime(json);
              this.post.link = json.link;
              this.post.title = json.title.rendered;
              this.post.content = json.content.rendered;
              this.post.categories = json.categories || this.categories;
              this.post.tags = json.tags || this.tags;
              this.post.amazon_product = json.amazon_product || this.amazon_product;
            })
            .then(() => {
              this.$nextTick().then(() => {
                var element = this.$el.querySelector('.entry-content');
                mokuji.init(element);
                common.addExternalLink(element);
                common.setTableContainer(element);
                common.zoomImage(element);
                Prism.highlightAll();
                this.viewAttachedInfo();
              });
            });
        },
        requestAttachedData: function(target) {
          var response = api.getAttachData(WP.page_id);

          response.then(response => {
            let json = response.data;
            this.relateds = json.related || this.relateds;
            this.pagers = json.pager || this.pagers;

            return true;
          });
        },
        setDatetime: function(json) {
          this.post.date.publish = json.date;
          this.post.date.modified = this.isSameDay(json.date, json.modified) ? null : json.modified;
        },
        isSameDay: function(publish, modified) {
          return new Date(publish).toDateString() === new Date(modified).toDateString();
        },
        viewAttachedInfo: function() {
          if (!this.isPost) {
            return;
          }

          var target = this.$el.querySelector('.entry-footer');
          var clientHeight = document.documentElement.clientHeight;
          var observer = new IntersectionObserver(changes => {
            changes.forEach(change => {
              var rect = change.target.getBoundingClientRect();
              var isShow =
                (0 < rect.top && rect.top < clientHeight) ||
                (0 < rect.bottom && rect.bottom < clientHeight) ||
                (0 > rect.top && rect.bottom > clientHeight);
              if (isShow) {
                this.requestAttachedData(change.target);
                observer.unobserve(change.target);
              }
            });
          });
          observer.observe(target);
        },
      },
    });
  },
};
