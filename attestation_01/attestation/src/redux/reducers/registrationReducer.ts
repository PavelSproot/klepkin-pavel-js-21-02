import produce from 'immer';
import { EMPTY_STRING } from '../../constants/common';
import { UserActionType } from '../types/actions';
import { UserState } from '../types/state';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import {
  HIDE_CREATEUSER_LOADING, LOAD_CREATEUSER_ERROR, LOAD_CREATEUSER_SUCCESS, SHOW_CREATEUSER_LOADING,
} from '../constants/actions/registration';
import { REG_FORM_SUCCESS_CREATION } from '../../constants/registration';

const initialState: UserState = {
  user: {} as UserResponseType,
  loading: false,
  loaded: false,
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
    alert(REG_FORM_SUCCESS_CREATION + resp.id);
  }
  return draft;
};
const loadError = (draft: UserState, e?: any) => {
  draft.loading = false;
  draft.loaded = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: UserActionType) => produce(
  state,
  (draft: UserState) => {
    switch (action.type) {
      case SHOW_CREATEUSER_LOADING: return showLoading(draft);
      case HIDE_CREATEUSER_LOADING: return hideLoading(draft);
      case LOAD_CREATEUSER_SUCCESS: return loadSuccess(draft, action.user);
      case LOAD_CREATEUSER_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
