import { request as networkClient, session } from '../network';
import { Route, Redirect } from 'react-router-dom';

export const REQUEST_ROLES = "REQUEST_ROLES";
export const REQUEST_ROLES_SUCCESS = "REQUEST_ROLES_SUCCESS";
export const REQUEST_ROLES_FAILURE = "REQUEST_ROLES_FAILURE";



export const getRoles = () => dispatch => {


    networkClient.request("GET", "/roles?status=1")
        .then(response => {

            const { data } = response.data
          
            dispatch({
                type: REQUEST_ROLES_SUCCESS,
                payload: {roles: data}
              })
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ROLES_FAILURE,
                payload: { message: error.message }
              })
        })
}

export const REQUEST_ADD_ROLES = "REQUEST_ADD_ROLES";
export const REQUEST_ADD_ROLES_SUCCESS = "REQUEST_ADD_ROLES_SUCCESS";
export const REQUEST_ADD_ROLES_FAILURE = "REQUEST_ADD_ROLES_FAILURE";
export const addRoles = rolesData => dispatch => {
    
    networkClient.request("POST", "/Roles", rolesData)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_ADD_ROLES_SUCCESS,
                payload: {roles: data}
              })
              window.location.href="/roles";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ADD_ROLES_FAILURE,
                payload: { message: error.message }
              })
        })
        window.location.href="/roles";
}

export const REQUEST_SEARCH_ROLES = "REQUEST_SEARCH_ROLES";
export const REQUEST_SEARCH_ROLES_SUCCESS = "REQUEST_SEARCH_ROLES_SUCCESS";
export const REQUEST_SEARCH_ROLES_FAILURE = "REQUEST_SEARCH_ROLES_FAILURE";

export const searchRoles = rolesData => dispatch => {
   
    networkClient.request("GET", "/Roles/"+ rolesData)
        .then(response => {
            const { data } = response.data
           
            dispatch({
                type: REQUEST_SEARCH_ROLES_SUCCESS,
                payload: {roleSch: data}
              })
              
        })
        .catch(error => {
            dispatch({
                type: REQUEST_SEARCH_ROLES_FAILURE,
                payload: { message: error.message }
              })
        })
}
export const REQUEST_SEARCH_ROLES_DESTROY = "REQUEST_SEARCH_ROLES_DESTROY";
export const searchRolesDestroyDlg = () => dispatch => {

    dispatch({
        type: REQUEST_SEARCH_ROLES_SUCCESS,
        payload: {roleSch: { } } 
      })

}

export const REQUEST_UPDATE_ROLES = "REQUEST_UPDATE_ROLES";
export const REQUEST_UPDATE_ROLES_SUCCESS = "REQUEST_UPDATE_ROLES_SUCCESS";
export const REQUEST_UPDATE_ROLES_FAILURE = "REQUEST_UPDATE_ROLES_FAILURE";
export const updateRoles = rolesData => dispatch => {

    
    networkClient.request("PUT", "/Roles/updateRoles", rolesData)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_UPDATE_ROLES_SUCCESS,
                payload: {roles: data}
              })
              window.location.href="/roles";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_UPDATE_ROLES_FAILURE,
                payload: { message: error.message }
              })
        })
        window.location.href="/roles";
}


export const REQUEST_PERMISION_SUCCESS = "REQUEST_PERMISION_SUCCESS";
export const REQUEST_PERMISION_FAILURE = "REQUEST_PERMISION_FAILURE";
export const getPermision = () => dispatch => {

    networkClient.request("GET", "/Menu/menukeys")
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_PERMISION_SUCCESS,
                payload: {perimision: data}
              })
             
        })
        .catch(error => {
            dispatch({
                type: REQUEST_PERMISION_FAILURE,
                payload: { message: error.message }
              })
        })
}

