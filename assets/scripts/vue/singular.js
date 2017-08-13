/* global Prism WP */
import Vue from 'vue';
import NProgress from 'nprogress/nprogress.js';
import ago from 's-ago';
import InView from 'inview';
import mokuji from '../module/mokuji';
import common from '../module/common';

module.exports = {
  init() {
    var article = document.getElementsByTagName('article')[0];
    var post_id = WP.page_id;
    var page_type = WP.page_type;
    if (!post_id || !page_type) {
      return;
    }

    var app = new Vue({
      el: '#app',
      data: {
        loaded: false,
        date: {
          publish: null,
          modified: null,
          timeAgo: null,
        },
        categories: null,
        amazon_product: null,
        tags: null,
        relateds: null,
        pagers: null,
      },
      beforeCreate: function () {
        NProgress.start();
      },
      created: function () {
        this.requestPostData(post_id, page_type);
        NProgress.inc();
      },
      mounted: function () {
        this.requestCategoryData(post_id);
        this.requestTagData(post_id);
      },
      watch: {
        loaded: function (data) {
          var self = this;
          NProgress.done();
          // After displaying DOM
          this.$nextTick(function() {
            var entry = this.$el.getElementsByClassName('entry-content')[0];
            if (entry) {
              common.addExternalLink(entry);
              common.zoomImage(entry);
              mokuji.init(entry);
              Prism.highlightAll();
            }
            self.viewAttachedInfo();
          });
        }
      },
      methods: {
        requestXHR: function(url, callback) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200) {
              callback(this.response);
            }
          };
          xhr.responseType = 'json';
          xhr.open('GET', url, true);
          xhr.send();
        },
        requestPostData: function (post_id, page_type) {
          var self = this;
          self.requestXHR(`/wp-json/wp/v2/${page_type}/${post_id}`, function(json) {
            self.setDatetime(json);
            self.loaded = true;
          });
        },
        requestAttachedData: function (post_id, page_type) {
          if (page_type !== 'posts') {
            return;
          }

          var self = this;
          self.requestXHR(`/wp-json/kiku/v1/post/${post_id}`, function(json) {
            self.amazon_product = json.amazon_product;
            self.relateds = json.related;
            self.pagers = json.pager;
          });
        },
        requestCategoryData: function (post_id) {
          if (page_type !== 'posts') {
            return;
          }

          var self = this;
          self.requestXHR(`/wp-json/wp/v2/categories?post=${post_id}`, function(json) {
            if (json.length !== 0) {
              self.categories = json;
            }
          });
        },
        requestTagData: function (post_id) {
          if (page_type !== 'posts') {
            return;
          }

          var self = this;
          self.requestXHR(`/wp-json/wp/v2/tags?post=${post_id}`, function(json) {
            if (json.length !== 0) {
              self.tags = json;
            }
          });
        },
        setDatetime: function (json) {
          this.date.publish = json.date;
          this.date.modified = (json.date !== json.modified) ? json.modified : null;
          this.date.timeAgo = ago(new Date(json.modified));
        },
        viewAttachedInfo: function () {
          var self = this;
          var target = document.getElementById('article-attached-info');
          var inview = InView(target, function(isInView, data) {
            if (isInView) {
              self.requestAttachedData(post_id, page_type);
              this.destroy();
            }
          });
        },
      },
      filters: {
        formatDate: function(date) {
          if (!date) {
            return;
          }
          if (typeof date === 'string') {
            date = new Date(date);
          }
          return date.toISOString().split('T')[0].replace(/-/g , '/');
        }
      }
    });
  },
};
