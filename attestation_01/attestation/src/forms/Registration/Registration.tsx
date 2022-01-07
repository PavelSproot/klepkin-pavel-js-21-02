import React from 'react';
import './Registration.scss';
import { Link, useNavigate } from 'react-router-dom';
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
  REG_FORM_TITLE_BUTTON_REGISTER,
  REG_FORM_TITLE_EMAIL,
  REG_FORM_TITLE_FEMALE,
  REG_FORM_TITLE_GENDER,
  REG_FORM_TITLE_HAS_ACCOUNT,
  REG_FORM_TITLE_LOGIN,
  REG_FORM_TITLE_MALE,
  REG_FORM_TITLE_NAME,
  REG_FORM_TITLE_PHONE,
  REG_FORM_TITLE_REGISTRATION,
  REG_FORM_TITLE_SERNAME,
  REG_FORM_VALUE_FEMALE,
  REG_FORM_VALUE_MALE,
} from '../../constants/registration';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import { State } from '../../redux/types/state';
import CreateNewUser from '../../redux/actions/registrationActions';
import Loader from '../../components/Loader';
import { USERPROFILE_URL } from '../../constants/api/dummyApi';

interface Props {
  registerUser: UserResponseType,
  loading: boolean;
  loaded: boolean;
  error: any;
  createUser: (user: UserResponseType) => void;
}

const Registration = function ({
  registerUser, loading, loaded, error, createUser,
}: Props) {
  const navigate = useNavigate();
  const [regForm] = Form.useForm();
  const handleForm = (): void => {
    regForm
      .validateFields()
      .then((fields) => {
        const user: UserResponseType = {
          lastName: fields.serName,
          firstName: fields.firstName,
          phone: fields.phone,
          email: fields.email,
          gender: fields.gender,
          title: 'mr',
        };
        if (fields.birthday) {
          user.dateOfBirth = moment(fields.birthday, 'DD.MM.YYYY').format('YYYY-MM-DD');
        }
        createUser(user);
      })
      .catch(() => {
        error = REG_FORM_ERROR_NOT_ALL;
      });
  };
  if (loaded && !loading) {
    navigate(`/${USERPROFILE_URL}/${registerUser.id}`);
  }
  return (
    <div className="registration">
      {
            error
              ? <div>{error}</div>
              : loading
                ? (
                  <div className="registration__loader-container">
                    <Loader />
                  </div>
                )
                : loaded ? <div /> : (
                  <div>
                    <div className="registration__header">
                      <h1>{REG_FORM_TITLE_REGISTRATION}</h1>
                    </div>
                    <div className="registration__main-container">
                      <Form className="registration__form" layout="vertical" scrollToFirstError form={regForm}>
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
                          <div className="registration__name-container">
                            <Input className="registration__input-name" placeholder={REG_FORM_PH_NAME} />
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
                          <div className="registration__sername-container">
                            <Input className="registration__input-sername" placeholder={REG_FORM_PH_SERNAME} />
                          </div>
                        </Form.Item>
                        <Form.Item label={REG_FORM_TITLE_GENDER} name="gender">
                          <div className="registration__gender-container">
                            <Radio.Group>
                              <Radio value={REG_FORM_VALUE_MALE}>{REG_FORM_TITLE_MALE}</Radio>
                              <Radio value={REG_FORM_VALUE_FEMALE}>{REG_FORM_TITLE_FEMALE}</Radio>
                            </Radio.Group>
                          </div>
                        </Form.Item>
                        <Form.Item label={REG_FORM_TITLE_BIRTHDAY} name="birthday">
                          <div className="registration__birthday-container">
                            <ConfigProvider locale={locale}>
                              <DatePicker className="registration__birthday" locale={loc} format="DD.MM.YYYY" placeholder={REG_FORM_PH_BIRTHDAY} />
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
                          <div className="registration__email-container">
                            <Input className="registration__input-email" placeholder={REG_FORM_PH_EMAIL} />
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
                          <div className="registration__phone-container">
                            <Input className="registration__input-phone" placeholder={REG_FORM_PH_PHONE} />
                          </div>
                        </Form.Item>
                        <Form.Item>
                          <div className="registration__button-container">
                            <Button className="registration__button" type="primary" onClick={handleForm}>{REG_FORM_TITLE_BUTTON_REGISTER}</Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                    <div className="registration__info-container">
                      <span>
                        {REG_FORM_TITLE_HAS_ACCOUNT}
                      </span>
                      <div>&nbsp;&nbsp;</div>
                      <Link to="/login">
                        <span>
                          {REG_FORM_TITLE_LOGIN}
                        </span>
                      </Link>
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
      loading: state.registerUser.loading,
      loaded: state.registerUser.loaded,
      error: state.registerUser.error,
      registerUser: state.registerUser.user,
    }),
  (dispatch) => ({
    createUser: bindActionCreators(CreateNewUser, dispatch),
  }),
)(Registration);
