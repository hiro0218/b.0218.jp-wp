import localforage from 'localforage';
import { setupCache } from 'axios-cache-adapter';
import copy from 'fast-copy';

export default {
  api: null,
  settings: {
    baseURL: '/wp-json/wp/v2',
    headers: { 'X-WP-Nonce': WP.nonce },
    params: {},
  },
  setupCacheAdapter() {
    const cache = setupCache({
      store: localforage.createInstance({
        driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
        name: 'kiku-cache',
        version: 1.1,
        storeName: 'kiku-store',
      }),
      maxAge: 15 * 60 * 1000, // 15 minutes
      key: request => {
        let stringParams = '';
        if (Object.keys(request.params).length) {
          stringParams = request.params ? JSON.stringify(request.params) : '';
        }
        return request.url + stringParams;
      },
      exclude: {
        query: false,
        paths: [/.+revisions/],
      },
    });

    this.settings.adapter = cache.adapter;
  },
  getInstance() {
    if (!this.api) {
      this.setupCacheAdapter();
      this.api = axios.create(this.settings);
    }

    return this.api;
  },
  getThemes() {
    var client = this.getInstance();

    return client.get('/wp-json/kiku/v1/themes', {
      baseURL: '/',
      params: '',
    });
  },
  getAdvertise() {
    var client = this.getInstance();

    return client.get('/wp-json/kiku/v1/advertise', {
      baseURL: '/',
      params: '',
    });
  },
  getArchive() {
    var client = this.getInstance();

    return client.get('/wp-json/kiku/v1/archive', {
      baseURL: '/',
      params: '',
    });
  },
  getPostList({ meta, params }) {
    var client = this.getInstance();
    const defaultParams = copy(this.settings.params);

    return client.get('/posts/?list', {
      params: Object.assign(
        defaultParams,
        { orderby: 'modified' },
        WP.per_page && { per_page: WP.per_page },
        WP.categories_exclude && { categories_exclude: WP.categories_exclude },
        meta.type === 'post_tag' && meta.id && { tags: meta.id },
        meta.type === 'category' && meta.id && { categories: meta.id },
        meta.type === 'search' && { search: params.search_query },
        params.page_number && { page: params.page_number },
      ),
    });
  },
  getPosts(post_id, preview) {
    var client = this.getInstance();
    let path = `/posts/${post_id}`;
    if (preview) {
      path += '/revisions';
    } else {
      path += '?_embed';
    }

    return client.get(path).then(res => {
      if (preview) {
        res.data = res.data[0];
      }
      return res;
    });
  },
  getPages(post_id, preview) {
    var client = this.getInstance();
    let path = `/pages/${post_id}`;
    if (preview) {
      path += '/revisions';
    } else {
      path += '?_embed';
    }

    return client.get(path).then(res => {
      if (preview) {
        res.data = res.data[0];
      }
      return res;
    });
  },
};
