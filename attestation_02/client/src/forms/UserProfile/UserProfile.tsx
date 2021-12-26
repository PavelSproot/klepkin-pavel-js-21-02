import React, { useEffect } from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { UserResponseType } from '../../types/api/serverApiResponses';
import loadUserProfile, { hideUserEditAction, showUserEditAction } from '../../redux/actions/userProfileActions';
import { State } from '../../redux/types/state';
import Loader from '../../components/Loader';
import Hint from '../../wrappers/hint/Hint';
import PostList from '../PostList/PostList';
import UserEdit from '../../components/UserEdit';
import '../../locale/i18next';

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
  const { t } = useTranslation('registrationform');
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
                                          <FormOutlined alt={t('button_edit')} />
                                        &nbsp;
                                          {t('button_edit')}
                                        </Button>
                                      )
                                      : <div />
                                }
                            </div>
                          </div>
                          <div className="userProfile__user-data-container">
                            <div>{`${t('title_gender')} ${user.gender}`}</div>
                            <div>{`${t('title_birthday')} ${moment(user.dateOfBirth?.date).format(t('birthday_format'))}`}</div>
                            <div>{`${t('title_registerday')} ${moment(user.registerDate?.date).format(t('birthday_format'))}`}</div>
                            <div>{`${t('title_email')} ${user.email}`}</div>
                            <div>{`${t('title_phone')} ${user.phone}`}</div>
                          </div>
                        </div>
                        <div className="userProfile__userid-container">
                          <span>{`${t('title_id')} ${user.id}`}</span>
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
