import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from './store';
import { SnackbarProvider } from 'notistack';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import MainWrapper from './components/MainWrapper';
import { routes, FallbackRoute } from './router';
import baseTheme from './theme/baseTheme';

const styles = theme => ({
  root: {
    minHeight: '100%',
    display: 'flex'
  },
  content: {
    flexGrow: 1,
  }
})

const App = () => {

  const classes = makeStyles(styles)();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className={classes.root}>
          <MuiThemeProvider theme={baseTheme('light')}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseLine />
              <MainWrapper className={classes.content}>
                <Switch>
                  {routes.map(route => (route))}
                  <FallbackRoute />
                </Switch>
              </MainWrapper>
            </SnackbarProvider>
          </MuiThemeProvider>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

const mapStateToProps = state => ({
  themeMode: state.app.themeMode,
  globalMessage: state.app.globalMessage,
  globalErrorMessage: state.app.globalErrorMessage,
  globalSuccessMessage: state.app.globalSuccessMessage
});

export default App;
