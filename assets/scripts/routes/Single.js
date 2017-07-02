import 'whatwg-fetch';
import Vue from 'vue';
import mokuji from '../module/mokuji';
import common from '../module/common';

export default {
  init() {
    var article = document.getElementsByTagName('article')[0];
    var post_id = article.dataset.pageId;
    var entry = article.getElementsByClassName('entry-content')[0];
    common.addExternalLink(entry);
    common.zoomImage(entry);
    mokuji.init(entry);

    var app = new Vue({
      el: '.entry-related',
      data: {
        relatedData: null,
      },
      created: function () {
        this.fetchPostData();
      },
      methods: {
        fetchPostData: function () {
          var self = this;
          fetch(`/wp-json/wp/v2/posts/${post_id}`).then(function(response) {
            return response.json();
          }).then(function(json) {
            self.relatedData = json.related;
          });
        }
      }
    });
  },
  finalize() {}
};
