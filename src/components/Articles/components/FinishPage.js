import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Button, CircularProgress, Grid, Icon
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing(3)
  },
  checkIcon: {
    color: green[500],
    fontSize: 64
  }
})

const FinishPage = ({
  loadingMessage = '', loading = true, finishMessage = '', buttonMessage,
  handleButtonClick
}) => {

  const classes = makeStyles(styles)();

  return (
    <React.Fragment>
      {loading &&
        <Grid className={classes.wrapper} spacing={3} container>
          <Grid item xs={12}>
            <Grid container justify='center'>
              <CircularProgress />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center'>{loadingMessage}</Typography>
          </Grid>
        </Grid>
      }
      {!loading &&
        <Grid className={classes.wrapper} spacing={3} container>
          <Grid item xs={12}>
            <Typography align='center' variant='h5'>{finishMessage}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify='center'>
              <CheckCircleIcon className={classes.checkIcon} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify='center'>
              <Button
                variant='contained'
                color='primary'
                onClick={e => handleButtonClick()}
              >
                {buttonMessage}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  )
}

export default FinishPage;