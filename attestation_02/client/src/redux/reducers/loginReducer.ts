import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { UserActionType } from '../types/actions';
import { UserState } from '../types/state';
import { UserResponseType } from '../../types/api/serverApiResponses';
import {
  AUTH_LOGOUT,
  HIDE_AUTH_LOADING, LOAD_AUTH_ERROR, LOAD_AUTH_SUCCESS, SHOW_AUTH_LOADING,
} from '../constants/actions/login';
import LocalStorageAuth from '../../utills/localStore';

const initialState: UserState = {
  user: {} as UserResponseType,
  loading: false,
  loaded: false,
  doAction: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: UserState) => {
  draft.loading = true;
  draft.loaded = false;
  return draft;
};

const hideLoading = (draft: UserState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: UserState, resp?: UserResponseType) => {
  if (resp) {
    draft.user = resp;
    draft.loaded = true;
  }
  return draft;
};
const loadError = (draft: UserState, e?: any) => {
  draft.loading = false;
  draft.loaded = false;
  draft.error = e;
  return draft;
};

const logOut = (draft: UserState) => {
  draft.loading = false;
  draft.loaded = false;
  delete draft.error;
  draft.user = {} as UserResponseType;
  const ls = new LocalStorageAuth();
  ls.removeItemFromStorage();
  return draft;
};

export default (state = initialState, action: UserActionType) => produce(
  state,
  (draft: UserState) => {
    switch (action.type) {
      case SHOW_AUTH_LOADING: return showLoading(draft);
      case HIDE_AUTH_LOADING: return hideLoading(draft);
      case LOAD_AUTH_SUCCESS: return loadSuccess(draft, action.user);
      case AUTH_LOGOUT: return logOut(draft);
      case LOAD_AUTH_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
