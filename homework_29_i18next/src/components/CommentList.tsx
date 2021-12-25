import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';
import './CommentList.scss';
import 'antd/dist/antd.css';
import { CommentResponsType, ListResponseType } from '../types/api/dumMyApiResponses';
import loadCommentList from '../redux/actions/commentListActions';
import { State } from '../redux/types/state';
import { COMMENT_LIST_COUNT, EMPTY_STRING } from '../constants/common';
import Loader from './Loader';
import Comment from './Comment';

interface Props {
  postID: string;
  commentList: ListResponseType<CommentResponsType>;
  loading: boolean;
  loaded: boolean;
  error: any;
  loadComments: (postID: string, pageNum: number, pageSize: number) => void;
}

const CommentList = function ({
  postID, commentList, loading, loaded, error, loadComments,
}: Props) {
  useEffect(() => {
    loadComments && loadComments(postID, commentList.page, commentList.limit);
  }, []);
  return (
    <div className="commentList">
      <div className="commentList__total-container">
        <div className="commentList__main-container">
          {
                        error
                          ? <div>{error}</div>
                          : loading
                            ? (
                              <div className="commentList__loader-container">
                                <Loader />
                              </div>
                            )
                            : !loaded ? <div /> : (
                              <div className="commentList__list-container">
                                {
                                            (commentList.total && (commentList.total > 0)) ? (
                                              commentList && commentList.data.map(
                                                (elem) => (
                                                  <Comment id={elem.id || ''} owner={elem.owner || {}} publishDate={elem.publishDate || ''} text={elem.message || ''} key={elem.id} />
                                                ),
                                              )
                                            ) : EMPTY_STRING
                                        }
                                {
                                      (commentList.total && (commentList.total > 0) && (commentList.total > COMMENT_LIST_COUNT))
                                        ? (
                                          <div className="commentList__pagination">
                                            <Pagination
                                              defaultCurrent={1}
                                              total={commentList.total}
                                              pageSize={COMMENT_LIST_COUNT}
                                              current={commentList.page + 1}
                                              onChange={(newPage, newPageSize) => {
                                                loadComments && loadComments(postID, newPage - 1, newPageSize);
                                              }}
                                              size="small"
                                            />
                                          </div>
                                        )
                                        : EMPTY_STRING
                                  }
                              </div>
                            )
                    }
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      commentList: state.comments.commentList,
      loading: state.comments.loading,
      loaded: state.comments.loaded,
      error: state.comments.error,
    }),
  (dispatch) => bindActionCreators({ loadComments: loadCommentList }, dispatch),
)(CommentList);
