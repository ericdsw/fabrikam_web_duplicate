import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GenericStepPage from '../../elements/GenericStepPage';
import MaterialTable from 'material-table';
import moment from 'moment';
import {
  Typography, Grid
} from '@material-ui/core';

const styles = theme => ({
  summaryContainer: {
    margin: theme.spacing(6),
  },
  summaryTitle: {
    fontWeight: 'bold',
    color: "#293A80"
  }
});

const TransferReport = props => {

  const classes = makeStyles(styles)();

  const { sourceBranch, destinationBranch, selectedItems } = props;

  return (
    <GenericStepPage {...props}>
      <div style={{width: '100%'}}>
        <div className={classes.summaryContainer}>
          <Typography gutterBottom className={classes.summaryTitle} variant='h4'>
            Traslado de Artículos
          </Typography>
          {sourceBranch && destinationBranch &&
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <b>Desde:</b> {sourceBranch.name}
              </Grid>
              <Grid item xs={6}>
                <b>Fecha y Hora:</b> {moment().format("MMMM Do YYYY, h:mm:ss a")}
              </Grid>
              <Grid item xs={6}>
                <b>Hacia:</b> {destinationBranch.name}
              </Grid>
            </Grid>
          }
        </div>

        <div className={classes.materialTableWrapper}>
          <MaterialTable
            title='Artículos a añadir'
            columns={[
              { 'title': 'Nombre', field: 'nombre' },
              { 'title': 'Descripción', field: 'description'},
              { 'title': 'Tipo', field: 'type'},
              { 'title': 'Cantidad', field: 'amount'}
            ]}
            data={Object.keys(selectedItems).map(selectedItemId => {
              const { articleData, amount } = selectedItems[selectedItemId];
              return {
                nombre: articleData.xArticulo,
                description: articleData.xDescArticulo,
                type: articleData.xTipoArticulo,
                amount: amount
              }
            })}
            options={{
              search: false
            }}
          />
        </div>

      </div>
    </GenericStepPage>
  )
}

export default TransferReport;