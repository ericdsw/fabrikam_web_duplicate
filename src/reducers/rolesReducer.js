import {
  REQUEST_ROLES,
  REQUEST_ROLES_FAILURE,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ADD_ROLES,
  REQUEST_ADD_ROLES_FAILURE,
  REQUEST_ADD_ROLES_SUCCESS,
  REQUEST_SEARCH_ROLES,
  REQUEST_SEARCH_ROLES_FAILURE,
  REQUEST_SEARCH_ROLES_SUCCESS,
  REQUEST_SEARCH_ROLES_DESTROY,
  REQUEST_UPDATE_ROLES,
  REQUEST_UPDATE_ROLES_FAILURE,
  REQUEST_UPDATE_ROLES_SUCCESS,
  REQUEST_PERMISION_SUCCESS,
  REQUEST_PERMISION_FAILURE
} from "../actions/rolesActions";

const initialState = {
  requestingRolesList: false,
  requestRolesError: "",
  rolesList: [],

  rolesCreating: false,
  rolesCreateError: "",
  rolesCreateInputError: {},


  roleSearched: {},
  roleSearchedError: "",
  roleSearchedInputError:"",

  rolesUpdate: false,
  rolesUpdateError: "",
  rolesUpdateInputError: {},

  requestPermisionError: "",
  permisionList: []

};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ROLES:
      return Object.assign({}, state, {
        requestRolesError: "",
        requestingRolesList: true,
        rolesList: action.payload.roles
      });
    case REQUEST_ROLES_FAILURE:
      return Object.assign({}, state, {
        requestRolesError: action.payload.message,
        loading: false
      });
    case REQUEST_ROLES_SUCCESS:
      return Object.assign({}, state, {
        requestRolesError: "",
        requestingRolesList: true,
        rolesList: action.payload.roles
      });
    case REQUEST_ADD_ROLES:
      return Object.assign({}, state, {
        rolesCreating: true,
        rolesCreateError: ""
      });
    case REQUEST_ADD_ROLES_FAILURE:
      return Object.assign({}, state, {
        rolesCreating: true,
        rolesCreateError: action.payload.message
      });

    case REQUEST_ADD_ROLES_SUCCESS:
      let newRolesCreateList = [...state.rolesList];
      newRolesCreateList.push(action.payload.roles);
      return Object.assign({}, state, {
        rolesCreating: false,
        rolesCreateError: "",
        rolesList: newRolesCreateList
      });
    case REQUEST_SEARCH_ROLES:
      return Object.assign({}, state, {
        roleSearched: action.payload.roles,
        roleSearchedError: "",
        roleSearchedInputError:"" 
      });
    case REQUEST_SEARCH_ROLES_FAILURE:
      return Object.assign({}, state, {
     
        roleSearchedError: action.payload.message
      });

    case REQUEST_SEARCH_ROLES_SUCCESS:
    
      return Object.assign({}, state, {
        
        roleSearched: action.payload.roleSch,
        roleSearchedError: "",
        roleSearchedInputError:"" 
      });
    case REQUEST_SEARCH_ROLES_DESTROY:
      return Object.assign({}, state, {
        
        roleSearched: action.payload.roleSch,
        roleSearchedError: "",
        roleSearchedInputError:"" 
        
      });
    case REQUEST_UPDATE_ROLES:

      return Object.assign({}, state, {
        rolesUpdateError: "",
        rolesUpdate: true,
        rolesUpdateInputError: action.payload.roles
      });

    case REQUEST_UPDATE_ROLES_FAILURE:
      return Object.assign({}, state, {
        rolesUpdate: true,
        rolesUpdateInputError: action.payload.message
      });

    case REQUEST_UPDATE_ROLES_SUCCESS:
      return Object.assign({}, state, {
        rolesUpdateError: "",
        rolesUpdate: true,
        rolesUpdateInputError: action.payload.roles
      });
      case REQUEST_PERMISION_SUCCESS:
        return Object.assign({}, state, {
          requestPermisionError: "",
          permisionList: action.payload.perimision
         
        });
      case REQUEST_PERMISION_FAILURE:
        return Object.assign({}, state, {
          requestPermisionError:  action.payload.message,
          permisionList: []
         
        });
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
}
