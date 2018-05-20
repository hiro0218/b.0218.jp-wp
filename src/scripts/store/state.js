import copy from 'fast-copy';
import { MODEL_THEMES, MODEL_POST, MODEL_POST_LIST, MODEL_REQUEST_HEADER, MODEL_ADS } from '@scripts/models';

export default {
  pageTitle: document.title,
  isOpenSidebar: false,
  isLoading: false,
  themes: MODEL_THEMES,
  requestHeader: copy(MODEL_REQUEST_HEADER),
  postLists: MODEL_POST_LIST,
  post: copy(MODEL_POST),
  advertise: copy(MODEL_ADS),
};
