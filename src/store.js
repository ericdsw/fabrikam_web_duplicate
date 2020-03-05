import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

// History
export const history = createBrowserHistory();

// Middleware Registration
const middlewares = [thunkMiddleware, routerMiddleware(history)];
const composition = composeWithDevTools(applyMiddleware(...middlewares));

// Initial state
const initialState = {};

const store = createStore(rootReducer(history), initialState, composition);

export default store;