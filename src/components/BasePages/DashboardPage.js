import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ApplicationBar from '../elements/ApplicationBar';
import NavigationDrawer from '../elements/NavigationDrawer';

import { drawerWidth } from '../../constants';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    }
  }
});

const DashboardPage = ({children}) => {

  const classes = makeStyles(styles)();
  const [drawerOpen, toggleDrawerOpen] = useState(false);

  return (
    <React.Fragment>
      <ApplicationBar
        handleToggle={() => toggleDrawerOpen(!drawerOpen)}
      />
      <NavigationDrawer
        isOpen={drawerOpen}
        handleToggle={openState => toggleDrawerOpen(openState)}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </React.Fragment>
  )
}

export default DashboardPage;