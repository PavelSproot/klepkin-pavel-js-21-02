import produce from 'immer';
import { COMMENT_LIST_COUNT, EMPTY_STRING } from '../../constants/common';
import { ListCommentActionType } from '../types/actions';

import { ListCommentState } from '../types/state';
import { CommentResponsType, ListResponseType } from '../../types/api/serverApiResponses';
import {
  HIDE_COMMENTLIST_LOADING, LOAD_COMMENTLIST_ERROR, LOAD_COMMENTLIST_SUCCESS, SHOW_COMMENTLIST_LOADING,
} from '../constants/actions/commentList';

const initialState: ListCommentState = {
  postID: '',
  commentList: {
    data: [],
    total: 0,
    limit: COMMENT_LIST_COUNT,
    page: 0,
  } as ListResponseType<CommentResponsType>,
  loading: false,
  loaded: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: ListCommentState) => {
  draft.loading = true;
  draft.loaded = false;
  return draft;
};

const hideLoading = (draft: ListCommentState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: ListCommentState, resp?: ListResponseType<CommentResponsType>) => {
  if (resp) {
    draft.commentList = resp;
    draft.loaded = true;
  }
  return draft;
};
const loadError = (draft: ListCommentState, e?: any) => {
  draft.loading = false;
  draft.loaded = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: ListCommentActionType) => produce(
  state,
  (draft: ListCommentState) => {
    switch (action.type) {
      case SHOW_COMMENTLIST_LOADING: return showLoading(draft);
      case HIDE_COMMENTLIST_LOADING: return hideLoading(draft);
      case LOAD_COMMENTLIST_SUCCESS: return loadSuccess(draft, action.commentList);
      case LOAD_COMMENTLIST_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
