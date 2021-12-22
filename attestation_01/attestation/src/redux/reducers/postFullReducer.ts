import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { PostFullActionType } from '../types/actions';
import { PostFullState } from '../types/state';
import { PostFullResponseType } from '../../types/api/dumMyApiResponses';
import {
  HIDE_POSTFULL_LOADING, LOAD_POSTFULL_ERROR, LOAD_POSTFULL_SUCCESS, SHOW_POSTFULL_LOADING,
} from '../constants/actions/postFull';

const initialState: PostFullState = {
  postFull: {
    id: '',
    text: '',
    image: '',
    likes: 0,
    tags: [],
    publishDate: '',
    link: '',
    owner: {},
  },
  loading: false,
  loaded: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: PostFullState) => {
  draft.loading = true;
  draft.loaded = false;
  return draft;
};

const hideLoading = (draft: PostFullState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: PostFullState, resp?: PostFullResponseType) => {
  if (resp) {
    draft.postFull = resp;
    draft.loaded = true;
  }
  return draft;
};
const loadError = (draft: PostFullState, e?: any) => {
  draft.loading = false;
  draft.loaded = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: PostFullActionType) => produce(
  state,
  (draft: PostFullState) => {
    switch (action.type) {
      case SHOW_POSTFULL_LOADING: return showLoading(draft);
      case HIDE_POSTFULL_LOADING: return hideLoading(draft);
      case LOAD_POSTFULL_SUCCESS: return loadSuccess(draft, action.postFull);
      case LOAD_POSTFULL_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
