import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import DashboardPage from "../BasePages/DashboardPage";
import { getBankAccount, getBankAccountByProvider, addBankAccount, searchBankAccount, updateBankAccount, searchBankAccountDestroyDlg, deleteBankAccount } from "../../actions/bankAccountActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import useDialogueManager from '../../hooks/useDialogueManager';
import { bankAccountCreateModel } from './BankAccountCreateModel';
import { bankAccountUpdateModel } from './BankAccountUpdateModel';
import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { withRouter } from "react-router";
import {
    Grid,
    TextField,
    Icon,
    CircularProgress
} from '@material-ui/core';

import MaterialTable from 'material-table';
import EmptyNotifier from '../elements/EmptyNotifier';


const BankAccount = props => {

    useEffect(() => {
        props.getBankAccountByProvider(props.match.params.providerId);
    }, []);

    function getBankAccountByProvider(data) {
        props.getBankAccountByProvider(data);
    }

    function BankAccountDestroyDlg() {
        props.searchBankAccountDestroyDlg();
    }

    function addBankAccount(data) {
        data.idProveedor = props.match.params.providerId;
        props.addBankAccount(data);
    }

    function updateBankAccount(data) {
        props.updateBankAccount(data);
        toggleDialoguesUpd('updateBankAccount', 'hide');
    }

    function searchBankAccount(data) {
        props.searchBankAccount(data);
        toggleDialoguesUpd('updateBankAccount', 'show');
    }


    function deleteBankAccount(idCuentaBancaria, idProveedor) {
        props.deleteBankAccount(idCuentaBancaria, idProveedor);
    }

    const [dialogues, toggleDialogues] = useDialogueManager('createBankAccount');
    const [dialoguesUpd, toggleDialoguesUpd] = useDialogueManager('updateBankAccount');

    const editInitialData = { ...props.bankAccountSearched }
    delete editInitialData["cuentaBancaria"]

    const providerId = 0;

    const useStyles = makeStyles(theme => ({
        materialTable: {
            margin: theme.spacing(2),
            width: '100%'
        },
        table: {
            minWidth: 650
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto"
            }
        },
        searchIcon: {
            width: theme.spacing(10),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            color: "#959595",
            alignItems: "center",
            justifyContent: "center"
        },
        cancelButton: {
            fontSize: "12px",
            color: "#BD2429",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #BD2429",
            with: "108px",
            height: "45px"
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            margin: theme.spacing(1, 44, 1, 1),
            transition: theme.transitions.create('width'),
            border: "1px solid #959595",
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 400,
                '&:focus': {
                    width: 400,
                },
            }
        },
        tableHead: {
            fontWeight: "bold",
            color: "#293A80",
            fontStyle: "normal",
            fontSize: "18px"
        }

    }));

    const classes = useStyles();

    return (
        <DashboardPage>
            <Grid container alignItems='center' spacing={3}>

                <div className={classes.materialTable} style={{ width: '100%' }}>
                    <MaterialTable
                        className={classes.materialTable}
                        title={
                            <Grid container alignItems='center'>
                                <AccountBalanceIcon />
                                &nbsp;
                            <Typography variant='h5'>Cuentas Bancarias</Typography>
                            </Grid>
                        }
                        columns={[
                            { title: 'Número de Cuenta', field: 'numeroCuenta' },
                            { title: 'Tipo de Cuenta', field: 'tipoCuenta', filtering: false },
                            { title: 'País', field: 'pais' },
                            { title: 'Banco', field: 'banco', filtering: false },
                            { title: 'Titular de la Cuenta', field: 'titularCuenta', filtering: false },
                            { title: 'Id', field: 'idCuentaBancaria', hidden: true }
                        ]}
                        data={
                            props.bankAccountList.map(row => (
                                {
                                    idProveedor: row.idProveedor,
                                    numeroCuenta: row.numeroCuenta,
                                    tipoCuenta: row.tipoCuenta,
                                    pais: row.pais,
                                    banco: row.banco,
                                    titularCuenta: row.titularCuenta,
                                    idCuentaBancaria: row.idCuentaBancaria
                                }
                            ))
                        }
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit User',
                                onClick: (event, rowData) => { searchBankAccount(rowData.idCuentaBancaria) }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => { deleteBankAccount(rowData.idCuentaBancaria, rowData.idProveedor) }
                            },
                            {
                                icon: 'keyboard_arrow_left',
                                tooltip: 'Regresar a Provedores',
                                isFreeAction: true,
                                onClick: (e, rowData) => { window.location.href = '/providers' },
                            },
                            {
                                icon: 'add',
                                tooltip: 'Add User',
                                isFreeAction: true,
                                onClick: (e, rowData) => { toggleDialogues('createBankAccount', 'show') },
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
                                            style={{
                                                fontSize: "12px",
                                                color: "#FFFFFF",
                                                backgroundColor: "#BD2429",
                                                borderRadius: "20px",
                                                boxShadow: "2px 2px 10px",
                                                with: "108px",
                                                height: "45px",
                                                margin: "1px 5px 1px 1px",
                                                textTransform: "none"
                                            }}
                                            onClick={e => props.action.onClick(e, props.data)}
                                        >
                                            <AddIcon style={{ color: "#FFFFFF", fontSize: "large" }} />
                                            Crear
                      </Button>
                                    )
                                } else {
                                    return (
                                        <IconButton
                                            onClick={e => props.action.onClick(e, props.data)}
                                        >
                                            {props.action.icon === 'edit' ? <EditIcon /> : <div></div>}
                                            {props.action.icon === "keyboard_arrow_left" ? (
                                                <Button className={classes.cancelButton} variant='contained' onClick={e => props.action.onClick(e, props.data)} >
                                                    <KeyboardArrowLeftIcon style={{ color: "#BD2429", fontSize: "large" }} /> Regresar a Proveedor </Button>) : (<div></div>)}
                                        </IconButton>
                                    )
                                }
                            }
                        }}
                    />
                </div>

                {props.isLoading &&
                    <Grid container alignItems='center' justify='center'>
                        <CircularProgress style={{ marginTop: 10 }} />
                    </Grid>
                }


            </Grid>

            <GenericDialogue
                open={dialogues['createBankAccount']}
                title='Crear Cuenta Bancaria'
                onClose={e => toggleDialogues('createBankAccount', 'hide')}
                maxWidth='sm'
            >
                <GenericForm
                    schema={bankAccountCreateModel}
                    buttonText='Guardar'
                    cancelButton='true'
                    handleCancelButtonClick={e => toggleDialogues('createBankAccount', 'hide')}
                    handleSubmit={data => addBankAccount(data)}
                />
            </GenericDialogue>


            <GenericDialogue
                open={Object.keys(props.bankAccountSearched).length > 0}
                title='Actualizar Cuenta Bancaria'
                onClose={e => toggleDialogues('updateBankAccount', 'hide')}
                maxWidth='sm'
            >
                <GenericForm
                    schema={bankAccountUpdateModel}
                    initialDataSet={editInitialData}
                    buttonText='Guardar'
                    cancelButton='true'
                    handleCancelButtonClick={e => BankAccountDestroyDlg()}
                    handleSubmit={data => {
                        const estado = { ...data }
                        estado["estado"] = (estado["estado"] === true) ? 1 : 0;
                        updateBankAccount(estado)
                    }}
                />
            </GenericDialogue>

        </DashboardPage>
    );
};

const mapStateToProps = state => ({
    bankAccountList: state.bankAccount.bankAccountList,
    isLoading: state.bankAccount.requestingBankAccountList,
    errorMessage: state.bankAccount.requestBankAccountError,
    bankAccountSearched: state.bankAccount.bankAccountSearch
});


export default connect(mapStateToProps, {
    getBankAccount, getBankAccountByProvider, addBankAccount, searchBankAccount, updateBankAccount, searchBankAccountDestroyDlg, deleteBankAccount
})(withRouter(BankAccount));
