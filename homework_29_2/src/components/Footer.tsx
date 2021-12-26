import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import './Footer.scss';
import { Switch } from 'antd';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ThemeContext } from '../themeContext';
import '../locale/i18next';

const Footer = function () {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation('footer');

  const handleChangeLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    i18next.changeLanguage(e.currentTarget.value);
    moment.locale(e.currentTarget.value);
    e.preventDefault();
  };

  useEffect(() => {
    moment.locale(i18next.language);
  }, [i18next.language]);

  return (
    <div className="footer">
      <div className="footer__left-part">
        <span><b>{t('sitename')}</b></span>
        <span><b>&nbsp;&copy;&nbsp;</b></span>
        <span><b>2020-2022</b></span>
      </div>
      <div className="footer__middle-part">
        <div className="language-buttons">
          <button value="en" type="button" onClick={handleChangeLanguage}>EN</button>
          <button value="ru" type="button" onClick={handleChangeLanguage}>RU</button>
        </div>
      </div>
      <div className="footer__right-part">
        <span>{t('darktheme')}</span>
        <span>&nbsp;&nbsp;</span>
        <Switch defaultChecked={false} onChange={theme.toggleTheme} />
      </div>
    </div>
  );
};

export default Footer;
