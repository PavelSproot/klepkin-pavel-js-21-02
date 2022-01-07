import { Dispatch } from 'redux';
import { PostFullActionType } from '../types/actions';
import { PostFullResponseType } from '../../types/api/serverApiResponses';
import { getPost } from '../../api/serverApi';
import {
  HIDE_POSTFULL_LOADING, LOAD_POSTFULL_ERROR, LOAD_POSTFULL_SUCCESS, SHOW_POSTFULL_LOADING,
} from '../constants/actions/postFull';

const loadSuccessAction = (post: PostFullResponseType): PostFullActionType => ({
  type: LOAD_POSTFULL_SUCCESS,
  postFull: post,
});

const loadErrorAction = (error: string): PostFullActionType => ({
  type: LOAD_POSTFULL_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_POSTFULL_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_POSTFULL_LOADING,
});

const loadPostFull = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getPost(id)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export default loadPostFull;
