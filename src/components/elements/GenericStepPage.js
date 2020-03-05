import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

const styles = theme => ({
  buttonContainer: {
    marginTop: theme.spacing(2)
  }
})

const GenericStepPage = ({
  children, activeStep, handleNext, handleBack, shouldBlockNext = false,
  nextButtonText = 'Siguiente'
}) => {

  const classes = makeStyles(styles)();

  return (
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <Grid
          className={classes.buttonContainer}
          container alignItems='center'
          justify='center'
        >
          <Button
            variant='contained'
            disabled={activeStep === 0}
            onClick={e => handleBack()}
          >
            Atrás
          </Button>
          &nbsp;&nbsp;
          <Button
            variant='contained'
            color='primary'
            disabled={shouldBlockNext}
            onClick={e => handleNext()}
          >
            {nextButtonText}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GenericStepPage;