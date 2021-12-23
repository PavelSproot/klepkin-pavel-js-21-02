import React from 'react';
import './UserEdit.scss';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ConfigProvider, DatePicker, Form, Input, Radio,
} from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import loc from 'antd/es/date-picker/locale/ru_RU';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  REG_FORM_ERROR_EMAIL_CONT,
  REG_FORM_ERROR_EMAIL_CONT2,
  REG_FORM_ERROR_EMAIL_REQ,
  REG_FORM_ERROR_NAME_CONT,
  REG_FORM_ERROR_NAME_REQ,
  REG_FORM_ERROR_NOT_ALL,
  REG_FORM_ERROR_PHONE_CONT,
  REG_FORM_ERROR_SERNAME_CONT,
  REG_FORM_ERROR_SERNAME_REQ,
  REG_FORM_PH_BIRTHDAY,
  REG_FORM_PH_EMAIL,
  REG_FORM_PH_NAME,
  REG_FORM_PH_PHONE,
  REG_FORM_PH_SERNAME,
  REG_FORM_TITLE_BIRTHDAY,
  REG_FORM_TITLE_BUTTON_SAVE,
  REG_FORM_TITLE_EMAIL,
  REG_FORM_TITLE_FEMALE,
  REG_FORM_TITLE_GENDER,
  REG_FORM_TITLE_MALE,
  REG_FORM_TITLE_NAME,
  REG_FORM_TITLE_PHONE,
  REG_FORM_TITLE_SERNAME,
  REG_FORM_VALUE_FEMALE,
  REG_FORM_VALUE_MALE,
} from '../constants/registration';
import { UserResponseType } from '../types/api/dumMyApiResponses';
import { State } from '../redux/types/state';
import Loader from './Loader';
import { USERPROFILE_URL } from '../constants/api/dummyApi';
import EditUser, { clearLoadingAction } from '../redux/actions/editUserActions';
import { makeDigitDateFromISO } from '../utills/stringFunctions';

interface Props {
  editUser: UserResponseType,
  userProfile: UserResponseType,
  loading: boolean;
  loaded: boolean;
  error: any;
  doEditUser: (user: UserResponseType) => void;
  closeCallback: () => void;
  reloadCallback: (id: string) => void;
  clearUserEdit: () => void;
}

const UserEdit = function ({
  editUser, userProfile, loading, loaded, error, doEditUser, closeCallback, reloadCallback, clearUserEdit,
}: Props) {
  const navigate = useNavigate();
  const [editUserForm] = Form.useForm();
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
          user.dateOfBirth = moment(fields.birthday, 'DD.MM.YYYY').format('YYYY-MM-DD');
        }
        doEditUser(user);
      })
      .catch(() => {
        error = REG_FORM_ERROR_NOT_ALL;
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
                              birthday: moment(userProfile.dateOfBirth && makeDigitDateFromISO(userProfile.dateOfBirth), 'DD.MM.YYYY'),
                              email: userProfile.email,
                              phone: userProfile.phone,
                              picture: userProfile.picture,
                            }}
                          >
                            <Form.Item
                              name="picture"
                            >
                              <div className="userEdit__avatar-container">
                                <img className="userEdit__avatar-img" src={userProfile.picture} alt={userProfile.picture} />
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={REG_FORM_TITLE_NAME}
                              name="firstName"
                              rules={[
                                {
                                  required: true,
                                  message: REG_FORM_ERROR_NAME_REQ,
                                },
                                {
                                  pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
                                  message: REG_FORM_ERROR_NAME_CONT,
                                },
                              ]}
                            >
                              <div className="userEdit__name-container">
                                <Input className="userEdit__input-name" placeholder={REG_FORM_PH_NAME} defaultValue={userProfile.firstName} />
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={REG_FORM_TITLE_SERNAME}
                              name="serName"
                              rules={[
                                {
                                  required: true,
                                  message: REG_FORM_ERROR_SERNAME_REQ,
                                },
                                {
                                  pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
                                  message: REG_FORM_ERROR_SERNAME_CONT,
                                },
                              ]}
                            >
                              <div className="userEdit__sername-container">
                                <Input className="userEdit__input-sername" placeholder={REG_FORM_PH_SERNAME} defaultValue={userProfile.lastName} />
                              </div>
                            </Form.Item>
                            <Form.Item label={REG_FORM_TITLE_GENDER} name="gender">
                              <div className="userEdit__gender-container">
                                <Radio.Group defaultValue={userProfile.gender}>
                                  <Radio value={REG_FORM_VALUE_MALE}>{REG_FORM_TITLE_MALE}</Radio>
                                  <Radio value={REG_FORM_VALUE_FEMALE}>{REG_FORM_TITLE_FEMALE}</Radio>
                                </Radio.Group>
                              </div>
                            </Form.Item>
                            <Form.Item label={REG_FORM_TITLE_BIRTHDAY} name="birthday">
                              <div className="userEdit__birthday-container">
                                <ConfigProvider locale={locale}>
                                  <DatePicker className="userEdit__birthday" locale={loc} format="DD.MM.YYYY" placeholder={REG_FORM_PH_BIRTHDAY} defaultValue={moment(userProfile.dateOfBirth && makeDigitDateFromISO(userProfile.dateOfBirth), 'DD.MM.YYYY')} />
                                </ConfigProvider>
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={REG_FORM_TITLE_EMAIL}
                              name="email"
                              rules={[
                                {
                                  type: 'email',
                                  message: REG_FORM_ERROR_EMAIL_CONT,
                                },
                                {
                                  required: true,
                                  message: REG_FORM_ERROR_EMAIL_REQ,
                                },
                                {
                                  pattern: new RegExp(/^[A-z0-9._-]+@[A-z0-9._-]+.[A-z0-9._-]{1,3}$/i),
                                  message: REG_FORM_ERROR_EMAIL_CONT2,
                                },
                              ]}
                            >
                              <div className="userEdit__email-container">
                                <Input disabled className="userEdit__input-email" placeholder={REG_FORM_PH_EMAIL} defaultValue={userProfile.email} />
                              </div>
                            </Form.Item>
                            <Form.Item
                              label={REG_FORM_TITLE_PHONE}
                              name="phone"
                              rules={[
                                {
                                  pattern: new RegExp(/^\+7\d{10}$/i),
                                  message: REG_FORM_ERROR_PHONE_CONT,
                                },
                              ]}
                            >
                              <div className="userEdit__phone-container">
                                <Input className="userEdit__input-phone" placeholder={REG_FORM_PH_PHONE} defaultValue={userProfile.phone} />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <div className="userEdit__button-container">
                                <Button className="userEdit__button" type="primary" onClick={handleUserEditForm}>{REG_FORM_TITLE_BUTTON_SAVE}</Button>
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
  }),
)(UserEdit);
