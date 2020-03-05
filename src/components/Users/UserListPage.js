import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DashboardPage from '../BasePages/DashboardPage';
import AddIcon from '@material-ui/icons/Add';
import {
  CircularProgress, TableContainer, Table, TableHead, TableBody, TableCell,
  TableRow, IconButton, TableFooter, TablePagination
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useDialogueManager from '../../hooks/useDialogueManager';
import EmptyNotifier from '../elements/EmptyNotifier';
import MaterialTable from 'material-table';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';

import {
  getUsers, toggleUserCreateDialogue, createUser, updateEditingUser,
  updateUser
} from '../../actions/userActions';
import { getBranchOffices } from '../../actions/branchOfficeActions';

import {
  Grid,
  Typography,
  Button,
  TextField,
  Icon
} from '@material-ui/core';

const style = theme => ({
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

let createUserSchema = {
  parameters: {
    nombre: {
      label: 'Nombre',
      type: 'text',
      required: true
    },
    apellido: {
      label: 'Apellido',
      type: 'text',
      required: true
    },
    telefono: {
      label: 'Teléfono',
      type: 'tel',
      rules: {
        'phone': true
      },
      required: true
    },
    correo: {
      label: 'Email',
      type: 'email',
      rules: {
        'email': true
      },
      required: true
    },
    password: {
      label: 'Contraseña',
      type: 'password',
      required: true
    },
    idSucursal: {
      label: 'Sucursal',
      type: 'dropdown',
      elements: {}
    },
    idRole: {
      label: 'Rol',
      type: 'dropdown',
      required: true,
      elements: {
        1: 'Admin',
        2: 'Customer'
      }
    },
    estado: {
      type: "boolean",
      label: "Activo"
    }
  }
};


let editUserSchema = {
  parameters: {
    nombre: {
      label: 'Nombre',
      type: 'text',
      required: true
    },
    apellido: {
      label: 'Apellido',
      type: 'text',
      required: true
    },
    telefono: {
      label: 'Teléfono',
      type: 'phone',
      required: true
    },
    correo: {
      label: 'Email',
      type: 'email',
      required: true
    },
    idSucursal: {
      label: 'Sucursal',
      type: 'dropdown',
      elements: {}
    },
    idRole: {
      label: 'Rol',
      type: 'dropdown',
      required: true,
      elements: {
        1: 'Admin',
        2: 'Customer'
      }
    },
    estado: {
      type: "boolean",
      label: "Activo"
    }
  }
};

const UserListPage = props => {

  const classes = makeStyles(style)();

  useEffect(() => {
    props.getUsers();
    props.getBranchOffices();
  }, []);

  props.branchOffices.forEach(element => {
    createUserSchema['parameters']['idSucursal']['elements'][element.id] = element.name
    editUserSchema['parameters']['idSucursal']['elements'][element.id] = element.name
  });

  // Inject roles in the schema

  function handleEdit(tableOffset) {
    const curUser = props.userList[tableOffset];
    props.updateEditingUser(curUser);
  }

  return (
    <DashboardPage>
      <Grid container alignItems='center' spacing={3}>
        {props.userList.length > 0 &&
          <div className={classes.materialTable} style={{width: '100%'}}>
            <MaterialTable
              title={
                <Grid container alignItems='center'>
                  <AccountCircleIcon />
                  &nbsp;
                  <Typography variant='h5'>
                    Usuarios
                  </Typography>
                </Grid>
              }
              columns={[
                { title: 'Nombre Completo', field: 'fullName' },
                { title: 'Cargo', field: 'role', filtering: false},
                { title: 'Email', field: 'email'},
                { title: 'Telefono', field: 'phone', filtering: false},
                { title: 'Sucursal', field: 'branchOffice', filtering: false},
                { title: 'Estado', field: 'state', filtering: false}
              ]}
              data={
                props.userList.map(user => (
                  {
                    fullName: `${user.nombre} ${user.apellido}`,
                    role: (user.idRoleNavigation) ? user.idRoleNavigation.descRole : '',
                    email: user.correo,
                    phone: user.telefono,
                    branchOffice: (user.idSucursalNavigation) ? user.idSucursalNavigation.nombre : '',
                    state: (user.estado === 1) ? 'Activo': 'Inactivo'
                  }
                ))
              }
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit User',
                  onClick: (event, rowData) => { handleEdit(rowData.tableData.id) }
                },
                {
                  icon: 'add',
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (e, rowData) => {  props.toggleUserCreateDialogue(!props.createDialogueOpen) },
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                searchFieldAlignment: 'right'
              }}
              components={{
                Action: props => {
                  if (props.action.icon === 'add') {
                    return (
                      <Button
                        variant='contained'
                        color='primary'
                        style={{marginLeft: 32, marginRight: 10}}
                        onClick={e => props.action.onClick(e, props.data)}
                      >
                        Crear
                      </Button>
                    )
                  } else {
                    return (
                      <IconButton
                        onClick={e => props.action.onClick(e, props.data)}
                      >
                        {props.action.icon === 'edit' ? <EditIcon /> : <DeleteIcon />}
                      </IconButton>
                    )
                  }
                }
              }}
            />
          </div>
        }

        {props.userListRequesting &&
        <Grid container alignItems='center' justify='center'>
          <CircularProgress style={{marginTop: 10}}/>
        </Grid>
        }

        <Grid item xs={12}>
          <EmptyNotifier
            list={props.userList}
            message='No se encontraron usuarios'
            forceHide={props.userListRequesting}
          />
        </Grid>
      </Grid>

      <GenericDialogue
        open={props.createDialogueOpen}
        title='Crear Usuario'
        onClose={e => props.toggleUserCreateDialogue(!props.createDialogueOpen)}
        maxWidth='sm'
      >
        <GenericForm
          schema={createUserSchema}
          handleSubmit={data => {
            data["estado"] = data["estado"] ? 1 : 0;
            props.createUser(data);
          }}
          buttonText='Crear'
          cancelButton={true}
          handleCancelButtonClick={() => props.toggleUserCreateDialogue(!props.createDialogueOpen)}
        />
      </GenericDialogue>

      {props.editingUser &&
        <GenericDialogue
          open={Boolean(props.editingUser)}
          title='Modificar Usuario'
          onClose={e => props.updateEditingUser(null)}
          maxWidth='sm'
        >
          <GenericForm
            initialDataSet={props.editingUser}
            schema={editUserSchema}
            handleSubmit={data => {
              data["estado"] = data["estado"] ? 1 : 0;
              props.updateUser(props.editingUser.idUsuario, data);
            }}
            buttonText='Editar'
            cancelButton={true}
            handleCancelButtonClick={() => props.updateEditingUser(null)}
          />
        </GenericDialogue>

      }

    </DashboardPage>
  );
}

const mapStateToProps = state => ({
  userListRequesting: state.user.userListRequesting,
  userList: state.user.userList,
  userListError: state.user.userListError,
  createDialogueOpen: state.user.createDialogueOpen,
  branchOffices: state.branches.branchList,
  editingUser: state.user.editingUser
});

export default connect(mapStateToProps, {
  getUsers, getBranchOffices, toggleUserCreateDialogue, createUser, updateEditingUser,
  updateUser
})(UserListPage);