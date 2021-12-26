import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { UserActionType } from '../types/actions';
import { UserState } from '../types/state';
import { UserResponseType } from '../../types/api/serverApiResponses';
import {
  HIDE_USERPROFILE_LOADING,
  HIDE_USERPROFILE_USERINFO,
  LOAD_USERPROFILE_ERROR,
  LOAD_USERPROFILE_SUCCESS,
  SHOW_USERPROFILE_LOADING,
  SHOW_USERPROFILE_USERINFO,
} from '../constants/actions/userProfile';

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

const showInfo = (draft: UserState) => {
  draft.loading = false;
  draft.doAction = true;
  return draft;
};

const hideInfo = (draft: UserState) => {
  draft.loading = false;
  draft.doAction = false;
  return draft;
};

export default (state = initialState, action: UserActionType) => produce(
  state,
  (draft: UserState) => {
    switch (action.type) {
      case SHOW_USERPROFILE_LOADING: return showLoading(draft);
      case HIDE_USERPROFILE_LOADING: return hideLoading(draft);
      case LOAD_USERPROFILE_SUCCESS: return loadSuccess(draft, action.user);
      case LOAD_USERPROFILE_ERROR: return loadError(draft, action.error);
      case SHOW_USERPROFILE_USERINFO: return showInfo(draft);
      case HIDE_USERPROFILE_USERINFO: return hideInfo(draft);
      default: return state;
    }
  },
);
