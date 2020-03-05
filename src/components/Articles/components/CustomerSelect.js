import React from 'react';
import GenericStepPage from '../../elements/GenericStepPage';
import MaterialTable from 'material-table';
import {
  TextField, Menu, Grid, Typography, MenuItem
} from '@material-ui/core';

const CustomerSelect = props => {

  const {
    selectionTitle, customerList, selectedCustomer, handleCustomerUpdate
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
              label='Cliente'
              select
              variant='outlined'
              margin='normal'
              fullWidth
              style={{maxWidth: 600}}
              value={selectedCustomer}
              onChange={e => handleCustomerUpdate(e.target.value)}
            >
              {customerList.map(customer => (
                <MenuItem key={customer} value={customer}>
                  {customer}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
    </GenericStepPage>
  )
}

export default CustomerSelect;