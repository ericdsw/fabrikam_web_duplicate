import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  List, ListItem, Grid, ListItemIcon, ListItemText, Icon, Collapse
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { isWithinInterval } from 'date-fns';
import { withTheme } from '@material-ui/styles';

const styles = theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    borderBottom: '1px solid white'
  },
  link: {
    color: 'white',
  },
  nestedLink: {
    color: 'white',
    paddingLeft: theme.spacing(5)
  },
  activeNestedLink: {
    color: 'white',
    paddingLeft: theme.spacing(5),
    '& div': {
      background: '#BD2429',
      borderRadius: 5
    }
  },
  selectedLink: {
    '& div': {
      background: '#BD2429',
      borderRadius: 5
    }
  },
  logo: {

  },
  linkIcon: {
    color: "white",
    margin: theme.spacing(1)
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

const possibleRouteLinks = {
  "dashboard": {
    path: '/',
    exact: true,
    icon: 'home',
    text: 'Dashboard'
  },
  "reports": {
    icon: 'equalizer',
    text: 'Reportes',
    subRoutes: [
      {
        path: '/articleMovements',
        exact: true,
        icon: '',
        text: 'Movimiento de Articulos'
      },
      {
        path: '/articlesPerBranch',
        exact: true,
        icon: 'GridOn',
        text: 'Existencia Por Sucursal'
      },
      {
        path: '/inventoryReport',
        exact: true,
        icon: '',
        text: 'Reporte de Inventario'
      },
      {
        path: '/stockEvolution',
        exact: true,
        icon: '',
        text: 'Evolucion del Stock'
      }
    ]
  },
  "articles": {
    path: '/articles',
    exact: true,
    icon: 'burst_mode',
    text: 'Articulos'
  },
  "branchOffices": {
    path: '/branchOffices',
    exact: true,
    icon: 'business',
    text: 'Sucursales'
  },
  "providers": {
    path: '/providers',
    exact: true,
    icon: 'contacts',
    text: 'Proveedores'
  },
  "users": {
    path: '/users',
    exact: true,
    icon: 'account_circle',
    text: 'Usuarios',
  },
  "roles": {
    path: '/roles',
    exact: true,
    icon: 'vpn_key',
    text: 'Roles',
  }
}

const DrawerContent = ({handleCollapse}) => {

  const [collapsed, toggleCollapsed] = useState(true);

  const classes = makeStyles(styles)();

  let routes = [];
  const userData = localStorage.getItem('user');
  if (userData) {
    const userInfo = JSON.parse(userData);
    const { menu } = userInfo;

    if (menu) {
      menu.forEach( m => {
        routes.push(possibleRouteLinks[m.descMenu])
      });
    }
  }

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <Grid style={{ height: '100%' }} container alignItems='center' justify='center'>
          <img
            className={classes.logo}
            width='150'
            src='/images/LogoFabrikamBlanco.png'
          />
        </Grid>
      </div>
      <List>
        {routes.map(route => {
          if (route.subRoutes) {
            return (
              <React.Fragment>
                <ListItem button onClick={() => toggleCollapsed(!collapsed)}>
                  <Grid container alignItems='center'>
                    <Icon style={{color: 'white'}} className={classes.linkIcon}>{route.icon}</Icon>
                    <span style={{ color: 'white' }}>{route.text}</span>
                  </Grid>
                </ListItem>
                <Collapse in={!collapsed} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {route.subRoutes.map(subRoute => (
                      <ListItem
                        button
                        component={NavLink}
                        to={subRoute.path}
                        key={subRoute.path}
                        exact={subRoute.exact}
                        onClick={() => handleCollapse()}
                        className={classes.nestedLink}
                        activeClassName={classes.activeNestedLink}
                      >
                        <Grid container alignItems='center' style={{ padding: 3 }}>
                          {subRoute.text}
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return (
              <ListItem
                button
                component={NavLink}
                to={route.path}
                key={route.path}
                exact={route.exact}
                onClick={() => handleCollapse()}
                className={classes.link}
                activeClassName={classes.selectedLink}
              >
                <Grid container alignItems='center'>
                  <Icon style={{color: 'white'}} className={classes.linkIcon}>{route.icon}</Icon>
                  {route.text}
                </Grid>
              </ListItem>
            )
          }
        })}
      </List>
    </React.Fragment>
  )
}

export default DrawerContent;