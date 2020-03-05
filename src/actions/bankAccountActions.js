import { request as networkClient, session } from '../network';
import { Route, Redirect } from 'react-router-dom';

export const REQUEST_BANKACCOUNT = "REQUEST_BANKACCOUNT";
export const REQUEST_BANKACCOUNT_SUCCESS = "REQUEST_BANKACCOUNT_SUCCESS";
export const REQUEST_BANKACCOUNT_FAILURE = "REQUEST_BANKACCOUNT_FAILURE";
export const getBankAccount = () => dispatch => {

    networkClient.request("GET", "CuentaBancaria/accounts")
        .then(response => {

            const { data } = response.data
            dispatch({
                type: REQUEST_BANKACCOUNT_SUCCESS,
                payload: { bankAccount: data }
            })
        })
        .catch(error => {
            dispatch({
                type: REQUEST_BANKACCOUNT_FAILURE,
                payload: { message: error.message }
            })
        })
}

export const getBankAccountByProvider = bankAccountData => dispatch => {


    networkClient.request("GET", "CuentaBancaria/getAccountByProvider/" + bankAccountData)
        .then(response => {

            const { data } = response.data
            dispatch({
                type: REQUEST_BANKACCOUNT_SUCCESS,
                payload: { bankAccount: data }
            })
        })
        .catch(error => {
            dispatch({
                type: REQUEST_BANKACCOUNT_FAILURE,
                payload: { message: error.message }
            })
        })
}

export const REQUEST_ADD_BANKACCOUNT = "REQUEST_ADD_BANKACCOUNT";
export const REQUEST_ADD_BANKACCOUNT_SUCCESS = "REQUEST_ADD_BANKACCOUNT_SUCCESS";
export const REQUEST_ADD_BANKACCOUNT_FAILURE = "REQUEST_ADD_BANKACCOUNT_FAILURE";
export const addBankAccount = bankAccountData => dispatch => {

    networkClient.request("POST", "/CuentaBancaria/addAccount", bankAccountData)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_ADD_BANKACCOUNT_SUCCESS,
                payload: { bankAccount: data }
            })
            window.location.href = "/providers/" + bankAccountData.idProveedor + "/bankAccount";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ADD_BANKACCOUNT_FAILURE,
                payload: { message: error.message }
            })
        })
}

export const REQUEST_SEARCH_BANKACCOUNT = "REQUEST_SEARCH_BANKACCOUNT";
export const REQUEST_SEARCH_BANKACCOUNT_SUCCESS = "REQUEST_SEARCH_BANKACCOUNT_SUCCESS";
export const REQUEST_SEARCH_BANKACCOUNT_FAILURE = "REQUEST_SEARCH_BANKACCOUNT_FAILURE";
export const searchBankAccount = bankAccountData => dispatch => {
    console.log(bankAccountData);
    networkClient.request("GET", "/CuentaBancaria/getAccount/" + bankAccountData)
        .then(response => {
            const { data } = response.data
            console.log(data);
            dispatch({
                type: REQUEST_SEARCH_BANKACCOUNT_SUCCESS,
                payload: { bankAccountSch: data }
            })

        })
        .catch(error => {
            dispatch({
                type: REQUEST_SEARCH_BANKACCOUNT_FAILURE,
                payload: { message: error.message }
            })
        })
}

export const REQUEST_SEARCH_BANKACCOUNT_DESTROY = "REQUEST_SEARCH_BANKACCOUNT_DESTROY";
export const searchBankAccountDestroyDlg = () => dispatch => {

    dispatch({
        type: REQUEST_SEARCH_BANKACCOUNT_SUCCESS,
        payload: { bankAccountSch: {} }
    })

}

export const REQUEST_UPDATE_BANKACCOUNT = "REQUEST_UPDATE_BANKACCOUNT";
export const REQUEST_UPDATE_BANKACCOUNT_SUCCESS = "REQUEST_UPDATE_BANKACCOUNT_SUCCESS";
export const REQUEST_UPDATE_BANKACCOUNT_FAILURE = "REQUEST_UPDATE_BANKACCOUNT_FAILURE";
export const updateBankAccount = bankAccountData => dispatch => {

    console.log(bankAccountData);
    networkClient.request("PUT", "/CuentaBancaria/updateAccount", bankAccountData)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_UPDATE_BANKACCOUNT_SUCCESS,
                payload: { bankAccount: data }
            })
            window.location.href = "/providers/" + bankAccountData.idProveedor + "/bankAccount";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_UPDATE_BANKACCOUNT_FAILURE,
                payload: { message: error.message }
            })
        })
}


export const REQUEST_DELETE_BANKACCOUNT = "REQUEST_DELETE_BANKACCOUNT";
export const REQUEST_DELETE_BANKACCOUNT_SUCCESS = "REQUEST_DELETE_BANKACCOUNT_SUCCESS";
export const REQUEST_DELETE_BANKACCOUNT_FAILURE = "REQUEST_DELETE_BANKACCOUNT_FAILURE";
export const deleteBankAccount = (idCuentaBancaria, idProveedor) => dispatch => {
    networkClient.request("DELETE", "/CuentaBancaria/deleteAccount/" + idCuentaBancaria)
        .then(response => {
            const { data } = response.data
            dispatch({
                type: REQUEST_DELETE_BANKACCOUNT_SUCCESS,
                payload: { bankAccount: data }
            })
            window.location.href = "/providers/" + idProveedor + "/bankAccount";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_DELETE_BANKACCOUNT_FAILURE,
                payload: { message: error.message }
            })
        })
}