import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import DashboardPage from "../BasePages/DashboardPage";
import { getProviders, addProvider, searchProvider, updateProvider, searchProviderDestroyDlg } from "../../actions/providerActions";

import { fade, makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit";
import ContactIcon from "@material-ui/icons/Contacts";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SettingsIcon from "@material-ui/icons/Settings";

import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import useDialogueManager from '../../hooks/useDialogueManager';
import {createProviderModel} from './ProviderModel';
import {updateProviderModel} from './ProviderUpdateModel';
import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import MaterialTable from 'material-table';

const Provider = props => {
  
  useEffect(() => {
    props.getProviders();
 
  }, []);

  
  function ProviderDestroyDlg(){
    props.searchProviderDestroyDlg();
  }

  function addProvider(data) {
    props.addProvider(data);
  }
  
  function updateProvider(data) {
    props.updateProvider(data);
  }

  function searchProvider(data) {
    props.searchProvider(data); 
    toggleDialogues('updateProvider', 'show')
  }

  const [dialogues, toggleDialogues] = useDialogueManager('createProvider');
  const [dialoguesUpd, toggleDialoguesUpd] = useDialogueManager('updateProvider');

  const editInitialData = {...props.providerSearched}
  delete editInitialData["cuentaBancaria"]
  
  function handleEdit(tableOffset) {
    const curProvider = props.providerList[tableOffset];
    searchProvider(curProvider['idProveedor']);
  }
  function handleRedirect(tableOffset) {
    const curProvider = props.providerList[tableOffset];
    window.location.href='/providers/'+curProvider['idProveedor']+'/bankAccount';
  }

  const useStyles = makeStyles(theme => ({
    table: {
      minWidth: 650
    },
    materialTable: {
      margin: theme.spacing(2),
      width: '100%'
    },
     
  }));

  const classes = useStyles();

  return (
    <DashboardPage>
     
    <Grid container alignItems='center' spacing={3}>
      <div className={classes.materialTable} style={{width: '100%'}}>
      <MaterialTable
        className={classes.materialTable}
        title={
          <Grid container alignItems='center'>
          <Typography
          gutterBottom
          align="left"
          style={{
            fontWeight: "bold",
            color: "#293A80",
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "23px"
          }}
        >
          <ContactIcon style={{ fontSize: "large" }}></ContactIcon>
          Administración / Proveedores
        </Typography>
          </Grid>
        }
        columns={[
          { title: 'Nombre', field: 'nombre' },
          { title: 'Identificación', field: 'identificacion'},
          { title: 'Email', field: 'correo'},
          { title: 'Teléfono', field: 'telefono'},
          { title: 'Estado', field: 'estado'}
         
        ]}
        data={
          props.providerList.map(row => (
            {
              nombre: row.nombre,
              identificacion:row.identificacion,
              correo:row.correo,
              telefono:row.telefono,
              estado: (row.estado === 1) ? 'Activo': 'Inactivo'
            }
          ))
        }
        actions={[
         {
            icon: 'account_balance',
            tooltip: 'Cuentas bancarias',
            iconProps: 'account',
            onClick: (event, rowData) => { handleRedirect(rowData.tableData.id) }
          },
          {
            icon: 'edit',
            tooltip: 'Editar proveedor',
            iconProps: 'editProv',
            onClick: (e, rowData) => { handleEdit(rowData.tableData.id) },
          },
         {
            icon: 'add',
            iconProps: 'addProv',
            tooltip: 'Crear proveedor',
            isFreeAction: true,
            onClick: (e, rowData) => { toggleDialogues('createProvider', 'show') },
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          searchFieldAlignment: 'right'
        }}
        components={{
          Action: props => {
            
           if (props.action.iconProps === 'addProv') {
              return (
                <Button
                  variant="contained"
                  style={{
                    fontSize: "12px",
                    color: "#FFFFFF",
                    backgroundColor: "#BD2429",
                    borderRadius: "20px",
                    boxShadow: "2px 2px 10px",
                   
                    margin: "1px 5px 1px 1px",
                    textTransform: "none"
                  }}
                  onClick={e => props.action.onClick(e, props.data)}
                >
                  <AddIcon style={{ color: "#FFFFFF", fontSize: "large" }} />
                  Crear
                </Button>
              );
            } else{
              return (
                <IconButton onClick={e => props.action.onClick(e, props.data)}>
                  {props.action.iconProps === "account" ? ( <AccountBalanceIcon onClick={e => props.action.onClick(e, props.data)} /> ) : ( <div></div> )}
                  {props.action.iconProps === "editProv" ? ( <EditIcon onClick={e => props.action.onClick(e, props.data)} /> ) : ( <div></div> )}
                </IconButton>
              );
            }

          

          }
        }}
      />
    </div>
  </Grid>




      <GenericDialogue
      open={dialogues['createProvider']}
      title='Crear Proveedor'
      onClose={e => toggleDialogues('createProvider', 'hide')}
      maxWidth='sm'
    >
      <GenericForm 
        schema={createProviderModel}
        buttonText='Guardar'
        cancelButton= 'true'
        handleCancelButtonClick={ e => toggleDialogues('createProvider', 'hide')}
        handleSubmit={data=> addProvider(data) }
      />
    </GenericDialogue>


    <GenericDialogue
      open={Object.keys(props.providerSearched).length > 0}
      title='Actualizar Proveedor'
      onClose={e => toggleDialoguesUpd('updateProvider', 'hide')}
      maxWidth='sm'
    >
      <GenericForm 
        schema={updateProviderModel}
        initialDataSet={editInitialData}
        buttonText='Guardar'
        cancelButton= 'true'
        handleCancelButtonClick={ e => ProviderDestroyDlg()}
        handleSubmit={data=> {
          const estado = {...data}
          estado["estado"]= (estado["estado"]===true)?1:0;
          updateProvider(estado) 
        }}
      />
    </GenericDialogue>

    </DashboardPage>
  );
};

const mapStateToProps = state => ({
  providerList: state.provider.providerList,
  isLoading: state.provider.requestingProvidersList,
  errorMessage: state.provider.requestProvidersError,
  providerSearched : state.provider.providerSearch
});


export default connect(mapStateToProps, {
  getProviders, addProvider, searchProvider, updateProvider,searchProviderDestroyDlg
})(Provider);
