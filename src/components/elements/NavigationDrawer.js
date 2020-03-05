import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Hidden,
} from '@material-ui/core';
import { drawerWidth } from '../../constants';
import DrawerContent from '../elements/DrawerContent';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex'
  },
  drawerPaper: {
    width: drawerWidth,
    background: `url('/images/SideBarBackground.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  selectedLink: {
    background: theme.palette.action.hover
  }
});

const NavigationDrawer = ({ isOpen, handleToggle }) => {

  const classes = makeStyles(styles)();

  return (
    <nav className={classes.drawerPaper}>
      <Hidden smUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor='left'
          open={isOpen}
          onClose={() => handleToggle(!isOpen)}
          classes={{ paper: classes.drawerPaper }}
        >
          <DrawerContent
            handleCollapse={() => handleToggle(false)}
          />
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='css'>
        <Drawer
          variant='permanent'
          open
          classes={{ paper: classes.drawerPaper }}
        >
          <DrawerContent
            handleCollapse={() => handleToggle(false)}
          />
        </Drawer>
      </Hidden>

    </nav>
  );

}

export default NavigationDrawer;