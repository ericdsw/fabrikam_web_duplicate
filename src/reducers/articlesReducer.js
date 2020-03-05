import {
    REQUEST_TYPESARTICLES,
    REQUEST_TYPESARTICLES_SUCCESS,
    REQUEST_TYPESARTICLES_FAILURE,
    REQUEST_ARTICLES,
    REQUEST_ARTICLES_SUCCESS,
    REQUEST_ARTICLES_FAILURE,
    REQUEST_SEARCH_ARTICLE_DESTROY,
    REQUEST_ARTICLEBYID,
    REQUEST_ARTICLEBYID_SUCCESS,
    REQUEST_ARTICLEBYID_FAILURE,
    REQUEST_ADDSARTICLES,
    REQUEST_ADDARTICLES_SUCCESS,
    REQUEST_ADDARTICLES_FAILURE,
    REQUEST_UPDATESARTICLES,
    REQUEST_UPDATEARTICLES_SUCCESS,
    REQUEST_UPDATEARTICLES_FAILURE,

    REQUEST_ENTER_ITEM,
    ENTER_ITEM_SUCCESS,
    ENTER_ITEM_FAILURE,

    ARTICLES_PER_BRANCH_SUCCESS,
  } from "../actions/articlesActions";

  const initialState = {

    articlesPerBranch: [],
    requestingEnterItemToBranch: false,

    requestingTypesArticlesList: false,
    requestTypesArticlesError: "",
    typesArticlesList: [],

    requestingArticlesList: false,
    requestArticlesError: "",
    articlesList: [],

    articleSearch: {},
    articleSearchError: "",
    articleSearchInputError:"",

    requestingArticlesById: false,
    requestArticleByIdError: "",
    article: {},

    requestingAddArticle: false,
    requestAddArticleError: "",
    articlesAdd: {},

    requestingUpdateArticle: false,
    requestUpdateArticleError: "",
    articlesUpdate: {},
  };

  export default function(state = initialState, action) {
    switch (action.type) {

      case REQUEST_ENTER_ITEM:
        return Object.assign({}, state, {
          requestingEnterItemToBranch: true
        });
      case ENTER_ITEM_SUCCESS:
        return Object.assign({}, state, {
          requestingEnterItemToBranch: false
        });
      case ENTER_ITEM_FAILURE:
        return Object.assign({}, state, {
          requestingEnterItemToBranch: false
        });

      case ARTICLES_PER_BRANCH_SUCCESS:
        return Object.assign({}, state, {
          articlesPerBranch: action.payload.articles
        });

      case REQUEST_TYPESARTICLES:
          return Object.assign({}, state, {
            requestTypesArticlesError: '',
            requestingTypesArticlesList: true,
            typesArticlesList : action.payload.typesArticles
            });
      case REQUEST_TYPESARTICLES_FAILURE:

          return Object.assign({}, state, {
            requestArticlesError: action.payload.message,
              loading: false
            });
      case REQUEST_TYPESARTICLES_SUCCESS:

          return Object.assign({}, state, {
            requestTypesArticlesError: '',
            requestingTypesArticlesList: true,
            typesArticlesList: action.payload.typesArticles
            });

      case REQUEST_ARTICLES:
          return Object.assign({}, state, {
            requestArticlesError: '',
            requestingArticlesList: true,
            articlesList : action.payload.articles
            });
      case REQUEST_ARTICLES_FAILURE:

          return Object.assign({}, state, {
            requestArticlesError: action.payload.message,
              loading: false
            });
      case REQUEST_ARTICLES_SUCCESS:

          return Object.assign({}, state, {
            requestArticlesError: '',
            requestingArticlesList: true,
            articlesList: action.payload.articles
            });
      case REQUEST_SEARCH_ARTICLE_DESTROY:
              return Object.assign({}, state, {

                article: action.payload.article,
                requestArticleByIdError: '',
                requestingArticlesById: true,

            });
      case REQUEST_ARTICLEBYID:
          return Object.assign({}, state, {
            requestArticleByIdError: '',
            requestingArticlesById: true,
            article : action.payload.article
          });
      case REQUEST_ARTICLEBYID_FAILURE:

          return Object.assign({}, state, {
            requestArticleByIdError: action.payload.message,
            loading: false
          });
      case REQUEST_ARTICLEBYID_SUCCESS:

          return Object.assign({}, state, {
            requestArticleByIdError: '',
            requestingArticlesById: true,
            article: action.payload.article
          });
      case REQUEST_ADDSARTICLES:
          return Object.assign({}, state, {
            requestAddArticleError: '',
            requestingAddArticle: true,
            articlesAdd : action.payload.articles
            });
      case REQUEST_ADDARTICLES_FAILURE:

          return Object.assign({}, state, {
            requestAddArticleError: action.payload.message,
              loading: false
            });
      case REQUEST_ADDARTICLES_SUCCESS:

          return Object.assign({}, state, {
            requestAddArticleError: '',
            requestingAddArticle: true,
            articlesAdd: action.payload.articles
            });
      case REQUEST_UPDATESARTICLES:
              return Object.assign({}, state, {
                requestUpdateArticleError: '',
                requestingUpdateArticle: true,
                articlesUpdate : action.payload.articles
                });
      case REQUEST_UPDATEARTICLES_FAILURE:

              return Object.assign({}, state, {
                requestUpdateArticleError: action.payload.message,
                  loading: false
                });
      case REQUEST_UPDATEARTICLES_SUCCESS:

              return Object.assign({}, state, {
                requestUpdateArticleError: '',
                requestingUpdateArticle: true,
                articlesUpdate: action.payload.articles
                });
      default:
        return state;
    }
  }