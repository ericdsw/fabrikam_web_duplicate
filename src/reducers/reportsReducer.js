import {
  REQUEST_CATALOG_REPORT,
  REQUEST_CATALOG_REPORT_SUCCESS,
  REQUEST_CATALOG_REPORT_FAILURE
} from '../actions/reportActions';

const initialState = {
  catalogByBranchRequesting: false,
  catalogByBranchError: '',
  catalogByBranch: []
}

export default function (state = initialState, action) {
  switch (action.type) {

    case REQUEST_CATALOG_REPORT:
      return {
        ...state,
        catalogByBranchRequesting: true,
        catalogByBranchError: ''
      };

    case REQUEST_CATALOG_REPORT_SUCCESS:

      return {
        ...state,
        catalogByBranchRequesting: false,
        catalogByBranchError: '',
        catalogByBranch: [...action.payload]
      };

    case REQUEST_CATALOG_REPORT_FAILURE:

      return {
        ...state,
        catalogByBranchRequesting: false,
        catalogByBranchError: action.payload.message
      };

    default:
      return state;
  }
}
