import {
  TOGGLE_DARK_MODE,
  TOGGLE_DRAWER,
  SHOW_GLOBAL_SUCCESS_MESSAGE,
  SHOW_GLOBAL_ERROR_MESSAGE,
  SHOW_GLOBAL_MESSAGE
} from '../actions/applicationActions';

const initialState = {
  themeMode: 'light',
  drawerOpen: false,
  globalMessage: '',
  globalErrorMessage: '',
  globalSuccessMessage: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_DARK_MODE:
      return Object.assign({}, state, {
        themeMode: action.payload.isDarkMode ? 'dark' : 'light'
      });
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: action.payload.isDrawerOpen
      });
    case SHOW_GLOBAL_SUCCESS_MESSAGE:
      return Object.assign({}, state, {
        globalSuccessMessage: action.payload.message
      });
    case SHOW_GLOBAL_ERROR_MESSAGE:
      return Object.assign({}, state, {
        globalErrorMessage: action.payload.message
      });
    case SHOW_GLOBAL_MESSAGE:
      return Object.assign({}, state, {
        globalMessage: action.payload.message
      });
    default:
      return state;
  }
}
