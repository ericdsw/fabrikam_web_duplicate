import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import {
  showGlobalErrorMessage, showGlobalSuccessMessage, showGlobalMessage
} from '../actions/applicationActions';

const MainWrapper = ({
  children, snackbarDuration = 10000,
  globalMessage, globalErrorMessage, globalSuccessMessage,
  showGlobalMessage, showGlobalErrorMessage, showGlobalSuccessMessage
}) => {

  function handleMessageClose() {
    showGlobalMessage('');
  }

  function handleSuccessMessageClose() {
    showGlobalErrorMessage('');
  }

  function handleErrorMessageClose() {
    showGlobalSuccessMessage('');
  }

  return (
    <main style={{flexGrow: 1}}>
      {children}
      {/* Information snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={globalMessage !== ''}
        autoHideDuration={snackbarDuration}
        onClose={() => handleMessageClose()}
      >
        <Alert
          variant='filled'
          severity='info'
          onClose={() => handleMessageClose()}
        >
          {globalMessage}
        </Alert>
      </Snackbar>

      {/* Success snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={globalSuccessMessage !== ''}
        autoHideDuration={snackbarDuration}
        onClose={() => handleSuccessMessageClose()}
      >
        <Alert
          variant='filled'
          severity='success'
          onClose={() => handleSuccessMessageClose()}
        >
          {globalSuccessMessage}
        </Alert>
      </Snackbar>

      {/* Error snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={globalErrorMessage !== ''}
        autoHideDuration={snackbarDuration}
        onClose={() => handleErrorMessageClose()}
      >
        <Alert
          variant='filled'
          severity='error'
          onClose={() => handleErrorMessageClose()}
        >
          {globalErrorMessage}
        </Alert>
      </Snackbar>

    </main>
  );
}

const mapStateToProps = state => ({
  themeMode: state.app.themeMode,
  globalMessage: state.app.globalMessage,
  globalErrorMessage: state.app.globalErrorMessage,
  globalSuccessMessage: state.app.globalSuccessMessage
});

export default connect(mapStateToProps, {
  showGlobalErrorMessage, showGlobalSuccessMessage, showGlobalMessage
})(MainWrapper);