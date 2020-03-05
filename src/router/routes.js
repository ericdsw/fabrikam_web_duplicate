import createRoute from './createRoute';
import ExamplePage from '../components/Example/ExamplePage';

import MainDashboard from '../components/Dashboard/MainDashboard';
import LoginPage from '../components/Auth/LoginPage';
import ForgottenPassword from '../components/Auth/ForgottenPassword';
import ResetPasswordPage from '../components/Auth/ResetPasswordPage';
import Provider from '../components/Provider';
import Articles from '../components/Articles';
import BankAccount from '../components/BankAccount';
import Branches from '../components/Branches';
import UserListPage from '../components/Users/UserListPage';
import Roles from '../components/Roles/Roles';


import ArticleEntryPage from '../components/Articles/ArticleEntryPage';
import ArticleExitPage from '../components/Articles/ArticleExitPage';
import ArticleTransferPage from '../components/Articles/ArticleTransferPage';

import { Catalog as CatalogReport } from '../components/Reports';

export default [
  createRoute({ path: '/', component: MainDashboard, private: true }),
  createRoute({ path: '/login', component: LoginPage}),
  createRoute({ path: '/resetPassword', component: ResetPasswordPage}),
  createRoute({ path: '/providers', component: Provider, private: true}),
  createRoute({ path: '/roles', component: Roles, private: true}),
  createRoute({ path: '/forgottenPassword', component: ForgottenPassword, private: false}),
  createRoute({ path: '/users', component: UserListPage, private: true}),
  createRoute({ path: '/articles', component: Articles, private: true}),
  createRoute({ path: '/branchOffices', component: Branches, private: true}),
  createRoute({path: '/providers/:providerId/bankAccount', component: BankAccount, private: true}),
  createRoute({ path: '/articles', component: Articles, private: true}),
  createRoute({ path: '/transferArticles', component: ArticleTransferPage, private: true}),
  createRoute({ path: '/enterArticle', component: ArticleEntryPage, private: true}),
  createRoute({ path: '/exitArticles', component: ArticleExitPage, private: true}),
  createRoute({ path: '/articlesPerBranch', component: CatalogReport, private: true})
];