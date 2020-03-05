import React from 'react';
import NotFoundPage from '../components/NotFound/NotFoundPage';
import { Route } from 'react-router-dom';

const FallbackRoute = () => {
  return <Route component={NotFoundPage} />
}

export default FallbackRoute ;
