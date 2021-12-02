import produce from 'immer';
import { EMPTY_STRING } from '../constants/common';
import { UserListActionType } from '../types/actions';
import {
  HIDE_USERLIST_LOADING, LOAD_USERLIST_ERROR, LOAD_USERLIST_SUCCESS, SHOW_USERLIST_LOADING,
} from '../constants/actions/userList';
import { UserListState } from '../types/state';
import { UserShortResponseType } from '../types/api/dumMyApiResponses';

const initialState: UserListState = {
  userList: [],
  loading: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: UserListState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: UserListState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: UserListState, resp?: Array<UserShortResponseType>) => {
  draft.userList = resp || [];
  return draft;
};
const loadError = (draft: UserListState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: UserListActionType) => produce(
  state,
  (draft: UserListState) => {
    switch (action.type) {
      case SHOW_USERLIST_LOADING: return showLoading(draft);
      case HIDE_USERLIST_LOADING: return hideLoading(draft);
      case LOAD_USERLIST_SUCCESS: return loadSuccess(draft, action.userList);
      case LOAD_USERLIST_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
