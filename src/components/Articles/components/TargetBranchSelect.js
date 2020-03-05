import React from 'react';
import GenericStepPage from '../../elements/GenericStepPage';
import MaterialTable from 'material-table';
import {
  TextField, Menu, Grid, Typography, MenuItem
} from '@material-ui/core';

const TargetBranchSelect = props => {

  const {
    selectionTitle, branchOfficeList, selectedArticles,
    handleUpdateBranch, selectedBranch
  } = props;

  return (
    <GenericStepPage {...props}>
      <Grid container alignItems='center' justify='center' spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom align='center' variant='h6'>
            {selectionTitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems='center' justify='center'>
            <TextField
              label='Sucursal'
              select
              variant='outlined'
              margin='normal'
              fullWidth
              style={{maxWidth: 600}}
              value={selectedBranch ? selectedBranch.id : ''}
              onChange={e => {
                branchOfficeList.forEach(branch => {
                  if (branch.id === e.target.value) {
                    handleUpdateBranch(branch);
                  }
                });
              }}
            >
              {branchOfficeList.map(branchOffice => (
                <MenuItem key={branchOffice.id} value={branchOffice.id}>
                  {branchOffice.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {selectedArticles &&
          <div style={{width: '100%'}}>
            <MaterialTable
              title='Artículos a añadir'
              columns={[
                { 'title': 'Nombre', field: 'nombre' },
                { 'title': 'Descripción', field: 'description'},
                { 'title': 'Precio', field: 'price' },
                { 'title': 'Cantidad', field: 'amount'}
              ]}
              data={Object.keys(selectedArticles).map(selectedItemId => {
                const { articleData, amount } = selectedArticles[selectedItemId];
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
        }
      </Grid>
    </GenericStepPage>
  )
}

export default TargetBranchSelect;