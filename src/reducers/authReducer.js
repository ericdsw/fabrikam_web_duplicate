import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,

  CLEAR_LOGIN_INPUT_ERROR
} from '../actions/authActions';

const initialState = {

  // Login
  loading: false,
  errorMessage: '',
  inputErrors: {},

  // Changing Password
  changingPassword: false,
  changingPasswordError: '',
  changingPasswordInputErrors: {},

  // Resetting Password
  resettingPassword: false,
  resetPasswordError: '',

   // Forgot Password
   forgottenPassword: false,
   forgottenPasswordError: '',
   forgottenPasswordInputErrors: {},
}

export default function(state = initialState, action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        errorMessage: '',
        inputErrors: [],
        loading: true
      });
    case LOGIN_SUCCESSFUL:
      return Object.assign({}, state, {
        errorMessage: '',
        inputErrors: [],
        loading: false
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        errorMessage: action.payload.message,
        inputErrors: action.payload.errors,
        loading: false
      });
    case RESET_PASSWORD_REQUESTED:
      return Object.assign({}, state, {
        resettingPassword: true,
        resetPasswordError: ''
      });
    case RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        resettingPassword: false,
        resetPasswordError: ''
      });
    case RESET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        resettingPassword: false,
        resetPasswordError: action.payload.message
      });

    case CLEAR_LOGIN_INPUT_ERROR:
      var newErrors = {...state.inputErrors};
      delete newErrors[action.payload.errorKey];
      return Object.assign({}, state, {
        inputErrors: newErrors
      });
    case FORGOT_PASSWORD_REQUESTED:
      return Object.assign({}, state, {
        forgottenPassword: true,
        forgottenPasswordError: '',
      });
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        resettingPassword: false,
        resetPasswordError: ''
      });
    case FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        resettingPassword: false,
        forgottenPasswordError: action.payload.message
      });
    default:
      return state;
  }
}