import axios from 'axios';
import session from './session';

import { baseUrl } from '../globals';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Intercept and inject the token
axiosInstance.interceptors.request.use(
  (config) => {
    if (session.isLoggedIn()) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${session.getUserToken()}`
        }
      };
    }

    return {
      ...config,
      headers: {
        ...config.headers
      }
    };
  },
  /* istanbul ignore next */
  (error) => Promise.reject(error)
);


function request(method, url, parameters) {
  let promise = new Promise((resolve, reject) => {
    axiosInstance({
      method: method,
      url: url,
      data: parameters
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {

        // Handle unauthorized
        if (error.response) {
          if (error.response.status === 401) {
            session.logout();
          }
        }

        const customError = {
          message: '',
          errors: []
        }

        // Handle extras
        try {
          const errorResponse = JSON.parse(error.request.response);
          if (errorResponse.message) {
            customError.message = errorResponse.message;
          } else if (errorResponse.errors) {
            let errors = {}
            Object.keys(errorResponse.errors).forEach(errorKey => {
              errors[errorKey.toLowerCase()] = errorResponse.errors[errorKey];
            });
            customError.errors = errors;
            console.log(errors);
          } else {
            customError.message = "An error has ocurred, please try again later";
          }
        } catch(error) {
          customError.message = "Malformed Response"
        }

        reject(customError);
      });
  });

  return promise;
}

export default {
  request,
  $http: axiosInstance
};