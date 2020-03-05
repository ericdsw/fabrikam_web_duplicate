import { request as networkClient, session } from '../network';
import {
  SHOW_GLOBAL_ERROR_MESSAGE,
  SHOW_GLOBAL_MESSAGE,
  SHOW_GLOBAL_SUCCESS_MESSAGE
} from './applicationActions';

export const REQUEST_TYPESARTICLES = "REQUEST_TYPESARTICLES";
export const REQUEST_TYPESARTICLES_SUCCESS = "REQUEST_TYPESARTICLES_SUCCESS";
export const REQUEST_TYPESARTICLES_FAILURE = "REQUEST_TYPESARTICLES_FAILURE";

export const getTypesArticles = () => dispatch => {

    networkClient.request("GET", "TipoArticulos/tipoArticulos")
        .then(response => {

            const { data } = response.data

            dispatch({
                type: REQUEST_TYPESARTICLES_SUCCESS,
                payload: {typesArticles: data}
              })
        })
        .catch(error => {
            dispatch({
                type: REQUEST_TYPESARTICLES_FAILURE,
                payload: { message: error.message }
              })
        })
}

export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const REQUEST_ARTICLES_SUCCESS = "REQUEST_ARTICLES_SUCCESS";
export const REQUEST_ARTICLES_FAILURE = "REQUEST_ARTICLES_FAILURE";

export const getArticles = () => dispatch => {

    networkClient.request("GET", "articulos/articulos")
        .then(response => {

            const { data } = response.data

            dispatch({
                type: REQUEST_ARTICLES_SUCCESS,
                payload: {articles: data}
              })
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ARTICLES_FAILURE,
                payload: { message: error.message }
              })
        })
}

export const REQUEST_SEARCH_ARTICLE_DESTROY = "REQUEST_SEARCH_ARTICLE_DESTROY";
export const articleDestroyDlg = () => dispatch => {

    dispatch({
        type: REQUEST_SEARCH_ARTICLE_DESTROY,
        payload: {article: { } }
      })

}

export const REQUEST_ARTICLEBYID = "REQUEST_ARTICLEBYID";
export const REQUEST_ARTICLEBYID_SUCCESS = "REQUEST_ARTICLEBYID_SUCCESS";
export const REQUEST_ARTICLEBYID_FAILURE = "REQUEST_ARTICLEBYID_FAILURE";

export const getArticleById = (idArticle) => dispatch => {
    networkClient.request("GET", `articulos/getArticuloById/${idArticle}` )
    .then(response => {

        const { data } = response.data

        dispatch({
            type: REQUEST_ARTICLEBYID_SUCCESS,
            payload: {article: data}
          })
    })
    .catch(error => {
        dispatch({
            type: REQUEST_ARTICLEBYID_FAILURE,
            payload: { message: error.message }
          })
    })
}

export const REQUEST_ADDSARTICLES = "REQUEST_ADDARTICLES";
export const REQUEST_ADDARTICLES_SUCCESS = "REQUEST_ADDARTICLES_SUCCESS";
export const REQUEST_ADDARTICLES_FAILURE = "REQUEST_ADDARTICLES_FAILURE";
export const addArticles = articuloData => dispatch => {

    networkClient.request("POST", "articulos/addArticulo", articuloData)
        .then(response => {

            const { data } = response.data

            dispatch({
                type: REQUEST_ADDARTICLES_SUCCESS,
                payload: {articles: data}
              })
              window.location.href="/articles";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ADDARTICLES_FAILURE,
                payload: { message: error.message }
              })
        })
}


export const REQUEST_UPDATESARTICLES = "REQUEST_UPDATESARTICLES";
export const REQUEST_UPDATEARTICLES_SUCCESS = "REQUEST_UPDATEARTICLES_SUCCESS";
export const REQUEST_UPDATEARTICLES_FAILURE = "REQUEST_UPDATEARTICLES_FAILURE";
export const updateArticles = articuloData => dispatch => {

    networkClient.request("PUT", "articulos/updateArticulo", articuloData)
        .then(response => {

            const { data } = response.data

            dispatch({
                type: REQUEST_ADDARTICLES_SUCCESS,
                payload: {articles: data}
              })
              window.location.href="/articles";
        })
        .catch(error => {
            dispatch({
                type: REQUEST_ADDARTICLES_FAILURE,
                payload: { message: error.message }
              })
        })
}

export const REQUEST_ENTER_ITEM = "REQUEST_ENTER_ITEM";
export const ENTER_ITEM_SUCCESS = "ENTER_ITEM_SUCCESS";
export const ENTER_ITEM_FAILURE = "ENTER_ITEM_FAILURE";
export const enterArticleToBranchOffice = requestData => dispatch => {
  dispatch({type: REQUEST_ENTER_ITEM});
  networkClient.request('POST', 'movimientos', requestData)
    .then(response => {
      dispatch({type: ENTER_ITEM_SUCCESS});
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ENTER_ITEM_FAILURE,
        payload: error
      })
    })
}

export const REQUEST_ARTICLES_PER_BRANCH = "REQUEST_ARTICLES_PER_BRANCH";
export const ARTICLES_PER_BRANCH_SUCCESS = "ARTICLES_PER_BRANCH_SUCCESS";
export const requestArticlesPerBranch = branchId => dispatch => {
  networkClient.request('GET', `/inventario/GetSucursal/${branchId}`)
    .then(response => {
      const { data } = response.data;
      dispatch({
        type: ARTICLES_PER_BRANCH_SUCCESS,
        payload: { articles: data }
      })
    })
    .catch(error => {
      console.log(error);
    })
}

export const transferArticlesBetweenBranches = requestData => dispatch => {
  dispatch({type: REQUEST_ENTER_ITEM});
  networkClient.request('POST', 'movimientos', requestData)
    .then(response => {
      dispatch({type: ENTER_ITEM_SUCCESS});
    })
    .catch(error => {
      dispatch({
        type: ENTER_ITEM_FAILURE,
        payload: error
      })
    })
}