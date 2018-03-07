import { cloneDeep } from 'lodash-es';
import { MODEL_POST, MODEL_POST_LIST, MODEL_REQUEST_HEADER, MODEL_ADS } from '@scripts/models';

export default {
  navigation: null,
  isOpenSidebar: false,
  isLoading: false,
  requestHeader: cloneDeep(MODEL_REQUEST_HEADER),
  postLists: cloneDeep(MODEL_POST_LIST),
  post: cloneDeep(MODEL_POST),
  advertise: cloneDeep(MODEL_ADS),
};
