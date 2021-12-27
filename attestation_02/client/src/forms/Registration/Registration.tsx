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
import { useTranslation } from 'react-i18next';
import {
  REG_FORM_VALUE_FEMALE,
  REG_FORM_VALUE_MALE,
} from '../../constants/registration';
import { UserResponseType } from '../../types/api/serverApiResponses';
import { State } from '../../redux/types/state';
import CreateNewUser from '../../redux/actions/registrationActions';
import Loader from '../../components/Loader';
import { USERPROFILE_URL } from '../../constants/api/serverApi';
import '../../locale/i18next';

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
  const { t } = useTranslation('registrationform');
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
        const dateFormat = t('birthday_format');
        if (fields.birthday) {
          user.dateOfBirth = { date: moment(fields.birthday, dateFormat).format('YYYY-MM-DD'), time: '' };
        }
        createUser(user);
      })
      .catch(() => {
        error = t('error_not_all');
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
                      <h1>{t('title_registration')}</h1>
                    </div>
                    <div className="registration__main-container">
                      <Form className="registration__form" layout="vertical" scrollToFirstError form={regForm}>
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
                          <div className="registration__name-container">
                            <Input className="registration__input-name" placeholder={t('ph_name')} />
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
                          <div className="registration__sername-container">
                            <Input className="registration__input-sername" placeholder={t('ph_sername')} />
                          </div>
                        </Form.Item>
                        <Form.Item label={t('title_gender')} name="gender">
                          <div className="registration__gender-container">
                            <Radio.Group>
                              <Radio value={REG_FORM_VALUE_MALE}>{t('title_male')}</Radio>
                              <Radio value={REG_FORM_VALUE_FEMALE}>{t('title_female')}</Radio>
                            </Radio.Group>
                          </div>
                        </Form.Item>
                        <Form.Item label={t('title_birthday')} name="birthday">
                          <div className="registration__birthday-container">
                            <ConfigProvider locale={locale}>
                              <DatePicker className="registration__birthday" locale={loc} format={t('birthday_format')} placeholder={t('ph_birthday')} />
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
                          <div className="registration__email-container">
                            <Input className="registration__input-email" placeholder={t('ph_email')} />
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
                          <div className="registration__phone-container">
                            <Input className="registration__input-phone" placeholder={t('ph_phone')} />
                          </div>
                        </Form.Item>
                        <Form.Item>
                          <div className="registration__button-container">
                            <Button className="registration__button" type="primary" onClick={handleForm}>{t('button_register')}</Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                    <div className="registration__info-container">
                      <span>
                        {t('has_account')}
                      </span>
                      <div>&nbsp;&nbsp;</div>
                      <Link to="/login">
                        <span>
                          {t('title_login')}
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
