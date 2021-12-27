import { Dispatch } from 'redux';
import { UserActionType } from '../types/actions';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import { getUser } from '../../api/dummyApi';
import {
  AUTH_LOGOUT,
  HIDE_AUTH_LOADING, LOAD_AUTH_ERROR, LOAD_AUTH_SUCCESS, SHOW_AUTH_LOADING,
} from '../constants/actions/login';
import LocalStorageAuth from '../../utills/localStore';

const loadSuccessAction = (user: UserResponseType): UserActionType => ({
  type: LOAD_AUTH_SUCCESS,
  user,
});

const loadErrorAction = (error: string): UserActionType => ({
  type: LOAD_AUTH_ERROR,
  error,
});

const showLoadingAction = () : UserActionType => ({
  type: SHOW_AUTH_LOADING,
});

const hideLoadingAction = () : UserActionType => ({
  type: HIDE_AUTH_LOADING,
});

const loadUserAuth = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUser(id)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      const lsAuth = new LocalStorageAuth();
      lsAuth.addItemToStorage(id);
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export const logOutAction = () => ({
  type: AUTH_LOGOUT,
});

export default loadUserAuth;
