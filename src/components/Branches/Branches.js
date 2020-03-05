import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DashboardPage from '../BasePages/DashboardPage';
import {
  Grid,
  Typography,
  Button,
  CircularProgress, 
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';
import BusinessIcon from '@material-ui/icons/Business';

import {
  getAdminUsers,
  getBranch,
  getBranchOffices,
  createBranchOffice,
  updateBranchOffice,
  toggleBranchCreateDialogue
} from '../../actions/branchOfficeActions';


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

const columns = [
  { title: 'Nombre', field: 'name' },
  { title: 'Dirección', field: 'address' },
  { title: 'Telefono', field: 'phone' },
  { title: 'Estado', field: 'statusLabel' }
];

let branchSchema = {
  parameters: {
    name: {
      label: 'Nombre',
      type: 'text',
      required: true
    },
    address: {
      label: 'Dirección',
      type: 'text',
      required: true
    },
    phone: {
      label: 'Telefono',
      type: 'text',
      required: true
    },
    userInChargeId: {
      label: 'Encargado',
      type: 'dropdown',
      required: true,
      elements: {}
    },
    country: {
      label: 'Pais',
      type: 'text',
      required: true
    },
    state: {
      label: 'Provincia',
      type: 'text',
      required: true
    },
    status: {
      label: 'Activo',
      type: 'boolean'
    }
  }
};

const tableComponents = {
  Action: props => {
    if (props.action.icon === 'add') {
      return (
        <Button
          variant='contained'
          color='primary'
          style={{ marginLeft: 32, marginRight: 10 }}
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
};

const Branches = props => {
  const classes = makeStyles(style)();
  
  const [state, setState] = useState({
    formTitle: 'Crear Sucursal',
    saveButtonText: 'Guardar',
    formMode: 'CREATE',
    formData: {
      id: 0,
      name: '',
      address: '',
      phone: '',
      userInChargeId: null,
      country: '',
      state: '',
      status: true
    }
  });

  useEffect(() => {
    props.getBranchOffices();
    props.getAdminUsers();
  }, []);

  branchSchema = {
    parameters: {
      ...branchSchema.parameters,
      userInChargeId: {
        ...branchSchema.parameters.userInChargeId,
        elements: { ...props.adminUsers }
      }
    }
  };

  async function handleCreate() {

    setState({
      formTitle: 'Crear Sucursal',
      saveButtonText: 'Crear',
      formMode: 'CREATE',
      formData: {
        name: '',
        address: '',
        phone: '',
        userInChargeId: null,
        country: '',
        state: '',
        status: true
      }
    });

    props.toggleBranchCreateDialogue(true);
  }

  function handleEdit(index) {
    const { id,
      name,
      address,
      phone,
      userInChargeId,
      country,
      state,
      status } = props.branchList[index];

    setState({
      formTitle: 'Editar Sucursal',
      saveButtonText: 'Guardar',
      formMode: 'EDIT',
      formData: {
        id,
        name,
        address,
        phone,
        userInChargeId,
        country,
        state,
        status
      }
    });

    props.toggleBranchCreateDialogue(true);

  }

  function handleSubmit(data) {
    if (state.formMode === 'CREATE') {
      props.createBranchOffice(data);
    } else {
      props.updateBranchOffice(data);
    }

    setTimeout(() => {
      props.toggleBranchCreateDialogue(false)
    }, 1000);
  }

  return (
    <DashboardPage>
    <Grid container alignItems='center' spacing={3}>
        {!props.branchListRequesting &&
          <div className={classes.materialTable} style={{ width: '100%' }}>
            <MaterialTable
              className={classes.materialTable}
              title={
                <Grid container alignItems='center'>
                  <BusinessIcon />
                  &nbsp;
                  <Typography variant='h5'>
                    Sucursales
                  </Typography>
                </Grid>
              }
              columns={columns}
              components={tableComponents}
              data={props.branchList}
              actions={[
                {
                  icon: 'add',
                  tooltip: 'Crear',
                  isFreeAction: true,
                  onClick: handleCreate
                },
                {
                  icon: 'edit',
                  tooltip: 'Edit Branch',
                  onClick: (_event, rowData) => { handleEdit(rowData.tableData.id) }
                }
              ]}

              options={{
                actionsColumnIndex: -1,
                searchFieldAlignment: 'right'
              }}
            />
          </div>
        }

        {props.branchListRequesting &&
          <Grid container alignItems='center' justify='center'>
            <CircularProgress style={{ marginTop: 10 }} />
          </Grid>
        }
      </Grid>

      <GenericDialogue
        open={props.createDialogueOpen}
        title={state.formTitle}
        onClose={e => props.toggleBranchCreateDialogue(false)}
        maxWidth='sm'
      >
        <GenericForm
          buttonText={state.saveButtonText}
          schema={branchSchema}
          cancelButton={true}
          loading={state.branchCreating || state.branchUpdating}
          initialDataSet={state.formData}
          handleCancelButtonClick={e => props.toggleBranchCreateDialogue(false)}
          handleSubmit={data => handleSubmit({ id: state.formData.id, ...data })}
        />
      </GenericDialogue>

    </DashboardPage>
  );
}

const mapStateToProps = state => ({
  adminUsersRequesting: state.branches.adminUsersRequesting,
  adminUsers: state.branches.adminUsers,
  adminUsersError: state.branches.adminUsersError,
  branchItemRequesting: state.branches.branchItemRequesting,
  branchItem: state.branches.branchItem,
  branchItemError: state.branches.branchItemError,
  branchListRequesting: state.branches.branchListRequesting,
  branchList: state.branches.branchList,
  branchListError: state.branches.branchListError,
  createDialogueOpen: state.branches.createDialogueOpen,
  branchCreating: state.branches.branchCreating,
  branchCreateError: state.branches.branchCreateError,
  branchCreateInputError: state.branches.branchCreateInputError,
  branchUpdating: state.branches.branchUpdating,
  branchUpdatingError: state.branches.branchUpdatingError,
  branchUpdateInputError: state.branches.branchUpdateInputError
});

export default connect(mapStateToProps,
  {
    getAdminUsers,
    getBranch,
    getBranchOffices,
    createBranchOffice,
    updateBranchOffice,
    toggleBranchCreateDialogue
  })(Branches);