const pageHome = () => import(/* webpackChunkName: "home" */ '@/pages/home.vue');
const pageSingular = () => import(/* webpackChunkName: "single" */ '@/pages/singular.vue');
const pageNotFound = () => import(/* webpackChunkName: "other" */ '@/pages/notFound.vue');
const pageArchive = () => import(/* webpackChunkName: "other" */ '@/pages/archive.vue');

let routes = [];

for(let type of Object.keys(WP.routes)) {
  for(let i = 0; i < WP.routes[type].length; i++) {
    let route = WP.routes[type][i];
    let temp = {};

    temp = {
      name: `${type}_${route.meta.id}`,
      path: route.path,
      meta: {
        type,
        ...route.meta,
      },
    };

    if (type === 'post' || type === 'page') {
      if (route.path === '/archive') {
        temp.name = 'archive';
        temp.component = pageArchive;
      } else {
        temp.component = pageSingular;
      }
    } else {
      // category, post_tag, etc
      temp.component = pageHome;
      temp.children = [
        {
          path: 'page/:page_number',
          name: `${type}_${route.meta.id}_paged`,
          meta: {
            type,
            ...route.meta,
          },
        },
      ];
    }

    routes.push(temp);
  }
}

routes.push(
  {
    path: '/',
    name: 'home',
    component: pageHome,
    children: [
      {
        path: 'page/:page_number',
        name: 'paged',
      },
    ],
  },
  {
    path: '/search/:search_query',
    name: 'search',
    component: pageHome,
    meta: {
      type: 'search',
    },
    children: [
      {
        path: 'page/:page_number',
        name: 'search_paged',
        meta: {
          type: 'search',
        },
      },
    ],
  },
  {
    path: '/preview',
    name: 'preview',
    component: pageSingular,
    meta: {
      type: 'preview',
    },
  },
  {
    path: '*',
    name: 'notFound',
    component: pageNotFound,
  },
);

// unset
WP.routes = null;

export default routes;
