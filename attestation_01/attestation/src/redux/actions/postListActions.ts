import { Dispatch } from 'redux';
import { ListPostShortActionType } from '../types/actions';
import { ListResponseType, PostShortResponseType } from '../../types/api/dumMyApiResponses';
import { getPostList } from '../../api/dummyApi';
import {
  HIDE_POSTLIST_LOADING, HIDE_POSTLIST_POSTINFO, LOAD_POSTLIST_ERROR, LOAD_POSTLIST_SUCCESS, SHOW_POSTLIST_LOADING, SHOW_POSTLIST_POSTINFO,
} from '../constants/actions/postList';

const loadSuccessAction = (posts: ListResponseType<PostShortResponseType>): ListPostShortActionType => ({
  type: LOAD_POSTLIST_SUCCESS,
  postList: posts,
});

const loadErrorAction = (error: string): ListPostShortActionType => ({
  type: LOAD_POSTLIST_ERROR,
  error,
});

const showLoadingAction = (): ListPostShortActionType => ({
  type: SHOW_POSTLIST_LOADING,
});

const hideLoadingAction = (): ListPostShortActionType => ({
  type: HIDE_POSTLIST_LOADING,
});

const loadPostList = (pageNum: number, pageSize: number, userId: string = '') => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getPostList(pageNum, pageSize, userId)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export const showPostInfoAction = (post: PostShortResponseType) => ({
  type: SHOW_POSTLIST_POSTINFO,
  postID: post.id,
  loading: false,
});

export const hidePostInfoAction = () => ({
  type: HIDE_POSTLIST_POSTINFO,
  loading: false,
});

export default loadPostList;
