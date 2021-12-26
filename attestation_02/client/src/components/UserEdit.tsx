import React from 'react';
import './UserEdit.scss';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ConfigProvider, DatePicker, Divider, Form, Input, Radio,
} from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import loc from 'antd/es/date-picker/locale/ru_RU';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  REG_FORM_VALUE_FEMALE,
  REG_FORM_VALUE_MALE,
} from '../constants/registration';
import { UserResponseType } from '../types/api/serverApiResponses';
import { State } from '../redux/types/state';
import Loader from './Loader';
import { USERPROFILE_URL } from '../constants/api/serverApi';
import EditUser, { clearLoadingAction, uploadUserAvatarAction } from '../redux/actions/editUserActions';
import '../locale/i18next';

interface Props {
  userProfile: UserResponseType,
  editUser: UserResponseType,
  loading: boolean;
  loaded: boolean;
  error: any;
  doEditUser: (user: UserResponseType) => void;
  closeCallback: () => void;
  reloadCallback: (id: string) => void;
  clearUserEdit: () => void;
  uploadUserAvatar: (id: string, file?: Blob) => void;
}

const UserEdit = function ({
  userProfile, editUser, loading, loaded, error, doEditUser, closeCallback, reloadCallback, clearUserEdit, uploadUserAvatar,
}: Props) {
  const { t } = useTranslation('registrationform');
  const navigate = useNavigate();
  const [editUserForm] = Form.useForm();
  const file = React.createRef<HTMLInputElement>();

  const deleteAvatar = (): void => {
    //    doEditUser({ id: userProfile.id, picture: '' });
    //    clearUserEdit();
    if (userProfile?.id) {
      uploadUserAvatar(userProfile.id);
    }
  };

  const updateAvatar = (): void => {
    if (userProfile?.id && file.current?.files?.length === 1) {
      file.current?.files[0].arrayBuffer().then((fileData) => {
        uploadUserAvatar(userProfile.id as string, new Blob([fileData]));
      });
    }
  };

  const dateFormat = t('birthday_format');

  const handleUserEditForm = (): void => {
    editUserForm
      .validateFields()
      .then((fields) => {
        const user: UserResponseType = {
          lastName: fields.serName,
          firstName: fields.firstName,
          phone: fields.phone,
          email: fields.email,
          gender: fields.gender,
          title: 'mr',
          id: userProfile.id,
        };
        if (fields.birthday) {
          const htm: HTMLInputElement = document.getElementById('birthday-field') as HTMLInputElement;
          user.dateOfBirth = { date: moment(htm.value, dateFormat).format('YYYY-MM-DD'), time: '00:00' };
        }
        user.picture = editUser.picture;
        doEditUser(user);
      })
      .catch(() => {
        error = t('error_not_all');
      });
  };
  if (loaded && !loading) {
    clearUserEdit();
    closeCallback();
    userProfile.id && reloadCallback(userProfile.id);
    navigate(`/${USERPROFILE_URL}/${editUser.id}`);
  }
  return (
    <div className="userEdit">
      {
                error
                  ? <div>{error}</div>
                  : loading
                    ? (
                      <div className="userEdit__loader-container">
                        <Loader />
                      </div>
                    )
                    : loaded ? <div /> : (
                      <div>
                        <div className="userEdit__main-container">
                          <Form
                            className="userEdit__form"
                            layout="horizontal"
                            scrollToFirstError
                            form={editUserForm}
                            initialValues={{
                              firstName: userProfile.firstName,
                              serName: userProfile.lastName,
                              gender: userProfile.gender,
                              birthday: moment(userProfile.dateOfBirth && userProfile.dateOfBirth.date, 'YYYY-MM-DD').format(dateFormat),
                              email: userProfile.email,
                              phone: userProfile.phone,
                              picture: userProfile.picture,
                            }}
                          >
                            <Form.Item
                              name="picture"
                            >
                              <div className="userEdit__avatar-container">
                                <img className="userEdit__avatar-img" src={editUser.id ? editUser.picture : userProfile.picture} alt={editUser.id ? editUser.picture : userProfile.picture} />
                              </div>
                            </Form.Item>
                            <div className="userEdit__avatar_controls">
                              <div className="userEdit__hidden">
                                <input
                                  ref={file}
                                  type="file"
                                  className="userEdit__hidden"
                                  multiple
                                  accept="image/*"
                                  key="avatar_file"
                                  onChange={updateAvatar}
                                />
                              </div>
                              <Button type="primary" className="userEdit__avatar-upload" onClick={() => file.current?.click()}>
                                {t('update_avatar')}
                              </Button>
                              <Divider type="vertical" className="userEdit__divider" />
                              <Button type="primary" className="userEdit__avatar-delete" danger onClick={deleteAvatar}>
                                {t('delete_avatar')}
                              </Button>
                            </div>
                            <Form.Item
                              label={t('title_name')}
                              name="firstName"
                              rules={[
                                {
                                  required: true,
                                  message: t('error_name_req'),
                                },
                                {
                                  pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
                                  message: t('error_name_cont'),
                                },
                              ]}
                            >
                              <div className="userEdit__name-container">
                                <Input className="userEdit__input-name" placeholder={t('ph_name')} defaultValue={userProfile.firstName} />
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={t('title_sername')}
                              name="serName"
                              rules={[
                                {
                                  required: true,
                                  message: t('error_sername_req'),
                                },
                                {
                                  pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
                                  message: t('error_sername_cont'),
                                },
                              ]}
                            >
                              <div className="userEdit__sername-container">
                                <Input className="userEdit__input-sername" placeholder={t('ph_sername')} defaultValue={userProfile.lastName} />
                              </div>
                            </Form.Item>
                            <Form.Item label={t('title_gender')} name="gender">
                              <div className="userEdit__gender-container">
                                <Radio.Group defaultValue={userProfile.gender}>
                                  <Radio value={REG_FORM_VALUE_MALE}>{t('title_male')}</Radio>
                                  <Radio value={REG_FORM_VALUE_FEMALE}>{t('title_female')}</Radio>
                                </Radio.Group>
                              </div>
                            </Form.Item>
                            <Form.Item label={t('title_birthday')} name="birthday">
                              <div className="userEdit__birthday-container">
                                <ConfigProvider locale={locale}>
                                  <DatePicker id="birthday-field" className="userEdit__birthday" locale={loc} format={dateFormat} placeholder={t('ph_birthday')} defaultValue={(moment(userProfile.dateOfBirth && userProfile.dateOfBirth.date, 'YYYY-MM-DD'))} />
                                </ConfigProvider>
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={t('title_email')}
                              name="email"
                              rules={[
                                {
                                  type: 'email',
                                  message: t('error_email_cont'),
                                },
                                {
                                  required: true,
                                  message: t('error_email_req'),
                                },
                                {
                                  pattern: new RegExp(/^[A-z0-9._-]+@[A-z0-9._-]+.[A-z0-9._-]{1,3}$/i),
                                  message: t('error_email_cont2'),
                                },
                              ]}
                            >
                              <div className="userEdit__email-container">
                                <Input disabled className="userEdit__input-email" placeholder={t('ph_email')} defaultValue={userProfile.email} />
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={t('title_phone')}
                              name="phone"
                              rules={[
                                {
                                  pattern: new RegExp(/^\+7\d{10}$/i),
                                  message: t('error_phone_cont'),
                                },
                              ]}
                            >
                              <div className="userEdit__phone-container">
                                <Input className="userEdit__input-phone" placeholder={t('ph_phone')} defaultValue={userProfile.phone} />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <div className="userEdit__button-container">
                                <Button className="userEdit__button" type="primary" onClick={handleUserEditForm}>{t('button_save')}</Button>
                              </div>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    )
            }
    </div>
  );
};

export default connect(
  (state: State) => (
    {
      loading: state.editUser.loading,
      loaded: state.editUser.loaded,
      error: state.editUser.error,
      editUser: state.editUser.user,
      userProfile: state.userProfile.user,
    }),
  (dispatch) => ({
    doEditUser: bindActionCreators(EditUser, dispatch),
    clearUserEdit: bindActionCreators(clearLoadingAction, dispatch),
    uploadUserAvatar: bindActionCreators(uploadUserAvatarAction, dispatch),
  }),
)(UserEdit);
