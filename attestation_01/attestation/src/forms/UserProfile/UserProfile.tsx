import React, { useEffect } from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import loadUserProfile, { hideUserEditAction, showUserEditAction } from '../../redux/actions/userProfileActions';
import { State } from '../../redux/types/state';
import Loader from '../../components/Loader';
import Hint from '../../wrappers/hint/Hint';
import { makeDateOnlyFromISO } from '../../utills/stringFunctions';
import PostList from '../PostList/PostList';
import { EDIT_FORM_EDIT_BUTTON_DESCRIPTION } from '../../constants/registration';
import UserEdit from '../../components/UserEdit';

interface Params {
  userId: string;
}

interface Props {
  user: UserResponseType;
  authUser: UserResponseType;
  loading: boolean;
  loaded: boolean;
  error: any;
  doAction: boolean;
  loadUser: (id: string) => void;
  showUserEdit: () => void;
  hideUserEdit: () => void;
}

const UserProfile = function ({
  user, authUser, loading, loaded, error, doAction, loadUser, showUserEdit, hideUserEdit,
}: Props) {
  const params = useParams() as Params;
  useEffect(() => {
    loadUser && loadUser(params.userId);
  }, [params.userId]);
  return (
    <div className="userProfile">
      <div className="userProfile__total-container">
        {
            error
              ? <div>{error}</div>
              : loading
                ? (
                  <div className="userProfile__loader-container">
                    <Loader />
                  </div>
                )
                : !loaded ? <div /> : (
                  <div className="userProfile__container">
                    <div className="userProfile__main-container">
                      <div className="userProfile__avatar-container">
                        <img className="userProfile__avatar-container_img" src={user.picture} alt="" />
                      </div>
                      <div className="userProfile__info-container">
                        <div className="userProfile__userinfo-container">
                          <div className="userProfile__username-container">
                            <div className="userProfile__name-container">
                              <Hint element={<span className="userProfile__username-span">{`${user.title} ${user.firstName} ${user.lastName}`}</span>} hintText={user.id || ''} />
                            </div>
                            <div className="userProfile__button-container">
                              {
                                    (authUser.id && authUser.id === user.id)
                                      ? (
                                        <Button onClick={() => showUserEdit()}>
                                          <FormOutlined alt={EDIT_FORM_EDIT_BUTTON_DESCRIPTION} />
                                        &nbsp;
                                          {EDIT_FORM_EDIT_BUTTON_DESCRIPTION}
                                        </Button>
                                      )
                                      : <div />
                                }
                            </div>
                          </div>
                          <div className="userProfile__user-data-container">
                            <div>{`Пол: ${user.gender}`}</div>
                            <div>{`Дата рождения: ${makeDateOnlyFromISO(user.dateOfBirth || '')}`}</div>
                            <div>{`Дата регистрации: ${makeDateOnlyFromISO(user.registerDate || '')}`}</div>
                            <div>{`E-mail: ${user.email}`}</div>
                            <div>{`Телефон: ${user.phone}`}</div>
                          </div>
                        </div>
                        <div className="userProfile__userid-container">
                          <span>{`ID: ${user.id}`}</span>
                        </div>
                      </div>
                    </div>
                    <div className="userProfile__post-list-container">
                      <PostList formatType="small" userID={user.id} noLimitChanger defualtPageLimit={5} />
                    </div>
                  </div>
                )
        }
        {doAction && (
          <Modal footer={null} centered visible onCancel={hideUserEdit}>
            <UserEdit closeCallback={hideUserEdit} reloadCallback={loadUser} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      user: state.userProfile.user,
      authUser: state.authUser.user,
      loading: state.userProfile.loading,
      loaded: state.userProfile.loaded,
      error: state.userProfile.error,
      doAction: state.userProfile.doAction,
    }),
  (dispatch) => ({
    loadUser: bindActionCreators(loadUserProfile, dispatch),
    showUserEdit: bindActionCreators(showUserEditAction, dispatch),
    hideUserEdit: bindActionCreators(hideUserEditAction, dispatch),
  }),
)(UserProfile);
