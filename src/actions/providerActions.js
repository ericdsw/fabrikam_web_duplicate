import { request as networkClient, session } from '../network';
import { Route, Redirect } from 'react-router-dom';

export const REQUEST_PROVIDERS = "REQUEST_PROVIDERS";
export const REQUEST_PROVIDERS_SUCCESS = "REQUEST_PROVIDERS_SUCCESS";
export const REQUEST_PROVIDERS_FAILURE = "REQUEST_PROVIDERS_FAILURE";



export const getProviders = () => dispatch => {


    networkClient.request("GET", "Proveedor/providers")
        .then(response => {

            const { data } = response.data
          
            dispatch({
                type: REQUEST_PROVIDERS_SUCCESS,
                payload: {provider: data}
              })
        })
        .catch(error => {
            dispatch({
                type: REQUEST_PROVIDERS_FAILURE,
                payload: { message: error.message }
              })
        })
}

export const REQUEST_ADD_PROVIDER = "REQUEST_ADD_PROVIDER";
export const REQUEST_ADD_PROVIDER_SUCCESS = "REQUEST_ADD_PROVIDER_SUCCESS";
export const REQUEST_ADD_PROVIDER_FAILURE = "REQUEST_ADD_PROVIDER_FAILURE";
export const addProvider = providerData => dispatch => {
    
    networkClient.request("POST", "/Proveedor/addProvider", providerData)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_ADD_PROVIDER_SUCCESS,
                payload: {provider: data}
              })
              window.location.href="/providers";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ADD_PROVIDER_FAILURE,
                payload: { message: error.message }
              })
        })
}

export const REQUEST_SEARCH_PROVIDER = "REQUEST_SEARCH_PROVIDER";
export const REQUEST_SEARCH_PROVIDER_SUCCESS = "REQUEST_SEARCH_PROVIDER_SUCCESS";
export const REQUEST_SEARCH_PROVIDER_FAILURE = "REQUEST_SEARCH_PROVIDER_FAILURE";

export const searchProvider = providerData => dispatch => {
   
    networkClient.request("GET", "/Proveedor/getProviderById/"+ providerData)
        .then(response => {
            const { data } = response.data
           
            dispatch({
                type: REQUEST_SEARCH_PROVIDER_SUCCESS,
                payload: {providerSch: data}
              })
              
        })
        .catch(error => {
            dispatch({
                type: REQUEST_SEARCH_PROVIDER_FAILURE,
                payload: { message: error.message }
              })
        })
}
export const REQUEST_SEARCH_PROVIDER_DESTROY = "REQUEST_SEARCH_PROVIDER_DESTROY";
export const searchProviderDestroyDlg = () => dispatch => {

    dispatch({
        type: REQUEST_SEARCH_PROVIDER_SUCCESS,
        payload: {providerSch: { } } 
      })

}

export const REQUEST_UPDATE_PROVIDER = "REQUEST_UPDATE_PROVIDER";
export const REQUEST_UPDATE_PROVIDER_SUCCESS = "REQUEST_UPDATE_PROVIDER_SUCCESS";
export const REQUEST_UPDATE_PROVIDER_FAILURE = "REQUEST_UPDATE_PROVIDER_FAILURE";
export const updateProvider = providerData => dispatch => {

    console.log(providerData);
    networkClient.request("PUT", "/Proveedor/updateProvider", providerData)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_UPDATE_PROVIDER_SUCCESS,
                payload: {provider: data}
              })
              window.location.href="/providers";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_UPDATE_PROVIDER_FAILURE,
                payload: { message: error.message }
              })
        })
}