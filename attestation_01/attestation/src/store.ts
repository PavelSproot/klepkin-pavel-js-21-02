import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import users from './reducers/userListReducer';

const store = createStore(
  combineReducers(
    {
      users,
    },
  ),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
