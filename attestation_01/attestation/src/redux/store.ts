import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import users from './reducers/userListReducer';
import posts from './reducers/postListReducer';
import post from './reducers/postFullReducer';
import comments from './reducers/commentListReducer';
import userProfile from './reducers/userProfileReducer';
import registerUser from './reducers/registrationReducer';
import authUser from './reducers/loginReducer';
import editUser from './reducers/editUserReducer';

const store = createStore(
  combineReducers(
    {
      users,
      posts,
      post,
      comments,
      userProfile,
      registerUser,
      authUser,
      editUser,
    },
  ),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
