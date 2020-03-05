import {
  REQUEST_USERS,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_ERROR,
  REQUEST_USER_CREATE,
  REQUEST_USER_CREATE_SUCCESS,
  REQUEST_USER_CREATE_ERROR,
  REQUEST_USER_UPDATE,
  REQUEST_USER_UPDATE_ERROR,
  REQUEST_USER_DELETE,
  REQUEST_USER_DELETE_SUCCESS,
  REQUEST_USER_DELETE_ERROR,
  REQUEST_USER_UPDATE_SUCCESS,
  TOGGLE_USER_CREATE_DIALOGUE,
  UPDATE_EDITING_USER
} from '../actions/userActions';

const initialState = {

  userListRequesting: false,
  userListError: '',
  userList: [],

  createDialogueOpen: false,
  userCreating: false,
  userCreateError: '',
  userCreateInputError: {},
  editingUser: null,

  userUpdating: false,
  userUpdatingError: '',
  userUpdateInputError: {},

  userDeleting: false,
  userDeletingError: ''
}

export default function(state = initialState, action) {
  switch (action.type) {

    case UPDATE_EDITING_USER:
      return Object.assign({}, state, {
        editingUser: action.payload.user
      });

    case TOGGLE_USER_CREATE_DIALOGUE:
      return Object.assign({}, state, {
        createDialogueOpen: action.payload.isOpen
      });

    case REQUEST_USERS:
      return Object.assign({}, state, {
        userListRequesting: true,
        userListError: ''
      });
    case REQUEST_USER_SUCCESS:
      return Object.assign({}, state, {
        userListRequesting: false,
        userListError: '',
        userList: action.payload.users
      });
    case REQUEST_USER_ERROR:
      return Object.assign({}, state, {
        userListRequesting: false,
        userListError: action.payload.message
      });

      case REQUEST_USER_CREATE:
        return Object.assign({}, state, {
          userCreating: true,
          userCreateError: ''
        });
      case REQUEST_USER_CREATE_SUCCESS:
        let newUserCreateList = [...state.userList]
        newUserCreateList.push(action.payload.newUser);
        return Object.assign({}, state, {
          userCreating: false,
          userCreateError: '',
          userList: newUserCreateList
        });
      case REQUEST_USER_CREATE_ERROR:
        return Object.assign({}, state, {
          userCreating: true,
          userCreateError: action.payload.message
        });

      case REQUEST_USER_UPDATE:
        return Object.assign({}, state, {
          userUpdating: true,
          userUpdatingError: ''
        });
      case REQUEST_USER_UPDATE_SUCCESS:
        let newUpdateUserList = [...state.userList];
        let edittedUser = action.payload.user;
        for (let i = 0; i < newUpdateUserList.length; i++) {
          if (newUpdateUserList[i].idUsuario === edittedUser.idUsuario) {
            newUpdateUserList[i] = edittedUser;
            break;
          }
        }
        return Object.assign({}, state, {
          userUpdating: false,
          userUpdatingError: '',
          userList: newUpdateUserList
        });
      case REQUEST_USER_UPDATE_ERROR:
        return Object.assign({}, state, {
          userUpdating: false,
          userUpdatingError: action.payload.message
        });

      case REQUEST_USER_DELETE:
        return Object.assign({}, state, {
          userDeleting: true,
          userDeletingError: ''
        });
      case REQUEST_USER_DELETE_SUCCESS:
        const newDeleteUserList = [...state.userList];
        let deletingOffset = -1;
        for(let i = 0; i < newDeleteUserList.length; i++) {
          if (newDeleteUserList[i].id === action.payload.userId) {
            deletingOffset = i;
            break;
          }
        }
        newDeleteUserList.splice(deletingOffset, 1);
        return Object.assign({}, state, {
          userDeleting: false,
          userDeletingError: '',
          userList: newDeleteUserList
        });
      case REQUEST_USER_DELETE_ERROR:
        return Object.assign({}, state, {
          userDeleting: false,
          userDeletingError: action.payload.message
        });

    default:
      return state;
  }
}