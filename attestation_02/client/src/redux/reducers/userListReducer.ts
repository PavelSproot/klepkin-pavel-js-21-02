import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { ListUserShortActionType } from '../types/actions';
import {
  HIDE_USERLIST_LOADING, LOAD_USERLIST_ERROR, LOAD_USERLIST_SUCCESS, SHOW_USERLIST_LOADING,
} from '../constants/actions/userList';
import { ListUserShortState } from '../types/state';
import { ListResponseType, UserShortResponseType } from '../../types/api/serverApiResponses';

const initialState: ListUserShortState = {
  userList: {
    data: [],
    total: 0,
    limit: 10,
    page: 0,
  },
  loading: false,
  loaded: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: ListUserShortState) => {
  draft.loading = true;
  draft.loaded = false;
  return draft;
};

const hideLoading = (draft: ListUserShortState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: ListUserShortState, resp?: ListResponseType<UserShortResponseType>) => {
  if (resp) {
    draft.userList = resp;
    draft.loaded = true;
  }
  return draft;
};
const loadError = (draft: ListUserShortState, e?: any) => {
  draft.loading = false;
  draft.loaded = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: ListUserShortActionType) => produce(
  state,
  (draft: ListUserShortState) => {
    switch (action.type) {
      case SHOW_USERLIST_LOADING: return showLoading(draft);
      case HIDE_USERLIST_LOADING: return hideLoading(draft);
      case LOAD_USERLIST_SUCCESS: return loadSuccess(draft, action.userList);
      case LOAD_USERLIST_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
