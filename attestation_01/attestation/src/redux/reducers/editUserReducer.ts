import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { UserActionType } from '../types/actions';
import { UserState } from '../types/state';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import {
  CLEAR_EDITUSER_LOADING, HIDE_EDITUSER_AVATAR_UPLOAD,
  HIDE_EDITUSER_LOADING, LOAD_EDITUSER_AVATAR_SUCCESS, LOAD_EDITUSER_ERROR, LOAD_EDITUSER_SUCCESS, SHOW_EDITUSER_AVATAR_UPLOAD, SHOW_EDITUSER_LOADING,
} from '../constants/actions/editUser';

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

const clearLoading = (draft: UserState) => {
  draft.loading = false;
  draft.loaded = false;
  return draft;
};

const updateUserAvatar = (draft: UserState, resp?: UserResponseType) => {
  if (resp) {
    draft.user.id = resp.id;
    draft.user.picture = resp.picture;
  }
  return draft;
};

export default (state = initialState, action: UserActionType) => produce(
  state,
  (draft: UserState) => {
    switch (action.type) {
      case SHOW_EDITUSER_LOADING: return showLoading(draft);
      case HIDE_EDITUSER_LOADING: return hideLoading(draft);
      case LOAD_EDITUSER_SUCCESS: return loadSuccess(draft, action.user);
      case LOAD_EDITUSER_ERROR: return loadError(draft, action.error);
      case CLEAR_EDITUSER_LOADING: return clearLoading(draft);
      case SHOW_EDITUSER_AVATAR_UPLOAD: return showLoading(draft);
      case HIDE_EDITUSER_AVATAR_UPLOAD: return hideLoading(draft);
      case LOAD_EDITUSER_AVATAR_SUCCESS: return updateUserAvatar(draft, action.user);
      default: return state;
    }
  },
);
