import {
  REQUEST_PROVIDERS,
  REQUEST_PROVIDERS_FAILURE,
  REQUEST_PROVIDERS_SUCCESS,
  REQUEST_ADD_PROVIDER,
  REQUEST_ADD_PROVIDER_FAILURE,
  REQUEST_ADD_PROVIDER_SUCCESS,
  REQUEST_SEARCH_PROVIDER,
  REQUEST_SEARCH_PROVIDER_FAILURE,
  REQUEST_SEARCH_PROVIDER_SUCCESS,
  REQUEST_SEARCH_PROVIDER_DESTROY,
  REQUEST_UPDATE_PROVIDER,
  REQUEST_UPDATE_PROVIDER_FAILURE,
  REQUEST_UPDATE_PROVIDER_SUCCESS
} from "../actions/providerActions";

const initialState = {
  requestingProvidersList: false,
  requestProvidersError: "",
  providerList: [],

  providerCreating: false,
  providerCreateError: "",
  providerCreateInputError: {},


  providerSearch: {},
  providerSearchError: "",
  providerSearchInputError:"",

  providerUpdate: false,
  providerUpdateError: "",
  providerUpdateInputError: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROVIDERS:
      return Object.assign({}, state, {
        requestProvidersError: "",
        requestingProvidersList: true,
        providerList: action.payload.provider
      });
    case REQUEST_PROVIDERS_FAILURE:
      return Object.assign({}, state, {
        requestProvidersError: action.payload.message,
        loading: false
      });
    case REQUEST_PROVIDERS_SUCCESS:
      return Object.assign({}, state, {
        requestProvidersError: "",
        requestingProvidersList: true,
        providerList: action.payload.provider
      });
    case REQUEST_ADD_PROVIDER:
      return Object.assign({}, state, {
        providerCreating: true,
        providerCreateError: ""
      });
    case REQUEST_ADD_PROVIDER_FAILURE:
      return Object.assign({}, state, {
        providerCreating: true,
        providerCreateError: action.payload.message
      });

    case REQUEST_ADD_PROVIDER_SUCCESS:
      let newProviderCreateList = [...state.providerList];
      newProviderCreateList.push(action.payload.provider);
      return Object.assign({}, state, {
        providerCreating: false,
        providerCreateError: "",
        providerList: newProviderCreateList
      });
    case REQUEST_SEARCH_PROVIDER:
      return Object.assign({}, state, {
        providerSearch: action.payload.provider,
        providerSearchError: "",
        providerSearchInputError:"" 
      });
    case REQUEST_SEARCH_PROVIDER_FAILURE:
      return Object.assign({}, state, {
     
        providerSearchError: action.payload.message
      });

    case REQUEST_SEARCH_PROVIDER_SUCCESS:
    
      return Object.assign({}, state, {
        
        providerSearch: action.payload.providerSch,
        providerSearchError: "",
        providerSearchInputError:"" 
      });
    case REQUEST_SEARCH_PROVIDER_DESTROY:
      return Object.assign({}, state, {
        
        providerSearch: action.payload.providerSch,
        providerSearchError: "",
        providerSearchInputError:"" 
        
      });
    case REQUEST_UPDATE_PROVIDER:

      return Object.assign({}, state, {
        providerUpdateError: "",
        providerUpdate: true,
        providerUpdateInputError: action.payload.provider
      });

    case REQUEST_UPDATE_PROVIDER_FAILURE:
      return Object.assign({}, state, {
        providerUpdate: true,
        providerUpdateInputError: action.payload.message
      });

    case REQUEST_UPDATE_PROVIDER_SUCCESS:
      return Object.assign({}, state, {
        providerUpdateError: "",
        providerUpdate: true,
        providerUpdateInputError: action.payload.provider
      });
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
}
