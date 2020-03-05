import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Grid, Typography, TextField, Button, Checkbox, FormControlLabel,
  InputAdornment, IconButton, CircularProgress, Hidden
} from '@material-ui/core';
import { grey, green } from '@material-ui/core/colors';
import MailIcon from '@material-ui/icons/Mail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { forgotPassword } from "../../actions/authActions";

import BaseAuthenticationPage from '../BasePages/BaseAuthenticationPage';

import {
  login, clearInputError
} from '../../actions/authActions';

const styles = theme => ({
  buttonWrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  titleText: {
    fontweight: 'bold',
    color: "#5c5c5c",
    marginbottom: theme.spacing(4)
  },
  submitButton: {
    background: "#bd2429",
    padding: theme.spacing(2),
    width: '100%',
    borderradius: 25,
    color: 'white',
    margintop: theme.spacing(2),
    borderRadius: 30,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  formContainer: {
    maxWidth: 250,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    }
  },
  auxText: {
    color: grey[500]
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -15
  },
});

const ForgottenPassword = props => {

  const classes = makeStyles(styles)();

  const [loginData, updateLoginData] = useState({
    email: '',
    password: ''
  });

  let initialErrorData = {}
  Object.keys(props.inputErrors).forEach(errorKey => {
    const input = errorKey.toLowerCase();
    const value = props.inputErrors[errorKey][0];
    initialErrorData[input] = value;
  });

  const [errors, updateErrors] = useState({});

  const [passwordVisible, togglePasswordVisible] = useState(false);
  const [rememberMe, toggleRememberMe] = useState(false)

  function handleChange(paramName, value) {

    props.clearInputError(paramName);

    const newData = {...loginData};
    newData[paramName] = value;
    updateLoginData(newData);

    const newErrors = {...errors};
    delete newErrors[paramName];
    updateErrors(newErrors);
  }

  function handleSubmit(event) {

    event.preventDefault();
    
    props.forgotPassword({Email: loginData.email});
     
  }

  const realErrors = Object.assign(errors, initialErrorData);

  return (
    <BaseAuthenticationPage>
      <div className={classes.formContainer}>
        <Typography
          variant='h4'
          className={classes.titleText}
          gutterBottom
        >
          Ingresa tu correo 
        </Typography>
        <br />
        <form onSubmit={e => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id='email'
                label='Correo electrónico'
                onChange={e => handleChange('email', e.target.value)}
                value={loginData.email}
                fullWidth
                error={Boolean(realErrors['email'])}
                helperText={realErrors['email']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailIcon style={{ color: "#00508b" }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
        
            <Grid item xs={12}>
              <Grid container alignItems='center'>
                <div className={classes.buttonWrapper}>
                  <Button
                    variant='contained'
                    className={classes.submitButton}
                    type='submit'
                    fullWidth
                    disabled={props.loading}
                  >
                    Recuperar Contraseña
                  </Button>
                  {props.loading &&
                    <CircularProgress size={30} className={classes.buttonProgress} />
                  }
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems='center'>
             
               
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </BaseAuthenticationPage>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errorMessage: state.auth.errorMessage,
  inputErrors: state.auth.inputErrors
});

export default connect(mapStateToProps, {
  login, clearInputError, forgotPassword
})(ForgottenPassword)