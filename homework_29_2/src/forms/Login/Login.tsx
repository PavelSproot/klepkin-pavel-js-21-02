import { connect } from 'react-redux';
import './Login.scss';
import { bindActionCreators } from 'redux';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { State } from '../../redux/types/state';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import loadUserAuth from '../../redux/actions/loginActions';
import Loader from '../../components/Loader';
import { USERPROFILE_URL } from '../../constants/api/dummyApi';
import '../../locale/i18next';

interface Props {
  authUser: UserResponseType,
  loading: boolean;
  loaded: boolean;
  error: any;
  authorizeUser: (id: string) => void;
}

const Login = function ({
  authUser,
  loading,
  loaded,
  error,
  authorizeUser,
}: Props) {
  const { t } = useTranslation('loginform');
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const handleForm = (): void => {
    loginForm
      .validateFields()
      .then((fields) => {
        const data = { userID: fields.userid };
        authorizeUser(data.userID);
      })
      .catch(() => {
        error = t('error_not_all');
      });
  };
  if (loaded && !loading && authUser && authUser.id) {
    navigate(`/${USERPROFILE_URL}/${authUser.id}`);
  }
  return (
    <div className="login">
      {
                error
                  ? <div>{error}</div>
                  : loading
                    ? (
                      <div className="login__loader-container">
                        <Loader />
                      </div>
                    )
                    : (loaded && authUser && authUser.id) ? <div /> : (
                      <div>
                        <div className="login__header">
                          <h1>{t('login')}</h1>
                        </div>
                        <div className="login__main-container">
                          <Form className="login__form" layout="vertical" scrollToFirstError form={loginForm}>
                            <Form.Item
                              label={t('id')}
                              name="userid"
                              rules={[
                                {
                                  required: true,
                                  message: t('error_id_req'),
                                },
                              ]}
                            >
                              <div className="login__id-container">
                                <Input className="login__input-id" placeholder={t('id_ph')} />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <div className="login__button-container">
                                <Button className="login__button" type="primary" onClick={handleForm}>{t('button_login')}</Button>
                              </div>
                            </Form.Item>
                          </Form>
                        </div>
                        <div className="login__info-container">
                          <span>
                            {t('has_account')}
                          </span>
                          <div>&nbsp;&nbsp;</div>
                          <Link to="/login">
                            <span>
                              {t('registration')}
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
      loading: state.authUser.loading,
      loaded: state.authUser.loaded,
      error: state.authUser.error,
      authUser: state.authUser.user,
    }),
  (dispatch) => ({
    authorizeUser: bindActionCreators(loadUserAuth, dispatch),
  }),
)(Login);
