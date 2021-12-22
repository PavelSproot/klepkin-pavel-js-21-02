import { connect } from 'react-redux';
import './Login.scss';
import { bindActionCreators } from 'redux';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { State } from '../../redux/types/state';
import { UserResponseType } from '../../types/api/dumMyApiResponses';
import loadUserAuth from '../../redux/actions/loginActions';
import Loader from '../../components/Loader';
import { USERPROFILE_URL } from '../../constants/api/dummyApi';
import {
  LOGIN_FORM_ERROR_ID_REQ, LOGIN_FORM_ERROR_NOT_ALL,
  LOGIN_FORM_PH_ID, LOGIN_FORM_TITLE_BUTTON_LOGIN, LOGIN_FORM_TITLE_HAS_ACCOUNT,
  LOGIN_FORM_TITLE_ID,
  LOGIN_FORM_TITLE_LOGIN,
  LOGIN_FORM_TITLE_REGISTER,
} from '../../constants/login';

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
        error = LOGIN_FORM_ERROR_NOT_ALL;
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
                          <h1>{LOGIN_FORM_TITLE_LOGIN}</h1>
                        </div>
                        <div className="login__main-container">
                          <Form className="login__form" layout="vertical" scrollToFirstError form={loginForm}>
                            <Form.Item
                              label={LOGIN_FORM_TITLE_ID}
                              name="userid"
                              rules={[
                                {
                                  required: true,
                                  message: LOGIN_FORM_ERROR_ID_REQ,
                                },
                              ]}
                            >
                              <div className="login__id-container">
                                <Input className="login__input-id" placeholder={LOGIN_FORM_PH_ID} />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <div className="login__button-container">
                                <Button className="login__button" type="primary" onClick={handleForm}>{LOGIN_FORM_TITLE_BUTTON_LOGIN}</Button>
                              </div>
                            </Form.Item>
                          </Form>
                        </div>
                        <div className="login__info-container">
                          <span>
                            {LOGIN_FORM_TITLE_HAS_ACCOUNT}
                          </span>
                          <div>&nbsp;&nbsp;</div>
                          <Link to="/login">
                            <span>
                              {LOGIN_FORM_TITLE_REGISTER}
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
