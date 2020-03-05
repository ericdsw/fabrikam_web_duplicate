import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Divider,
  Menu,
  MenuItem,
  Button,
  Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { Redirect } from 'react-router-dom';
import { drawerWidth } from '../../constants';
import { logout, changePassword } from '../../actions/authActions';
import { showGlobalMessage } from '../../actions/applicationActions';
import { session } from '../../network';

import useDialogueManager from '../../hooks/useDialogueManager';
import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';

import { push } from 'connected-react-router';

const styles = theme => ({
  appBar: {
    backgroundColor: 'white',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    color: "#555",
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  buttons: {
    color: theme.palette.primary.contrastText
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  }
});

const resetPasswordSchema = {
  parameters: {
    oldPassword: {
      label: 'Contraseña actual',
      type: 'password',
      required: true,
    },
    newPassword: {
      label: 'Nueva Contraseña',
      type: 'password',
      required: true
    },
    newPasswordRepeat: {
      label: 'Repetir Nueva Contraseña',
      type: 'password',
      required: true,
      rules: {
        match: 'newPassword'
      }
    }
  },
  additionalText: 'Deberá identificarse nuevamente al cambiar su contraseña'
}

const ApplicationBar = props => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogues, toggleDialogues] = useDialogueManager('updatePassword')

  const open = Boolean(anchorEl);

  function handleProfileMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleProfileMenuClose() {
    setAnchorEl(null);
  }

  function handleLogoutClick() {
    setAnchorEl(null);
    props.logout();
  }

  const classes = makeStyles(styles)();

  if (session.isLoggedIn()) {
    const { nombre, apellido } = session.getUserData();
    return (
      <AppBar
        position='fixed' color='primary' className={classes.appBar}
      >
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <IconButton
                color='inherit'
                aria-label='Open Drawer'
                onClick={() => props.handleToggle()}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Grid container alignItems='center' justify='flex-end'>
                <Hidden xsDown>
                <Button
                  color='primary'
                  onClick={() => props.push("/enterArticle")}
                >
                  Entradas
                </Button>
                <Divider
                  className={classes.divider}
                  orientation='vertical' flexItem />
                <Button color='primary' onClick={() => props.push("/transferArticles")}>Traslados</Button>
                <Divider
                  className={classes.divider}
                  orientation='vertical' flexItem />
                <Button
                  color='primary'
                  onClick={() => props.push("/exitArticles")}
                >
                  Salidas
                </Button>
                <Divider
                  className={classes.divider}
                  orientation='vertical' flexItem />

                </Hidden>
                <IconButton>
                  <NotificationsIcon color='primary' />
                </IconButton>
                <Divider
                  className={classes.divider}
                  orientation='vertical' flexItem />
                <AccountCircleIcon color='primary' />
                &nbsp;
                <Typography color='primary' variant='body1'>
                  {nombre} {apellido}
                </Typography>
                <IconButton
                  aria-label='user account'
                  aria-controls='menu-appbar-profile'
                  aria-haspopup='true'
                  onClick={e => handleProfileMenuClick(e)}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
                <Menu
                  id='menu-appbar-profile'
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={e => handleProfileMenuClose()}
                >
                  <Hidden smUp>
                    <MenuItem onClick={e => props.push("/enterArticle")}>
                      Ingreso de Artículo
                    </MenuItem>
                    <MenuItem onClick={e => props.push("/transferArticles")}>
                      Traslado de Artículos
                    </MenuItem>
                    <MenuItem onClick={e => props.push("/exitArticles")}>
                      Salida de Artículos
                    </MenuItem>
                    <Divider />
                  </Hidden>
                  <MenuItem onClick={e => handleLogoutClick()}>Logout</MenuItem>
                  <MenuItem onClick={() => {
                    setAnchorEl(null);
                    toggleDialogues('updatePassword', 'show')
                  }}>Cambiar contraseña</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>

        <GenericDialogue
          open={dialogues['updatePassword']}
          title='Cambiar Contraseña'
          maxWidth='sm'
          onClose={() => toggleDialogues('updatePassword', 'hide')}
        >
          <GenericForm
            schema={resetPasswordSchema}
            handleSubmit={data => {
              const { oldPassword, newPassword } = data;
              props.changePassword(oldPassword, newPassword);
            }}
            buttonText='Cambiar Contraseña'
            cancelButton={true}
            handleCancelButtonClick={() => toggleDialogues('updatePassword', 'hide')}
            loading={props.changingPassword}
          />
        </GenericDialogue>

      </AppBar>
    );
  } else {
    props.showGlobalMessage("La sesión expiró, por favor identifiquese nuevamente")
    return <Redirect to={{ pathname: '/login', state: { from: props.location}}} />
  }

}
const mapStateToProps = state => ({
  changingPassword: state.auth.changingPassword
});
export default connect(mapStateToProps, {
  logout, changePassword, showGlobalMessage, push
})(ApplicationBar);