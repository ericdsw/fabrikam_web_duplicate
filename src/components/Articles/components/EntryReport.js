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

const EntryReport = props => {

  const classes = makeStyles(styles)();

  const { selectedProvider, selectedBranchOffice, selectedItems } = props;

  return (
    <GenericStepPage {...props}>
      <div style={{width: '100%'}}>
        <div className={classes.summaryContainer}>
          <Typography gutterBottom className={classes.summaryTitle} variant='h4'>
            Hoja de entrada de artículos
          </Typography>
          {selectedProvider && selectedBranchOffice &&
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <b>Nombre del proveedor:</b> {selectedProvider.nombre}
              </Grid>
              <Grid item xs={6}>
                <b>Bodega Sucursal:</b> {selectedBranchOffice.name}
              </Grid>
              <Grid item xs={6}>
                <b>Teléfono:</b> {selectedProvider.telefono}
              </Grid>
              <Grid item xs={6}>
                <b>Encargado de sucursal:</b> John Appleseed
              </Grid>
              <Grid item xs={6}>
                <b>Email:</b> {selectedProvider.correo}
              </Grid>
              <Grid item xs={6}>
                <b>Fecha y Hora:</b> {moment().format("MMMM Do YYYY, h:mm:ss a")}
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
              { 'title': 'Precio', field: 'price' },
              { 'title': 'Cantidad', field: 'amount'}
            ]}
            data={Object.keys(selectedItems).map(selectedItemId => {
              const { articleData, amount } = selectedItems[selectedItemId];
              return {
                nombre: articleData.nombre,
                description: articleData.descArticulo,
                price: articleData.precioVenta,
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

export default EntryReport;