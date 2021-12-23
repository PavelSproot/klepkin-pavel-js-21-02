import { Dispatch } from 'redux';
import { UserActionType } from '../types/actions';
import { editUser } from '../../api/dummyApi';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import {
  CLEAR_EDITUSER_LOADING,
  HIDE_EDITUSER_LOADING, LOAD_EDITUSER_ERROR, LOAD_EDITUSER_SUCCESS, SHOW_EDITUSER_LOADING,
} from '../constants/actions/editUser';

const loadSuccessAction = (user: UserResponseType): UserActionType => ({
  type: LOAD_EDITUSER_SUCCESS,
  user,
});

const loadErrorAction = (error: string): UserActionType => ({
  type: LOAD_EDITUSER_ERROR,
  error,
});

const showLoadingAction = () : UserActionType => ({
  type: SHOW_EDITUSER_LOADING,
});

const hideLoadingAction = () : UserActionType => ({
  type: HIDE_EDITUSER_LOADING,
});

export const clearLoadingAction = () : UserActionType => ({
  type: CLEAR_EDITUSER_LOADING,
});

const EditUser = (user: UserResponseType) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  editUser(user)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export default EditUser;
