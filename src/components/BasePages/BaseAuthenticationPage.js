import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core';

const styles = theme => ({
  leftSection: {
    background: `url('images/LoginBackground.png')`,
    backgroundSize: 'cover'
  },
  leftSectionLogo: {
    marginLeft: theme.spacing(2),
    marginTop: 200,
  },
});

const BaseAuthenticationPage = ({children}) => {

  const classes = makeStyles(styles)();

  return (
    <Grid
      container
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={8}>
        <Grid
          container
          style={{minHeight: '100vh'}}
          alignItems='center'
          justify='center'
        >
          {children}
        </Grid>
      </Grid>

      <Hidden xsDown>
        <Grid item xs={12} md={4} className={classes.leftSection}>
          <img
            className={classes.leftSectionLogo}
            width='300' src='images/LogoFabrikamBlanco.png'
          />
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default BaseAuthenticationPage;