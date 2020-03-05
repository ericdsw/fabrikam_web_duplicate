import React from 'react';
import GenericStepPage from '../../elements/GenericStepPage';
import MaterialTable from 'material-table';
import {
  Checkbox, Typography
} from '@material-ui/core';

const ProviderSelectPage = props => {

  const {
    providerList, selectedProvider, handleSelectedProviderChange
  } = props;

  return (
    <GenericStepPage {...props}>
      <Typography align='center' variant='h6' gutterBottom style={{marginBottom: 24}}>
        Seleccione a un proveedor
      </Typography>
      <div style={{width: '100%'}}>
        <MaterialTable
          title=''
          columns={[
            { title: '', render: rowData => {
              return (
                <Checkbox
                  checked={selectedProvider && rowData.data.idProveedor === selectedProvider.idProveedor}
                  onChange={e => handleSelectedProviderChange(rowData.data)}
                />
              );
            }},
            { title: 'Nombre', field: 'nombre' },
            { title: 'Identificación', field: 'identificacion' },
            { title: 'Teléfono', field: 'telefono' },
            { title: 'Correo', field: 'correo' },
            { title: 'Dirección', field: 'direccion' }
          ]}
          data={providerList.map(provider => (
            {
              nombre: provider.nombre,
              identificacion: provider.identificacion,
              telefono: provider.telefono,
              correo: provider.correo,
              direccion: provider.direccion,
              data: provider
            }
          ))}
          options={{
            searchFieldAlignment: 'left',
          }}
        />
      </div>
    </GenericStepPage>
  );
}

export default ProviderSelectPage;