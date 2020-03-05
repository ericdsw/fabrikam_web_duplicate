import { request as networkClient } from '../network';
import {
  SHOW_GLOBAL_ERROR_MESSAGE,
  SHOW_GLOBAL_MESSAGE
} from './applicationActions';

export const TOGGLE_USER_CREATE_DIALOGUE = "TOGGLE_USER_CREATE_DIALOGUE";
export const toggleUserCreateDialogue = isOpen => dispatch => {
  dispatch({
    type: TOGGLE_USER_CREATE_DIALOGUE,
    payload: { isOpen }
  })
}

export const UPDATE_EDITING_USER = "UPDATE_EDITING_USER";
export const updateEditingUser = user => dispatch => {
  dispatch({
    type: UPDATE_EDITING_USER,
    payload: { user }
  })
}


export const REQUEST_USERS = "REQUEST_USERS";
export const REQUEST_USER_SUCCESS = "REQUEST_USER_SUCCESS";
export const REQUEST_USER_ERROR = "REQUEST_USER_ERROR";

export const getUsers = () => dispatch => {
  dispatch({type: REQUEST_USERS});
  networkClient.request('GET', 'Usuarios')
    .then(response => {
      const { data } = response.data;
      dispatch({
        type: REQUEST_USER_SUCCESS,
        payload: { users: data }
      })
    })
    .catch(error => {
      dispatch({
        type: REQUEST_USER_ERROR,
        payload: { message: error.message }
      })
    });
}

export const REQUEST_USER_CREATE = "REQUEST_USER_CREATE";
export const REQUEST_USER_CREATE_SUCCESS = "REQUEST_USER_CREATE_SUCCESS";
export const REQUEST_USER_CREATE_ERROR = "REQUEST_USER_CREATE_ERROR";

export const createUser = userData => dispatch => {
  dispatch({type: REQUEST_USER_CREATE});
  networkClient.request('POST', 'Usuarios', userData)
    .then(response => {

      // Add te user to the array
      const { data } = response.data;
      dispatch({
        type: REQUEST_USER_CREATE_SUCCESS,
        payload: { newUser: data }
      });

      // Close the Dialogue
      dispatch({
        type: TOGGLE_USER_CREATE_DIALOGUE,
        payload: { isOpen: false }
      });

      dispatch({
        type: SHOW_GLOBAL_MESSAGE,
        payload: { message: "Usuario creado exitosamente!" }
      })

      // Show global message
    })
    .catch(error => {
      dispatch({
        type: SHOW_GLOBAL_ERROR_MESSAGE,
        payload: { message: error.message }
      });
      dispatch({
        type: REQUEST_USER_CREATE_ERROR,
        payload: error
      });
    });
}

export const REQUEST_USER_UPDATE = "REQUEST_USER_UPDATE";
export const REQUEST_USER_UPDATE_SUCCESS = "REQUEST_USER_UPDATE_SUCCESS";
export const REQUEST_USER_UPDATE_ERROR = "REQUEST_USER_SUCCESS_ERROR";

export const updateUser = (userId, userData) => dispatch => {
  dispatch({type: REQUEST_USER_UPDATE});
  networkClient.request('PUT', `Usuarios/${userId}`, userData)
    .then(response => {

      const { data } = response.data;

      dispatch({
        type: UPDATE_EDITING_USER,
        payload: { user: null }
      });

      dispatch({
        type: SHOW_GLOBAL_MESSAGE,
        payload: { message: "Usuario editado exitoramente!" }
      });

      dispatch({
        type: REQUEST_USER_UPDATE_SUCCESS,
        payload: { user: data }
      });

    })
    .catch(error => {
      console.log(error);
    })
}

export const REQUEST_USER_DELETE = "REQUEST_USER_DELETE";
export const REQUEST_USER_DELETE_SUCCESS = "REQUEST_USER_DELETE_SUCCESS";
export const REQUEST_USER_DELETE_ERROR = "REQUEST_USER_DELETE_ERROR";

export const deleteUser = userId => dispatch => {

}