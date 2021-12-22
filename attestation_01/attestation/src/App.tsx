import React, { useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import './App.scss';
import UserList from './forms/UserList/UserList';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './forms/PostList/PostList';
import UserProfile from './forms/UserProfile/UserProfile';
import Registration from './forms/Registration/Registration';
import Login from './forms/Login/Login';
import { ThemeContext, ThemeContextState } from './themeContext';

const App = function () {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme((prevVal) => !prevVal);
  };

  const st :ThemeContextState = {
    darkTheme,
    toggleTheme,
  };

  return (
    <HashRouter>
      <ThemeContext.Provider value={st}>
        <div className={`App${darkTheme ? ' dark-theme-container' : ''}`}>
          <div className="App__total-container">
            <div className="App__header_virtual" />
            <div className={`App__header${darkTheme ? ' dark-theme' : ''}`}>
              <div className="App__header-container">
                <Header />
              </div>
            </div>
            <div className="App__mainForm">
              <Routes>
                <Route path="/users" element={<UserList />} />
                <Route path="/userprofile/:userId" element={<UserProfile />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <div className="App__footer_virtual2" />
            <div className={`App__footer2${darkTheme ? ' dark-theme' : ''}`}>
              <div className="App__footer-container">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </HashRouter>
  );
};

export default App;
