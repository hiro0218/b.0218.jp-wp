import { cloneDeep } from 'lodash-es';
import api from '@scripts/api';
import { wait } from '@scripts/utils';
import { MODEL_POST, MODEL_POST_LIST } from '@scripts/models';

export default {
  loading({ commit }, flag) {
    if (flag) {
      commit('changeLoading', flag);
      return;
    }
    wait().then(() => {
      commit('changeLoading', flag);
    });
  },
  requestNavigation({ commit }) {
    api.getNavigation().then(response => {
      commit('setNavigation', response.data);
    });
  },
  requestAdvertise({ commit }) {
    api.getAds().then(response => {
      let data = response.data;

      let ads1 = {
        display: data.ads1.display,
        content: data.ads1.content,
        script: data.ads1.script,
      };

      let ads2 = {
        display: data.ads2.display,
        content: data.ads2.content,
        script: data.ads2.script,
      };

      let ads3 = {
        content: data.ads3.content,
        script: data.ads3.script,
      };

      commit('setAdvertise', { ads1, ads2, ads3 });
    });
  },
  requestPostList({ commit, dispatch }, route) {
    dispatch('loading', true);

    return api
      .getPostList({ meta: route.meta, params: route.params })
      .then(response => {
        commit('setReqestHeader', {
          total: Number(response.headers['x-wp-total']),
          totalpages: Number(response.headers['x-wp-totalpages']),
        });

        return response.data;
      })
      .then(data => {
        let postLists = [];

        for (let json of data) {
          let post = {};

          post.title = json.title.rendered;
          post.link = json.link;
          post.excerpt = json.excerpt.rendered;
          post.thumbnail = json.thumbnail;
          post.date = json.modified;

          postLists.push(post);
        }

        commit('setPostLists', postLists);
        dispatch('loading', false);
      });
  },
  requestSinglePost({ commit, dispatch }, route) {
    dispatch('loading', true);

    const response = (function() {
      let is_posts = (function() {
        if (route.meta.type === 'preview') {
          return route.query.p ? true : false;
        }
        return route.meta.type === 'post';
      })();
      let post_id = route.meta.id || route.query.p || route.query.page_id;
      let preview = route.query.preview;

      return is_posts ? api.getPosts(post_id, preview) : api.getPages(post_id, preview);
    })();

    return response.then(response => {
      let json = response.data;
      let post = cloneDeep(MODEL_POST);

      post.link = json.link;
      post.title = json.title.rendered;
      post.date.publish = json.date;
      post.date.modified =
        new Date(json.date).toDateString() === new Date(json.modified).toDateString() ? null : json.modified;
      post.content = json.content.rendered;
      post.categories = json.categories || post.categories;
      post.tags = json.tags || post.tags;
      post.amazon_product = json.amazon_product || post.amazon_product;

      commit('setPost', post);
      dispatch('loading', false);
    });
  },
  requestPostAttach({ commit }, route) {
    const POST = cloneDeep(MODEL_POST);
    return api.getAttachData(route.meta.id).then(response => {
      commit('setPostAttach', {
        relateds: response.data.related || POST.attach.relateds,
        pagers: response.data.pager || POST.attach.pagers,
      });
    });
  },
  resetPost({ commit }) {
    commit('setPost', cloneDeep(MODEL_POST));
  },
  resetPostList({ commit }) {
    commit('setPostLists', cloneDeep(MODEL_POST_LIST));
  },
};
