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
import { withRouter } from 'react-router';

import BaseAuthenticationPage from '../BasePages/BaseAuthenticationPage';
import {
  resetPassword
} from '../../actions/authActions';

const styles = theme => ({
  buttonWrapper: {
    position: 'relative',
    margin: theme.spacing(1)
  },
  titleText: {
    fontweight: 'bold',
    color: "#5c5c5c",
    marginbottom: theme.spacing(8)
  },
  submitButton: {
    background: "#bd2429",
    padding: theme.spacing(2),
    width: 200,
    borderradius: 25,
    color: 'white',
    margintop: theme.spacing(2),
    borderRadius: 30
  },
  formContainer: {
    maxwidth: 300,
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
    margintop: -12,
    marginleft: -12,
  },
});

const ResetPasswordPage = props => {

  console.log(props.match.params.token);

  const classes = makeStyles(styles)();

  const [errors, updateErrors] = useState({});
  const [formData, updateFormData] = useState({
    newPassword: '',
    newPasswordRepeat: ''
  });

  const [isNewPasswordVisible, toggleNewPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, toggleRepeatPasswordVisible] = useState(false);

  function handleChange(paramName, value) {
    const newData = {...formData};
    newData[paramName] = value;
    updateFormData(newData);

    const newErrors = {...errors};
    delete newErrors[paramName];
    updateErrors(newErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { newPassword, newPasswordRepeat } = formData;

    let newErrors = {};
    if (!newPassword) {
      newErrors['newPassword'] = 'Campo Obligatorio';
    }
    if (!newPasswordRepeat) {
      newErrors['newPasswordRepeat'] = 'Campo Obligatorio';
    } else if (newPassword !== newPasswordRepeat) {
      newErrors['newPasswordRepeat'] = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length <= 0) {
      console.log(formData);
    } else {
      updateErrors(newErrors);
    }

  }

  return (
    <BaseAuthenticationPage>
      <div className={classes.formContainer}>
        <Typography
          variant='h4'
          className={classes.titleText}
          gutterBotttom
        >
          Recupera tu Contraseña
        </Typography>
        <br />
        <form onSubmit={e => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id='newPassword'
                label='Nueva Contraseña'
                onChange={e => handleChange('newPassword', e.target.value)}
                value={formData.newPassword}
                fullWidth
                type={isNewPasswordVisible ? 'text' : 'password'}
                error={typeof errors['newPassword'] !== 'undefined'}
                helperText={errors['newPassword']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <VpnKeyIcon style={{ color: "#00508b" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='password visibility'
                        onClick={() => toggleNewPasswordVisible(!isNewPasswordVisible)}
                        edge='end'
                      >
                        {isNewPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id='newPasswordRepeat'
                label='Confirmar Contraseña'
                onChange={e => handleChange('newPasswordRepeat', e.target.value)}
                value={formData.newPasswordRepeat}
                fullWidth
                type={isRepeatPasswordVisible ? 'text' : 'password'}
                error={typeof errors['newPasswordRepeat'] !== 'undefined'}
                helperText={errors['newPasswordRepeat']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <VpnKeyIcon style={{ color: "#00508b" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='password visibility'
                        onClick={() => toggleRepeatPasswordVisible(!isRepeatPasswordVisible)}
                        edge='end'
                      >
                        {isRepeatPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <div className={classes.buttonWrapper}>
                <Button
                  variant='contained'
                  className={classes.submitButton}
                  type='submit'
                  disabled={props.loading}
                >
                  Guardar
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
                </Button>
              </div>
            </Grid>
          </Grid>

        </form>
      </div>
    </BaseAuthenticationPage>
  );

}

const mapStateToProps = state => ({
  loading: state.auth.resettingPassword,
  error: state.auth.resetPasswordError
});

export default connect(mapStateToProps, {
  resetPassword
})(withRouter(ResetPasswordPage));