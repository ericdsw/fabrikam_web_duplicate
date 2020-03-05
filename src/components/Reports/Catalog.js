import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DashboardPage from '../BasePages/DashboardPage';
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';
import MaterialTable from 'material-table';
import GridOnIcon from '@material-ui/icons/GridOn';
import {
  getBranchOffices
} from '../../actions/branchOfficeActions';
import {
  getCatalogByBranch
} from '../../actions/reportActions';

const style = theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {

  },
  materialTable: {
    margin: theme.spacing(2),
    width: '100%'
  },
  emptyText: {
    marginTop: theme.spacing(2),
    fontStyle: 'italics'
  },
  table: {
    border: '1px solid #ccc',
    borderRadius: 8
  },
  tableHead: {
    fontWeight: 'bold',
    color: "#293A80",
    textAlign: 'center'
  }
});

const columns = [
  { title: 'Sucursal', field: 'xSucursal' },
  { title: 'Artículo', field: 'xArticulo' },
  { title: 'Descripción', field: 'xDescArticulo' },
  { title: 'Tipo', field: 'xTipoArticulo' },
  { title: 'Estado', field: 'estado' },
  { title: 'Cantidad', field: 'nCantidad' }
];

const Catalog = props => {
  const classes = makeStyles(style)();

  const [currentBranch, setCurrentBranch] = useState();

  useEffect(() => {
    props.getBranchOffices();
  }, []);


  useEffect(() => {
    props.getBranchOffices();
    const fetchCatalog = async () => {
      if (currentBranch) {
        await props.getCatalogByBranch(currentBranch);
      }
    };

    fetchCatalog()
  }, [currentBranch]);


 setTimeout(() => {
  setCurrentBranch(17);
 }, 3000);

  return (
    <DashboardPage>
    <Grid container alignItems='center' spacing={3}>
          <div className={classes.materialTable} style={{ width: '100%' }}>
            <MaterialTable
              className={classes.materialTable}
              title={
                <Grid container alignItems='center'>
                  <GridOnIcon />
                  &nbsp;
                  <Typography variant='h5'>
                    Catálogo por Sucursal
                  </Typography>

                  <FormControl className={classes.formControl}>
                    <InputLabel>{ currentBranch ? '' : 'Seleccione' }</InputLabel>
                    <Select
                      native
                      inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                      }}
                    >
                      <option value="" />
                      <option value={10}>Branch 1</option>
                      <option value={20}>Branch 2</option>
                      <option value={30}>Branch 3</option>
                    </Select>
                  </FormControl>
                </Grid>
              }
              columns={columns}
              data={props.catalogByBranch}

              options={{
                actionsColumnIndex: -1,
                searchFieldAlignment: 'right',
                exportButton: true,
                exportFileName: 'CatalogoSucursal'
              }}
            />
          </div>
      </Grid>
    </DashboardPage>
  );
}

const mapStateToProps = state => ({
  catalogByBranchRequesting: state.reports.catalogByBranchRequesting,
  catalogByBranchError: state.reports.catalogByBranchError,
  catalogByBranch: state.reports.catalogByBranch
});

export default connect(mapStateToProps,
  {
    getBranchOffices,
    getCatalogByBranch
  })(Catalog);