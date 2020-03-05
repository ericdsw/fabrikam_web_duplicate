import {
  REQUEST_BANKACCOUNT,
  REQUEST_BANKACCOUNT_FAILURE,
  REQUEST_BANKACCOUNT_SUCCESS,
  REQUEST_ADD_BANKACCOUNT,
  REQUEST_ADD_BANKACCOUNT_FAILURE,
  REQUEST_ADD_BANKACCOUNT_SUCCESS,
  REQUEST_SEARCH_BANKACCOUNT,
  REQUEST_SEARCH_BANKACCOUNT_FAILURE,
  REQUEST_SEARCH_BANKACCOUNT_SUCCESS,
  REQUEST_SEARCH_BANKACCOUNT_DESTROY,
  REQUEST_UPDATE_BANKACCOUNT,
  REQUEST_UPDATE_BANKACCOUNT_FAILURE,
  REQUEST_UPDATE_BANKACCOUNT_SUCCESS,
  REQUEST_DELETE_BANKACCOUNT,
  REQUEST_DELETE_BANKACCOUNT_SUCCESS,
  REQUEST_DELETE_BANKACCOUNT_FAILURE,
  searchBankAccount
} from "../actions/bankAccountActions";

const initialState = {
  requestingBankAccountList: false,
  requestBankAccountError: "",
  bankAccountList: [],

  bankAccountCreating: false,
  bankAccountCreateError: "",
  bankAccountCreateInputError: {},


  bankAccountSearch: {},
  bankAccountSearchError: "",
  bankAccountSearchInputError: "",

  bankAccountUpdate: false,
  bankAccountUpdateError: "",
  bankAccountUpdateInputError: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_BANKACCOUNT:
      return Object.assign({}, state, {
        requestBankAccountError: "",
        requestingBankAccountList: true,
        bankAccountList: action.payload.bankAccount
      });
    case REQUEST_BANKACCOUNT_FAILURE:
      return Object.assign({}, state, {
        requestBankAccountError: action.payload.message,
        loading: false
      });
    case REQUEST_BANKACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        requestBankAccountError: "",
        requestingBankAccountList: false,
        bankAccountList: action.payload.bankAccount
      });
    case REQUEST_ADD_BANKACCOUNT:
      return Object.assign({}, state, {
        bankAccountCreating: true,
        bankAccountCreateError: ""
      });
    case REQUEST_ADD_BANKACCOUNT_FAILURE:
      return Object.assign({}, state, {
        bankAccountCreating: true,
        bankAccountCreateError: action.payload.message
      });

    case REQUEST_ADD_BANKACCOUNT_SUCCESS:
      let newBankAccountCreateList = [...state.bankAccountList];
      newBankAccountCreateList.push(action.payload.bankAccount);
      return Object.assign({}, state, {
        bankAccountCreating: false,
        bankAccountCreateError: "",
        bankAccountList: newBankAccountCreateList
      });
    case REQUEST_SEARCH_BANKACCOUNT:
      return Object.assign({}, state, {
        bankAccountSearch: action.payload.bankAccount,
        bankAccountSearchError: "",
        bankAccountSearchInputError: ""
      });
    case REQUEST_SEARCH_BANKACCOUNT_FAILURE:
      return Object.assign({}, state, {

        bankAccountSearchError: action.payload.message
      });

    case REQUEST_SEARCH_BANKACCOUNT_SUCCESS:

      return Object.assign({}, state, {

        bankAccountSearch: action.payload.bankAccountSch,
        bankAccountSearchError: "",
        bankAccountSearchInputError: ""
      });
    case REQUEST_SEARCH_BANKACCOUNT_DESTROY:
      return Object.assign({}, state, {

        bankAccountSearch: action.payload.bankAccountSch,
        bankAccountSearchError: "",
        bankAccountSearchInputError: ""

      });
    case REQUEST_UPDATE_BANKACCOUNT:

      return Object.assign({}, state, {
        bankAccountUpdateError: "",
        bankAccountUpdate: true,
        bankAccountUpdateInputError: action.payload.bankAccount
      });

    case REQUEST_UPDATE_BANKACCOUNT_FAILURE:
      return Object.assign({}, state, {
        bankAccountUpdate: true,
        bankAccountUpdateInputError: action.payload.message
      });

    case REQUEST_UPDATE_BANKACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        bankAccountUpdateError: "",
        bankAccountUpdate: true,
        bankAccountUpdateInputError: action.payload.bankAccount
      });
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
}
