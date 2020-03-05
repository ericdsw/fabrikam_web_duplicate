import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import session from '../network/session';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => (
        session.isLoggedIn() ?
          <Component {...props} /> :
          <Redirect to={{ pathname: '/login', state: {from: props.location}}} />
      )}
    />
  );
}

export default PrivateRoute;