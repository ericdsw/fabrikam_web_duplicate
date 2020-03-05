import { request as network } from '../network';
import {
  SHOW_GLOBAL_ERROR_MESSAGE,
  SHOW_GLOBAL_SUCCESS_MESSAGE
} from './applicationActions';

export const REQUEST_BRANCH_OFFICES = "REQUEST_BRANCH_OFFICES";
export const REQUEST_BRANCH_OFFICES_SUCCESS = "REQUEST_BRANCH_OFFICE_SUCCESS";
export const REQUEST_BRANCH_OFFICES_FAILURE = "REQUEST_BRANCH_OFFICE_FAILURE";

export const REQUEST_BRANCH_OFFICES_CREATE = "REQUEST_BRANCH_OFFICES_CREATE";
export const REQUEST_BRANCH_OFFICES_CREATE_SUCCESS = "REQUEST_BRANCH_OFFICES_CREATE_SUCCESS";
export const REQUEST_BRANCH_OFFICES_CREATE_FAILURE = "REQUEST_BRANCH_OFFICES_CREATE_FAILURE";

export const REQUEST_BRANCH_OFFICES_UPDATE = "REQUEST_BRANCH_OFFICES_UPDATE";
export const REQUEST_BRANCH_OFFICES_UPDATE_SUCCESS = "REQUEST_BRANCH_OFFICES_UPDATE_SUCCESS";
export const REQUEST_BRANCH_OFFICES_UPDATE_FAILURE = "REQUEST_BRANCH_OFFICES_UPDATE_FAILURE";

export const REQUEST_ADMIN_USERS = "REQUEST_ADMIN_USERS";
export const REQUEST_ADMIN_USERS_SUCCESS = "REQUEST_ADMIN_USERS_SUCCESS";
export const REQUEST_ADMIN_USERS_FAILURE = "REQUEST_ADMIN_USERS_FAILURE";

export const REQUEST_BRANCH_ITEM = "REQUEST_BRANCH_ITEM";
export const REQUEST_BRANCH_ITEM_SUCCESS = "REQUEST_BRANCH_ITEM_SUCCESS";
export const REQUEST_BRANCH_ITEM_FAILURE = "REQUEST_BRANCH_ITEM_FAILURE";

export const TOGGLE_BRANCH_CREATE_DIALOGUE = "TOGGLE_BRANCH_CREATE_DIALOGUE";

// get the axios instance
const { $http } = network;

export const getBranchOffices = () => async (dispatch) => {
  dispatch({type: REQUEST_BRANCH_OFFICES});
  try {
    const { data } =  await $http.get('sucursales');
    
    dispatch({type: REQUEST_BRANCH_OFFICES_SUCCESS, payload: data.data });
  } catch(error) {
    dispatch({type: REQUEST_BRANCH_OFFICES_FAILURE, payload: error });    
  }
}

export const getBranch = (id) => async (dispatch) => {
  dispatch({type: REQUEST_BRANCH_ITEM});
  try {
    const { data } =  await $http.get(`sucursales/${id}`);    
    dispatch({type: REQUEST_BRANCH_ITEM_SUCCESS, payload: data.data });
  } catch(error) {
    dispatch({type: REQUEST_BRANCH_ITEM_FAILURE, payload: error });    
  }
}

export const getAdminUsers = () => async (dispatch) => {
  dispatch({type: REQUEST_ADMIN_USERS});
  try {
    const { data } =  await $http.get('usuarios?role=ADMIN&status=1');
    dispatch({type: REQUEST_ADMIN_USERS_SUCCESS, payload: data.data });
  } catch(error) {
    dispatch({type: REQUEST_ADMIN_USERS_FAILURE, payload: error });    
  }
}

export const createBranchOffice = (payload) => async (dispatch) => {
  dispatch({type: REQUEST_BRANCH_OFFICES_CREATE});
  try {
    const {
      name,
      address,
      phone,
      status,
      userInChargeId,
      country,
      state
    } = payload;

    const req = {
      nombre: name,
      direccion: address,
      telefono: phone,
      idUsuarioEncargado: userInChargeId,
      pais: country,
      provincia: state,
      estado: status ? 1 : 0
    };

    const { data } =  await $http.post('sucursales', req);
    
    dispatch({type: REQUEST_BRANCH_OFFICES_CREATE_SUCCESS, payload: data.data });
    dispatch({
      type: SHOW_GLOBAL_SUCCESS_MESSAGE,
      payload: { message: 'Sucursal creada exitosamente!' }
    });

    setTimeout(() => {
      dispatch({
        type: SHOW_GLOBAL_SUCCESS_MESSAGE,
        payload: { message: '' }
      });
    }, 4000);
  } catch(error) {
    dispatch({type: REQUEST_BRANCH_OFFICES_CREATE_FAILURE, payload: error }); 
    dispatch({
      type: SHOW_GLOBAL_ERROR_MESSAGE,
      payload: { message: 'Error al crear la sucursal!' }
    });

    setTimeout(() => {
      dispatch({
        type: SHOW_GLOBAL_ERROR_MESSAGE,
        payload: { message: '' }
      });
    }, 4000);      
  }
}

export const updateBranchOffice = (payload) => async (dispatch) => {
  dispatch({type: REQUEST_BRANCH_OFFICES_UPDATE});
  try {
    const {
      id,
      name,
      address,
      phone,
      status,
      userInChargeId,
      country,
      state
    } = payload;

    const req = {
      idSucursal: id,
      nombre: name,
      direccion: address,
      telefono: phone,
      idUsuarioEncargado: userInChargeId,
      pais: country,
      provincia: state,
      estado: status ? 1 : 0
    };

    const { data } =  await $http.put(`sucursales/${id}`, req);
    
    dispatch({type: REQUEST_BRANCH_OFFICES_UPDATE_SUCCESS, payload: data.data });
    dispatch({
      type: SHOW_GLOBAL_SUCCESS_MESSAGE,
      payload: { message: 'Sucursal editada exitosamente!' }
    });

    setTimeout(() => {
      dispatch({
        type: SHOW_GLOBAL_SUCCESS_MESSAGE,
        payload: { message: '' }
      });
    }, 4000);
  } catch(error) {
    dispatch({type: REQUEST_BRANCH_OFFICES_UPDATE_FAILURE, payload: error }); 
    dispatch({
      type: SHOW_GLOBAL_ERROR_MESSAGE,
      payload: { message: 'Error al actualizar la sucursal!' }
    });

    setTimeout(() => {
      dispatch({
        type: SHOW_GLOBAL_ERROR_MESSAGE,
        payload: { message: '' }
      });
    }, 4000);   
  }
}

export const toggleBranchCreateDialogue = isOpen => dispatch => {
  dispatch({
    type: TOGGLE_BRANCH_CREATE_DIALOGUE,
    payload: { isOpen }
  })
}