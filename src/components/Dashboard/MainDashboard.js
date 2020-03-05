import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Grid, Card, CardContent, Typography, Icon
} from '@material-ui/core';
import DashboardPage from '../BasePages/DashboardPage';

import { getBranchOffices } from '../../actions/branchOfficeActions';
import { getProviders } from '../../actions/providerActions';
import { getArticles } from '../../actions/articlesActions';
import { getUsers } from '../../actions/userActions';

import { red, green, blue, yellow } from '@material-ui/core/colors';
import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";

const styles = theme => ({
  reportCard: {
    height: 100,
    color: 'white'
  },
});

const MainDashboard = props => {

  const classes = makeStyles(styles)();

  useEffect(() => {
    props.getBranchOffices();
    props.getProviders();
    props.getArticles();
    props.getUsers();
  }, []);

  if (props.branchList.length > 0) {

  }

  return (
    <DashboardPage>
      <Grid container spacing={2}>


        <Grid item xs={12} md={3}>
          <Card className={classes.reportCard} style={{background: red[500]}}>
            <CardContent>
              <Typography variant='h5'>
                <Grid container alignItems='center'>
                  <Grid item xs={3}>
                    <Grid container alignItems='center' justify='center'>
                      <Icon style={{fontSize: 48}}>business</Icon>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    {props.branchList.length} Sucursales Registradas
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className={classes.reportCard} style={{background: blue[500]}}>
            <CardContent>
              <Typography variant='h5'>
                <Grid container alignItems='center'>
                  <Grid item xs={3}>
                    <Grid container alignItems='center' justify='center'>
                      <Icon style={{fontSize: 48}}>burst_mode</Icon>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    {props.articleList.length} Articulos Registrados
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className={classes.reportCard} style={{background: green[500]}}>
            <CardContent>
              <Typography variant='h5'>
                <Grid container alignItems='center'>
                  <Grid item xs={3}>
                    <Grid container alignItems='center' justify='center'>
                      <Icon style={{fontSize: 48}}>account_circle</Icon>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    {props.userList.length} Usuarios en el Sistema
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className={classes.reportCard} style={{background: yellow[800]}}>
            <CardContent>
              <Typography variant='h5'>
                <Grid container alignItems='center'>
                  <Grid item xs={3}>
                    <Grid container alignItems='center' justify='center'>
                      <Icon style={{fontSize: 48}}>contacts</Icon>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    {props.providerList.length} Proveedores Registrados
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} style={{ padding: 32}}>
          <Chart
            data={[
              { argument: 1, value: 10 },
              { argument: 2, value: 20 },
              { argument: 3, value: 30 },
              { argument: 4, value: 5 },
              { argument: 5, value: 40 }
            ]}
          >
            <ArgumentAxis />
            <ValueAxis />
            <LineSeries valueField="value" argumentField="argument" />
          </Chart>
        </Grid>

      </Grid>
    </DashboardPage>
  );
}

const mapStateToProps = state => ({
  branchList: state.branches.branchList,
  articleList: state.articles.articlesList,
  userList: state.user.userList,
  providerList: state.provider.providerList
});

export default connect(mapStateToProps, {
  getBranchOffices, getProviders, getArticles, getUsers
})(MainDashboard);
