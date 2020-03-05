import {
  REQUEST_BRANCH_OFFICES,
  REQUEST_BRANCH_OFFICES_SUCCESS,
  REQUEST_BRANCH_OFFICES_FAILURE,
  REQUEST_BRANCH_OFFICES_CREATE,
  REQUEST_BRANCH_OFFICES_CREATE_SUCCESS,
  REQUEST_BRANCH_OFFICES_CREATE_FAILURE,
  REQUEST_BRANCH_OFFICES_UPDATE,
  REQUEST_BRANCH_OFFICES_UPDATE_SUCCESS,
  REQUEST_BRANCH_OFFICES_UPDATE_FAILURE,
  REQUEST_ADMIN_USERS,
  REQUEST_ADMIN_USERS_SUCCESS,
  REQUEST_ADMIN_USERS_FAILURE,
  REQUEST_BRANCH_ITEM,
  REQUEST_BRANCH_ITEM_SUCCESS,
  REQUEST_BRANCH_ITEM_FAILURE,
  TOGGLE_BRANCH_CREATE_DIALOGUE
} from '../actions/branchOfficeActions';

const initialState = {

  branchListRequesting: false,
  branchListError: '',
  branchList: [],

  createDialogueOpen: false,
  branchCreating: false,
  branchCreateError: '',
  branchCreateInputError: {},

  branchUpdating: false,
  branchUpdatingError: '',
  branchUpdateInputError: {},

  adminUsersRequesting: false,
  adminUsers: {},
  adminUsersError: '',

  branchItemRequesting: false,
  branchItem: {},
  branchItemError: ''
}


const convertToModel = (data) => (
  {
    id: data.idSucursal,
    name: data.nombre,
    address: data.direccion,
    phone: data.telefono,
    status: data.estado === 1 ? true : false,
    statusLabel: data.estado === 1 ? 'Activo' : 'Inactivo',
    userInChargeId: data.idUsuarioEncargado,
    userInCharge: data.usuarioEncargado,
    country: data.pais,
    state: data.provincia
  }
);

export default function (state = initialState, action) {
  switch (action.type) {

    case TOGGLE_BRANCH_CREATE_DIALOGUE:

      return {
        ...state,
        createDialogueOpen: action.payload.isOpen
      };

    case REQUEST_BRANCH_OFFICES:
      return {
        ...state,
        branchListRequesting: true,
        branchListError: ''
      };
    case REQUEST_BRANCH_OFFICES_SUCCESS:

      return {
        ...state,
        branchListRequesting: false,
        branchListError: '',
        branchList: action.payload.map(branch => convertToModel(branch))
      };

    case REQUEST_BRANCH_OFFICES_FAILURE:

      return {
        ...state,
        branchListRequesting: false,
        branchListError: action.payload.message
      };

    case REQUEST_BRANCH_OFFICES_CREATE:

      return {
        ...state,
        branchCreating: true,
        branchCreateError: ''
      };

    case REQUEST_BRANCH_OFFICES_CREATE_SUCCESS:
      const branch = convertToModel(action.payload);

      return {
        ...state,
        branchCreating: false,
        branchCreateError: '',
        branchList: [...state.branchList, branch]
      };
    case REQUEST_BRANCH_OFFICES_CREATE_FAILURE:
      return {
        ...state,
        branchCreating: true,
        branchCreateError: action.payload.message
      };

    case REQUEST_BRANCH_OFFICES_UPDATE:
      return {
        ...state,
        branchUpdating: true,
        branchUpdatingError: ''
      };
    case REQUEST_BRANCH_OFFICES_UPDATE_SUCCESS:

      const updatedBranch = convertToModel(action.payload);
      const index = state.branchList.findIndex(b => b.id === updatedBranch.id);
      const branches = [...state.branchList];
      branches[index] = updatedBranch;

      return {
        ...state,
        branchUpdating: false,
        branchUpdatingError: '',
        branchList: branches
      };
    case REQUEST_BRANCH_OFFICES_UPDATE_FAILURE:
      return {
        ...state,
        branchUpdating: false,
        branchUpdatingError: action.payload.message
      };

    case REQUEST_ADMIN_USERS:
      return {
        ...state,
        adminUsersRequesting: true,
        adminUsersError: '',
        adminUsers: {}
      };

    case REQUEST_ADMIN_USERS_SUCCESS:
      const adminUsers = {};
      action.payload.forEach(user => {
        adminUsers[user.idUsuario] = `${user.nombre} ${user.apellido}`
      });

      return {
        ...state,
        adminUsersRequesting: false,
        adminUsersError: '',
        adminUsers
      };

    case REQUEST_ADMIN_USERS_FAILURE:

      return {
        ...state,
        adminUsersRequesting: false,
        adminUsersError: action.payload.message
      };

    case REQUEST_BRANCH_ITEM:

      return {
        ...state,
        branchItemRequesting: true,
        branchItemError: '',
        branchItem: {}
      };

    case REQUEST_BRANCH_ITEM_SUCCESS:

      const branchItem = convertToModel(action.payload);
      return {
        ...state,
        branchItemRequesting: false,
        branchItemError: '',
        branchItem
      };

    case REQUEST_BRANCH_ITEM_FAILURE:

      return {
        ...state,
        branchItemRequesting: false,
        branchItemError: action.payload.message
      };

    default:
      return state;
  }
}
