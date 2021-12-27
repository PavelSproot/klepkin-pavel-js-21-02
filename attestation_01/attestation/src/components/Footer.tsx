import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import './Footer.scss';
import { Switch } from 'antd';
import { DARK_THEME_TEXT, SITE_NAME } from '../constants/common';
import { ThemeContext } from '../themeContext';

const Footer = function () {
  useEffect(() => {

  }, []);

  const theme = useContext(ThemeContext);

  return (
    <div className="footer">
      <div className="footer__left-part">
        <span><b>{SITE_NAME}</b></span>
        <span><b>&nbsp;&copy;&nbsp;</b></span>
        <span><b>2020-2022</b></span>
      </div>
      <div className="footer__right-part">
        <span>{DARK_THEME_TEXT}</span>
        <span>&nbsp;&nbsp;</span>
        <Switch defaultChecked={false} onChange={theme.toggleTheme} />
      </div>
    </div>
  );
};

export default Footer;
