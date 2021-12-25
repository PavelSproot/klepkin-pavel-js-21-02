import React, { useEffect } from 'react';
import './PostFull.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { State } from '../redux/types/state';
import Loader from './Loader';
import loadPostFull from '../redux/actions/postFullActions';
import { PostFullResponseType } from '../types/api/dumMyApiResponses';
import { makePostDateFromISO } from '../utills/stringFunctions';
import Hint from '../wrappers/hint/Hint';
import CommentList from './CommentList';
import { USERPROFILE_URL } from '../constants/api/dummyApi';

interface Props {
  postId: string;
  postFull: PostFullResponseType;
  loading: boolean;
  loaded: boolean;
  error: any;
  loadPost: (id: string) => void;
  closeCallback: () => void;
}

const PostFull = function ({
  postId, postFull, loading, loaded, error, loadPost, closeCallback,
}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    loadPost && loadPost(postId);
  }, []);
  const goOwner = () => {
    closeCallback();
    navigate(`/${USERPROFILE_URL}/${postFull.owner.id}`);
  };
  return (
    <div className="postFull">
      <div className="postFull__total-container">
        {
                error
                  ? <div>{error}</div>
                  : loading
                    ? (
                      <div className="postFull__loader-container">
                        <Loader />
                      </div>
                    )
                    : !loaded ? <div /> : (
                      <div className="postFull__main-container">
                        <div className="postFull__info-container">
                          <div className="postFull__owner-container">
                            <div className="postFull__avatar-container">
                              <div className="postFull__avatar-div"><img src={postFull.owner.picture} alt="" /></div>
                            </div>
                            <div className="postFull__username-container">
                              <div className="userFull__name"><Hint element={<Button type="link" onClick={goOwner}><span className="postFull__username-span">{`${postFull.owner.title} ${postFull.owner.firstName} ${postFull.owner.lastName}`}</span></Button>} hintText={postFull.owner.id || ''} /></div>
                            </div>
                          </div>
                          <div className="postFull__date-container">
                            <span>{makePostDateFromISO(postFull.publishDate)}</span>
                          </div>
                        </div>
                        <div className="postFull__picture-container">
                          <div className="postFull__image-div"><img src={postFull.image} alt="" /></div>
                        </div>
                        <div className="postFull__text-container">
                          <p>{postFull.text}</p>
                        </div>
                        <div className="postFull__comments-container">
                          <CommentList postID={postId} />
                        </div>
                      </div>
                    )
            }
      </div>
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      postFull: state.post.postFull,
      loading: state.post.loading,
      loaded: state.post.loaded,
      error: state.post.error,
    }),
  (dispatch) => bindActionCreators({ loadPost: loadPostFull }, dispatch),
)(PostFull);
