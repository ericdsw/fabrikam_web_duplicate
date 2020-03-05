import { request as network } from '../network';

export const REQUEST_CATALOG_REPORT = "REQUEST_CATALOG_REPORT";
export const REQUEST_CATALOG_REPORT_SUCCESS = "REQUEST_CATALOG_REPORT_SUCCESS";
export const REQUEST_CATALOG_REPORT_FAILURE = "REQUEST_CATALOG_REPORT_FAILURE";

// get the axios instance
const { $http } = network;

export const getCatalogByBranch = (branchId) => async (dispatch) => {
  dispatch({type: REQUEST_CATALOG_REPORT});
  try {
    const { data } =  await $http.get(`inventario/GetSucursal/${branchId}`);
    dispatch({type: REQUEST_CATALOG_REPORT_SUCCESS, payload: data.data });
  } catch(error) {
    dispatch({type: REQUEST_CATALOG_REPORT_FAILURE, payload: error });
  }
}
