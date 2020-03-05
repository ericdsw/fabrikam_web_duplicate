// Reducer combination tools
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Local Reducers
import applicationReducer from './applicationReducer';
import authReducer from './authReducer';
import providerReducer from './providerReducer';
import articlesReducer from './articlesReducer';
import userReducer from './userReducer';
import bankAccountReducer from './bankAccountReducer';
import branchOfficeReducer from './branchOfficeReducer';
import rolesReducer from './rolesReducer';
import reportsReducer from './reportsReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  app: applicationReducer,
  auth: authReducer,
  provider: providerReducer,
  articles: articlesReducer,
  user: userReducer,
  bankAccount: bankAccountReducer,
  branches: branchOfficeReducer,
  roles: rolesReducer,
  reports: reportsReducer
});

export default createRootReducer