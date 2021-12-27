import { Dispatch } from 'redux';
import { UserActionType } from '../types/actions';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import { getUser } from '../../api/dummyApi';
import {
  HIDE_USERPROFILE_LOADING,
  HIDE_USERPROFILE_USERINFO,
  LOAD_USERPROFILE_ERROR,
  LOAD_USERPROFILE_SUCCESS,
  SHOW_USERPROFILE_LOADING,
  SHOW_USERPROFILE_USERINFO,
} from '../constants/actions/userProfile';

const loadSuccessAction = (user: UserResponseType): UserActionType => ({
  type: LOAD_USERPROFILE_SUCCESS,
  user,
});

const loadErrorAction = (error: string): UserActionType => ({
  type: LOAD_USERPROFILE_ERROR,
  error,
});

const showLoadingAction = () : UserActionType => ({
  type: SHOW_USERPROFILE_LOADING,
});

const hideLoadingAction = () : UserActionType => ({
  type: HIDE_USERPROFILE_LOADING,
});

export const showUserEditAction = () => ({
  type: SHOW_USERPROFILE_USERINFO,
  doAction: true,
  loading: false,
});

export const hideUserEditAction = () => ({
  type: HIDE_USERPROFILE_USERINFO,
  doAction: false,
  loading: false,
});

const loadUserProfile = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUser(id)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export default loadUserProfile;
