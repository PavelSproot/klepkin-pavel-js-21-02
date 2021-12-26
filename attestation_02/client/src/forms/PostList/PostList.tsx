import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Pagination } from 'antd';
import { State } from '../../redux/types/state';
import { ListResponseType, PostShortResponseType } from '../../types/api/serverApiResponses';
import './PostList.scss';
import 'antd/dist/antd.css';
import { EMPTY_STRING } from '../../constants/common';
import Loader from '../../components/Loader';
import loadPostList, { hidePostInfoAction, showPostInfoAction } from '../../redux/actions/postListActions';
import PostShort from '../../components/PostShort';
import PostFull from '../../components/PostFull';
import { ThemeContext } from '../../themeContext';

export interface Props {
  postID: string;
  userID?: string;
  formatType?: string;
  noLimitChanger?: boolean;
  defualtPageLimit?: number;
  postList: ListResponseType<PostShortResponseType>;
  loading: boolean;
  loaded: boolean;
  error: any;
  loadPosts: (pageNum: number, pageSize: number, userId: string) => void;
  showPostInfo: (post: PostShortResponseType) => void;
  hidePostInfo: () => void;
}

const PostList = function ({
  postID, userID = '', formatType = 'full', noLimitChanger = false, defualtPageLimit = 0, postList, loading, loaded, error, loadPosts, showPostInfo, hidePostInfo,
}: Props) {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    loadPosts && loadPosts(postList.page, (defualtPageLimit > 0) ? defualtPageLimit : postList.limit, userID);
  }, [userID]);
  return (
    <div className="postList">
      <div className="postList__total-container">
        <div className="postList__header" />
        <div className="postList__main-container">
          {
                        error
                          ? <div>{error}</div>
                          : loading
                            ? (
                              <div className="postList__loader-container">
                                <Loader />
                              </div>
                            )
                            : !loaded ? <div /> : (
                              (postList.total && (postList.total > 0)) ? (
                                <div className={`postList__list-container${(formatType && (formatType === 'small')) ? '_small' : ''}${theme.darkTheme ? ' dark-selection-theme' : ''}`}>
                                  {

                                              postList && postList.data.map(
                                                (elem) => (
                                                  <button onClick={() => showPostInfo(elem)} type="button" className={`postList__show-button${theme.darkTheme ? ' dark-theme-button' : ''}`} key={elem.id}>
                                                    <PostShort id={elem.id} text={elem.text} image={elem.image} publishDate={elem.publishDate} owner={elem.owner} formatType={`${(formatType && (formatType === 'small')) ? 'small' : 'full'}`} />
                                                  </button>
                                                ),
                                              )
                                        }
                                  {
                                        (postList.total && (postList.total > 0) && (!noLimitChanger || (postList.total > postList.limit)))
                                          ? (
                                            <div className="postList__pagination">
                                              <Pagination
                                                defaultCurrent={1}
                                                total={postList.total}
                                                pageSize={postList.limit}
                                                current={postList.page + 1}
                                                onChange={(newPage, newPageSize) => {
                                                  loadPosts && loadPosts(newPage - 1, newPageSize, userID);
                                                }}
                                                showSizeChanger={!(noLimitChanger)}
                                                pageSizeOptions={(noLimitChanger) ? [] : ['5', '10', '25', '50']}
                                                size="small"
                                              />
                                            </div>
                                          )
                                          : EMPTY_STRING
                                    }
                                </div>
                              ) : EMPTY_STRING
                            )
                    }
        </div>
        {postID && (
          <Modal footer={null} centered visible onCancel={hidePostInfo}>
            <PostFull postId={postID} closeCallback={hidePostInfo} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      postID: state.posts.postID,
      postList: state.posts.postList,
      loading: state.posts.loading,
      loaded: state.posts.loaded,
      error: state.posts.error,
    }),
  (dispatch) => ({
    loadPosts: bindActionCreators(loadPostList, dispatch),
    showPostInfo: bindActionCreators(showPostInfoAction, dispatch),
    hidePostInfo: bindActionCreators(hidePostInfoAction, dispatch),
  }),
)(PostList);
