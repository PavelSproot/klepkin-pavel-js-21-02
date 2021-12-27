import React, { useEffect } from 'react';
import './Header.scss';
import { TeamOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import { SITE_NAME } from '../constants/common';
import {
  HEADER_LOGIN_LABEL, HEADER_LOGOUT_LABEL, HEADER_POSTS_LABEL, HEADER_REGISTER_LABEL, HEADER_USERS_LABEL,
} from '../constants/header';
import { State } from '../redux/types/state';
import loadUserAuth, { logOutAction } from '../redux/actions/loginActions';
import LocalStorageAuth from '../utills/localStore';

interface Props {
  id: string;
  username: string;
  avatar: string;
  logout: () => void;
  login: (id: string) => void;
}

const Header = function ({
  id, username, avatar, logout, login,
}: Props) {
  useEffect(() => {
    const lsAuth = new LocalStorageAuth();
    const lsItem = lsAuth.getItem();
    if (lsItem) {
      login(lsItem);
    }
  }, []);
  return (
    <div className="header">
      <div className="header__left-part">
        <div className="header__logo-container">
          <img src="logo.png" alt={`${SITE_NAME}`} />
        </div>
        <div className="header__sitename-container">
          <span><b>{SITE_NAME}</b></span>
        </div>
      </div>
      <div className="header__central-part">
        <div className="header__users-container">
          <TeamOutlined className="header__icons" />
          <Link to="/users"><span className="header__users-title">{HEADER_USERS_LABEL}</span></Link>
        </div>
        <div className="header__posts-container">
          <SnippetsOutlined className="header__icons" />
          <Link to="/posts"><span className="header__posts-title">{HEADER_POSTS_LABEL}</span></Link>
        </div>
      </div>
      <div className="header__right-part">
        <div className="header__login-container header__div-right-border">
          {
                id
                  ? (
                    <div className="header__username-container">
                      <div className="header__avatar">
                        { (avatar ? <img className="header__avatar-img" src={avatar} alt={username} /> : <div />)}
                      </div>
                      <div className="header__username"><Link to={`/userprofile/${id}`}>{username}</Link></div>
                    </div>
                  )
                  : (<div><Link to="/login"><span>{HEADER_LOGIN_LABEL}</span></Link></div>
                  )
            }
        </div>
        <div className="header__register-container">
          {
          id
            ? <Button className="header__logout-link" type="link" onClick={logout}><span>{HEADER_LOGOUT_LABEL}</span></Button>
            : <Link to="/registration"><span>{HEADER_REGISTER_LABEL}</span></Link>
          }
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    id: state.authUser.user.id || '',
    username: state.authUser.user.firstName || '',
    avatar: state.authUser.user.picture || '',
  }),
  (dispatch) => ({
    logout: bindActionCreators(logOutAction, dispatch),
    login: bindActionCreators(loadUserAuth, dispatch),
  }),
)(Header);
