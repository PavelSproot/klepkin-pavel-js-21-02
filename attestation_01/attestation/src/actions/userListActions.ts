import { Dispatch } from 'redux';
import { UserListActionType } from '../types/actions';
import {
  HIDE_USERLIST_LOADING, LOAD_USERLIST_ERROR, LOAD_USERLIST_SUCCESS, SHOW_USERLIST_LOADING,
} from '../constants/actions/userList';
import { UserResponseType } from '../types/api/dumMyApiResponses';
import getUserList from '../api/dummyApi';

const loadSuccessAction = (users: Array<UserResponseType>): UserListActionType => ({
  type: LOAD_USERLIST_SUCCESS,
  userList: users,
});

const loadErrorAction = (error: string): UserListActionType => ({
  type: LOAD_USERLIST_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_USERLIST_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_USERLIST_LOADING,
});

const loadUserList = (pageNum: number, pageSize: number) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserList(pageNum, pageSize)
    .then((resp) => dispatch(loadSuccessAction(resp)))
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export default loadUserList;
