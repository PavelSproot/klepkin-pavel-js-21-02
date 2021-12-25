import { Dispatch } from 'redux';
import { UserActionType } from '../types/actions';
import { createUser } from '../../api/dummyApi';
import {
  HIDE_CREATEUSER_LOADING, LOAD_CREATEUSER_ERROR, LOAD_CREATEUSER_SUCCESS, SHOW_CREATEUSER_LOADING,
} from '../constants/actions/registration';
import { UserResponseType } from '../../types/api/dumMyApiResponses';

const loadSuccessAction = (user: UserResponseType): UserActionType => ({
  type: LOAD_CREATEUSER_SUCCESS,
  user,
});

const loadErrorAction = (error: string): UserActionType => ({
  type: LOAD_CREATEUSER_ERROR,
  error,
});

const showLoadingAction = () : UserActionType => ({
  type: SHOW_CREATEUSER_LOADING,
});

const hideLoadingAction = () : UserActionType => ({
  type: HIDE_CREATEUSER_LOADING,
});

const CreateNewUser = (user: UserResponseType) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  createUser(user)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export default CreateNewUser;
