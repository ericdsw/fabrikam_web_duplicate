import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import DashboardPage from "../BasePages/DashboardPage";
import { fade, makeStyles } from "@material-ui/core/styles";
import EmptyNotifier from "../elements/EmptyNotifier";
import MaterialTable from "material-table";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  TableFooter,
  TablePagination
} from "@material-ui/core";

import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';

import {updateRolesModel} from './RolesUpdateModel'; 
import {createRolesModel} from './RolesModel';

import { getRoles, addRoles, searchRoles, updateRoles, searchRolesDestroyDlg,getPermision } from "../../actions/rolesActions";

import useDialogueManager from '../../hooks/useDialogueManager';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const Roles = props => {

  useEffect(() => {
   
    props.getRoles();
    props.getPermision();

  }, []);

  const useStyles = makeStyles(theme => ({
    table: {
      border: '1px solid #ccc',
    borderRadius: 8
    },
    materialTable: {
      margin: theme.spacing(2),
      width: '100%'
    },
     
  }));

 

  function RolesDestroyDlg(){
    props.searchRolesDestroyDlg();
  }

  function addRoles(data) {
    props.addRoles(data);
  }
  
  function updateRoles(data) {
    props.updateRoles(data);
  }

  function searchRoles(data) {
    props.searchRoles(data); 
    buildSchemabyPermisionUpdate();
    toggleDialogues('updateRoles', 'show');
  }

  function buildSchemabyPermisionCreate() {
    var u = props.permisionList;
    var {parameters} = createRolesModel;
    u.forEach(function(value) {
       var tmp = objectFactory(value.descMenu, value);
       Object.assign(parameters,tmp);
       console.log(tmp);
    });  
  }

  function buildSchemabyPermisionUpdate() {
    var u = props.permisionList;
    var {parameters} = updateRolesModel;
    u.forEach(function(value) {
       var tmp = objectFactory(value.descMenu, value);
       Object.assign(parameters,tmp);
       console.log(tmp);
    });  
  }

  function objectFactory(prop: Text, val = {}  ) {
    return {
        [prop]: {
            label: val.nombreMenu,
            type: 'boolean'
            
        }
    };
}

  const [dialogues, toggleDialogues] = useDialogueManager('createRoles');



  function handleEdit(tableOffset) {
    const curRoles = props.rolesList[tableOffset]; 
    searchRoles(curRoles['idRole']);
  }
  const classes = makeStyles();


  return (<DashboardPage>
  
    <Grid container alignItems='center' spacing={0}>
    {props.rolesList.length > 0 &&
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
        <VpnKeyIcon style={{ fontSize: "large" }}></VpnKeyIcon>
        Administración / Roles
      </Typography>
        </Grid>
      }
      columns={[
        { title: 'Rol', field: 'descRole' },
        { title: 'Estado', field: 'estado'}
       
      ]}
      data={
        props.rolesList.map(row => (
          {
            descRole: row.descRole,
            estado: (row.estado === 1) ? 'Activo': 'Inactivo'
          }
        ))
      }
      actions={[
      
        {
          icon: 'edit',
          tooltip: 'Editar proveedor',
       
          onClick: (e, rowData) => { handleEdit(rowData.tableData.id) },
        },
       {
          icon: 'add',
          tooltip: 'Crear proveedor',
          isFreeAction: true,
          onClick: (e, rowData) => { toggleDialogues('createRoles', 'show');
          buildSchemabyPermisionCreate();
         },
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        searchFieldAlignment: 'right'
      }}
      components={{
        Action: props => {
          
         if (props.action.icon=== 'add') {
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
            
                {props.action.icon === "edit" ? (
                  <EditIcon onClick={e => props.action.onClick(e, props.data)} />
                ) : (
                  <div></div>
                )}
              </IconButton>
            );
          }

        }
      }}
    />
      </div>
    }

    <Grid item xs={12}>
      <EmptyNotifier
        list={props.rolesList}
        message='No se encontraron roles'
        forceHide={props.rolesList}
      />
    </Grid>
  </Grid>
    
    <GenericDialogue
    open={dialogues['createRoles']}
    title='Crear Rol'
    onClose={e => toggleDialogues('createRoles', 'hide')}
    maxWidth='sm'
    >
    <GenericForm 
        schema={createRolesModel}
        buttonText='Guardar'
        cancelButton= 'true'
        handleCancelButtonClick={ e => toggleDialogues('createRoles', 'hide')}
        handleSubmit={data=> addRoles(data) }
    />
    </GenericDialogue>


    <GenericDialogue
    open={Object.keys(props.roleSearched).length > 0}
    title='Actualizar Roles'
    onClose={e => toggleDialogues('updateRoles', 'hide')}
    maxWidth='sm'
    >
    <GenericForm 
        schema={updateRolesModel}
        initialDataSet={props.roleSearched}
        buttonText='Guardar'
        cancelButton= 'true'
        handleCancelButtonClick={ e => RolesDestroyDlg()}
        handleSubmit={data=> {
        const estado = {...data}
        estado["estado"]= (estado["estado"]===true)?1:0;
        updateRoles(estado) 
        }}
    />
    </GenericDialogue>
  
  </DashboardPage>
  
  );
};

const mapStateToProps = state => ({
  rolesList: state.roles.rolesList,
  isLoading: state.roles.requestingRolesList,
  errorMessage: state.roles.requestRolesError,
  roleSearched: state.roles.roleSearched,
  permisionList: state.roles.permisionList
});

export default connect(mapStateToProps, {
  getRoles, addRoles, searchRoles, updateRoles,searchRolesDestroyDlg, getPermision
})(Roles);
  