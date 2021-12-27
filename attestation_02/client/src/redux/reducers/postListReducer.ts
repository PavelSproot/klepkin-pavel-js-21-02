import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { ListPostShortActionType } from '../types/actions';
import { ListPostShortState } from '../types/state';
import { ListResponseType, PostShortResponseType } from '../../types/api/serverApiResponses';
import {
  HIDE_POSTLIST_LOADING, HIDE_POSTLIST_POSTINFO, LOAD_POSTLIST_ERROR, LOAD_POSTLIST_SUCCESS, SHOW_POSTLIST_LOADING, SHOW_POSTLIST_POSTINFO,
} from '../constants/actions/postList';

const initialState: ListPostShortState = {
  postID: '',
  postList: {
    data: [],
    total: 0,
    limit: 10,
    page: 0,
  },
  loading: false,
  loaded: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: ListPostShortState) => {
  draft.loading = true;
  draft.loaded = false;
  return draft;
};

const hideLoading = (draft: ListPostShortState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: ListPostShortState, resp?: ListResponseType<PostShortResponseType>) => {
  if (resp) {
    draft.postList = resp;
    draft.loaded = true;
  }
  return draft;
};
const loadError = (draft: ListPostShortState, e?: any) => {
  draft.loading = false;
  draft.loaded = false;
  draft.error = e;
  return draft;
};

const showInfo = (draft: ListPostShortState, resp?: string) => {
  draft.loading = false;
  if (resp) draft.postID = resp;
  return draft;
};

const hideInfo = (draft: ListPostShortState) => {
  draft.loading = false;
  draft.postID = '';
  return draft;
};

export default (state = initialState, action: ListPostShortActionType) => produce(
  state,
  (draft: ListPostShortState) => {
    switch (action.type) {
      case SHOW_POSTLIST_LOADING: return showLoading(draft);
      case HIDE_POSTLIST_LOADING: return hideLoading(draft);
      case LOAD_POSTLIST_SUCCESS: return loadSuccess(draft, action.postList);
      case LOAD_POSTLIST_ERROR: return loadError(draft, action.error);
      case SHOW_POSTLIST_POSTINFO: return showInfo(draft, action.postID);
      case HIDE_POSTLIST_POSTINFO: return hideInfo(draft);
      default: return state;
    }
  },
);
