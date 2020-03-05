import React, { useEffect } from "react";
import { connect } from "react-redux";
import {  Card, CardContent, Typography, Button } from "@material-ui/core";
import DashboardPage from "../BasePages/DashboardPage";
import { getArticles, getTypesArticles, getArticleById, addArticles, updateArticles, articleDestroyDlg } from "../../actions/articlesActions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles } from '@material-ui/core/styles';
import useDialogueManager from '../../hooks/useDialogueManager';
import GenericForm from '../elements/GenericForm';
import GenericDialogue from '../elements/GenericDialogue';
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputBase from "@material-ui/core/InputBase";
import { createArticleModel, updateArticleModel } from "./ArticleModel";

const Articles = props => {

    useEffect(()=>{
        props.getArticles();
        props.getTypesArticles(); 
    },[]);

    loadTypesArticlesDropdown();
    function loadTypesArticlesDropdown(){
        createArticleModel.parameters.IdTipoArticulo.elements = getTypesArticlesForDropdown();
    }

    function loadTypesArticlesDropdownUpdate(){
        updateArticleModel.parameters.idTipoArticulo.elements = getTypesArticlesForDropdown();
    }

    function getTypesArticlesForDropdown(){
      var mapTypesArticles = {};
      if (props.typesArticlesList && Array.isArray(props.typesArticlesList)) {
         mapTypesArticles = props.typesArticlesList.reduce(function(map, obj) {
          map[obj.idTipoArticulo] = obj.nombre;
          return map;
         }, {});
      }
      return mapTypesArticles;
    }

    function articleDestroyDlg(){
      props.articleDestroyDlg();
    }

    function addArticle(data) {
      props.addArticles(data);
    }
    
    function updateArticle(data) {
      props.updateArticles(data);
    }
  
    function searchArticle(data) {
      props.getArticleById(data); 
      loadTypesArticlesDropdownUpdate();
      toggleDialogues('updateArticle', 'show')
    }

  const [dialogues, toggleDialogues] = useDialogueManager('createArticle');
  const [dialoguesUpd, toggleDialoguesUpd] = useDialogueManager('updateArticle');

  const editInitialData = {...props.article}
  delete editInitialData["articulosProveedor"]
  delete editInitialData["articulosSucursal"]
  delete editInitialData["idTipoArticuloNavigation"]

  const useStyles = makeStyles(theme => ({
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
    inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        margin: theme.spacing(1,44,1,1),
        transition: theme.transitions.create('width'),
        border: "1px solid #959595",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 400,
          '&:focus': {
            width: 400,
          },
        }},
     tableHead:{
      fontWeight: "bold",
      color: "#293A80",
      fontStyle: "normal",
      fontSize: "18px"
     }
     
  }));
  
  const classes = useStyles();

  return (
    <DashboardPage>
      <Card style={{ maxWidth: "100%" }}>
        <CardContent>
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
             <SettingsIcon style={{ fontSize: "medium" }}></SettingsIcon>
            Administración / Artículos
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
              <InputBase placeholder="Buscar…" classes={{ root: classes.inputRoot, input: classes.inputInput }} inputProps={{ "aria-label": "search" }} />
              <Button
              variant='contained' onClick={e => { toggleDialogues('createArticle', 'show') }}
               style={{fontSize: "12px",color: "#FFFFFF", backgroundColor:"#BD2429", borderRadius:"20px", boxShadow:"2px 2px 10px",margin:"1px 5px 1px 1px", textTransform: "none"}} ><AddIcon style={{ color: "#FFFFFF", fontSize: "large" }}  /> Crear </Button>
              
          </div>
        <TableContainer component={Paper} style={{marginTop:"6px"}}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead style={{color:"#293A80"}}>
          <TableRow >
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Descripción</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Estado</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.articlesList.map(row => (
            <TableRow key={row.nombre}>
              <TableCell component="th" scope="row" align="left"> {row.nombre}</TableCell>
              <TableCell align="left">{row.descArticulo}</TableCell>
              <TableCell align="left">{row.precioVenta}</TableCell>
              <TableCell align="left">{(row.estado===1)?'Activo':'Inactivo'}</TableCell>
              <TableCell align="center" style={{ width: 200 }}>
              <IconButton  onClick={e => {
                        searchArticle(row.idArticulo);
                      }} >
                        <EditIcon style={{ color: "#5C5C5C", fontSize: "large" }}  />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <GenericDialogue
        open={dialogues['createArticle']}
        title='Crear Artículo'
        onClose={e => toggleDialogues('createArticle', 'hide')}
        maxWidth='sm'
      >
         <GenericForm 
          schema={createArticleModel}
          buttonText='Guardar'
          cancelButton= 'true'
          handleCancelButtonClick={ e => toggleDialogues('createArticle', 'hide')}
          handleSubmit={data=> addArticle(data) }
         />
      </GenericDialogue>


      <GenericDialogue
        open={Object.keys(props.article).length > 0}
        title='Actualizar Artículo'
        onClose={e => toggleDialoguesUpd('updateArticle', 'hide')}
        maxWidth='sm'
      >
        <GenericForm 
          schema={updateArticleModel}
          initialDataSet={editInitialData}
          buttonText='Guardar'
          cancelButton= 'true'
          handleCancelButtonClick={ e => articleDestroyDlg()}
          handleSubmit={data=> {
            const estado = {...data}
            estado["estado"]= (estado["estado"]===true)?1:0;
             updateArticle(estado) 
          }}
        />
      </GenericDialogue>

    </DashboardPage>
  );
};

const mapStateToProps = state => ({
    articlesList: state.articles.articlesList,
    typesArticlesList: state.articles.typesArticlesList,
    isLoading: state.articles.requestingArticlesList,
    errorMessage: state.articles.requestArticlesError,
    article: state.articles.article
  });

export default connect(mapStateToProps, {getArticles, getTypesArticles, getArticleById, addArticles, updateArticles, articleDestroyDlg})(Articles);