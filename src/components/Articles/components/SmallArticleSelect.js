import React from 'react';
import GenericStepPage from '../../elements/GenericStepPage';
import MaterialTable from 'material-table';
import {
  Checkbox, TextField
} from '@material-ui/core';

const SmallArticleSelect = props => {

  const { selectedItems, articleList, handleCheckbox, handleAmountChange } = props;

  return (
    <GenericStepPage {...props}>
      <MaterialTable
        title=''
        columns={[
          { title: '', render: rowData => {
            return (
              <Checkbox
                checked={rowData.data.idArticulo in selectedItems}
                onChange={event => handleCheckbox(rowData.data, event.target.checked)}
              />
            )
          }},
          { title: 'Nombre', field: 'nombre' },
          { title: 'Descripción', field: 'descripcion' },
          { title: 'Tipo de Artículo', field: 'type'},
          { title: 'Inventario', field: 'inventory'},
          { title: 'Cantidad a Transferir', field: 'cantidad', render: rowData => {
            return (
              <TextField
                type='number'
                variant='outlined'
                style={{width: 90}}
                margin='dense'
                disabled={!rowData.data.idArticulo in selectedItems}
                value={
                  (rowData.data.idArticulo in selectedItems) ? selectedItems[rowData.data.idArticulo].amount : 0
                }
                onChange={e => {
                  handleAmountChange(rowData.data, e.target.value);
                }}
              />
            )
          }}
        ]}
        data={articleList.map(article => (
          {
            nombre: article.xArticulo,
            descripcion: article.xDescArticulo,
            type: article.xTipoArticulo,
            inventory: article.nCantidad,
            cantidad: article.idArticulo,
            data: article
          }
        ))}
        options={{
          searchFieldAlignment: 'left',
        }}
      />
    </GenericStepPage>
  );

}

export default SmallArticleSelect;