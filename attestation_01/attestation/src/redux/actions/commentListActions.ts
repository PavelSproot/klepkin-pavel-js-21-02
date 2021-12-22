import { Dispatch } from 'redux';
import { ListCommentActionType } from '../types/actions';
import { CommentResponsType, ListResponseType } from '../../types/api/dumMyApiResponses';
import {
  HIDE_COMMENTLIST_LOADING, LOAD_COMMENTLIST_ERROR, LOAD_COMMENTLIST_SUCCESS, SHOW_COMMENTLIST_LOADING,
} from '../constants/actions/commentList';
import { getCommentList } from '../../api/dummyApi';

const loadSuccessAction = (comments: ListResponseType<CommentResponsType>): ListCommentActionType => ({
  type: LOAD_COMMENTLIST_SUCCESS,
  commentList: comments,
});

const loadErrorAction = (error: string): ListCommentActionType => ({
  type: LOAD_COMMENTLIST_ERROR,
  error,
});

const showLoadingAction = () : ListCommentActionType => ({
  type: SHOW_COMMENTLIST_LOADING,
});

const hideLoadingAction = () : ListCommentActionType => ({
  type: HIDE_COMMENTLIST_LOADING,
});

const loadCommentList = (postID: string, pageNum: number, pageSize: number) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getCommentList(postID, pageNum, pageSize)
    .then((resp) => {
      if (resp.error) {
        return dispatch(loadErrorAction(resp.error));
      }
      return dispatch(loadSuccessAction(resp));
    })
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};

export default loadCommentList;
