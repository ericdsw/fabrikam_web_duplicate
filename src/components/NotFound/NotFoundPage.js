import React from 'react';
import { connect } from 'react-redux';
import CenterLayoutPage from '../BasePages/CenterLayoutPage';
import {
  Typography, Button, Grid
} from '@material-ui/core'
import { push } from 'connected-react-router';

export const NotFoundPage = props => {

  function goToHomeScreen() {
    props.push("/");
  }

  return (
    <CenterLayoutPage>
      <Grid container alignItems='center' justify='center'>
        <Grid item xs={12}>
          <Typography align='center' variant='h1'>404</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align='center' variant='h3'>La página no existe</Typography>
        </Grid>
        <Grid item xs={12}>
          <br /><br />
          <Grid container alignItems='center' justify='center'>
            <Button variant='contained' color='primary' onClick={e => goToHomeScreen()}>
              Volver a la página principal
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </CenterLayoutPage>
  );
}

export default connect(null, { push })(NotFoundPage);