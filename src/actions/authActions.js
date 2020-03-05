import { request as networkClient, session } from '../network';
import { push } from 'connected-react-router';

import {
  SHOW_GLOBAL_ERROR_MESSAGE,
  SHOW_GLOBAL_MESSAGE
} from './applicationActions';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESFUL";
export const LOGIN_FAILED = "LOGIN_FAILED"

export const login = (email, password) => dispatch => {

  dispatch({type: LOGIN_REQUEST});

  networkClient.request('POST', 'auth/login', { email, password })
    .then(response => {
      const { data } = response.data;
      session.writeUserData(data);
      dispatch({type: LOGIN_SUCCESSFUL});
      dispatch(push('/'));
    })
    .catch(error => {
      if (error.message) {
        dispatch({
          type: SHOW_GLOBAL_ERROR_MESSAGE,
          payload: { message: error.message }
        })
      }
      dispatch({
        type: LOGIN_FAILED,
        payload: error
      })
    });
}

export const CLEAR_LOGIN_INPUT_ERROR = "CLEAR_LOGIN_INPUT_ERROR";
export const clearInputError = errorKey => dispatch => {
  dispatch({
    type: CLEAR_LOGIN_INPUT_ERROR,
    payload: { errorKey }
  })
}

const LOGOUT = "LOGOUT";
export const logout = () => dispatch => {
  session.logout();
  dispatch(push('/login'));
}

export const RESET_PASSWORD_REQUESTED = "RESET_PASSWORD_REQUESTED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const resetPassword = newPassword => dispatch => {

  dispatch({type: RESET_PASSWORD_REQUESTED});

  networkClient.request('POST', 'passwordReset', { newPassword })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
        payload: error
      })
    });
}

const REQUEST_CHANGE_PASSWORD = "REQUEST_CHANGE_PASSWORD";
const PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS";
const PASSWORD_CHANGE_ERROR = "PASSWORD_CHANGE_ERROR";
export const changePassword = (oldPassword, newPassword) => dispatch => {
  dispatch({type: REQUEST_CHANGE_PASSWORD});
  networkClient.request('POST', 'me/change-password', { oldPassword, newPassword })
    .then(response => {
      session.logout();
      dispatch({type: PASSWORD_CHANGE_SUCCESS});
      dispatch({
        type: SHOW_GLOBAL_MESSAGE,
        payload: {
          message: '¡Contraseña editada! Por favor ingrese nuevamente a la plataforma.'
        }
      });
      dispatch(push("/login"));
    })
    .catch(error => {
      dispatch({
        type: SHOW_GLOBAL_ERROR_MESSAGE,
        payload: { message: error.message }
      })
      dispatch({
        type: PASSWORD_CHANGE_ERROR,
        payload: error
      })
    });
}


export const FORGOT_PASSWORD_REQUESTED = "FORGOT_PASSWORD_REQUESTED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
export const forgotPassword = (Email) => dispatch => {

  networkClient.request('POST', 'auth/forgot-password', Email)
  .then(response => {
    session.logout();
    dispatch({type: PASSWORD_CHANGE_SUCCESS});
    dispatch({
      type: SHOW_GLOBAL_MESSAGE,
      payload: {
        message: '¡Se ha enviado un correo con un enlace para cambiar su contraseña!'
      }
    });
    dispatch(push("/login"));
  })
  .catch(error => {
    dispatch({
      type: SHOW_GLOBAL_ERROR_MESSAGE,
      payload: { message: error.message }
    })
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error
    })
  });

}