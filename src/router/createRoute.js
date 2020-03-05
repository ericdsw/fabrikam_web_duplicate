import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'

const defaultRouteParams = {
  path: '',
  exact: true,
  component: null,
  private: false
}

// This method creates alternative route elements depending on
// wether the user is logged in or not
export default function createRoute(routeParams = {}) {
  const routeData = Object.assign({}, defaultRouteParams, routeParams);
  if (!routeData.private) {
      return <Route key={routeData.path} {...routeData} />
  } else {
      return <PrivateRoute key={routeData.path} {...routeData} />
  }
}