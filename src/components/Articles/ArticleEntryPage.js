import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DashboardPage from '../BasePages/DashboardPage';
import {
  Stepper, Step, StepLabel, Typography
} from '@material-ui/core';
import { getProviders } from '../../actions/providerActions';
import { getArticles, enterArticleToBranchOffice } from '../../actions/articlesActions';
import { getBranchOffices } from '../../actions/branchOfficeActions';

import ProviderSelect from './components/ProviderSelect';
import ArticleSelect from './components/ArticleSelect';
import TargetBranchSelect from './components/TargetBranchSelect';
import EntryReport from './components/EntryReport';
import FinishPage from './components/FinishPage';

import { session } from '../../network';

const styles = theme => ({
  stepper: {
    background: 'transparent'
  },
  materialTableWrapper: {
    margin: theme.spacing(2),
    width: '100%',
  },
  summaryContainer: {
    margin: theme.spacing(6),
  },
  summaryTitle: {
    fontWeight: 'bold',
    color: "#293A80"
  }
});

const ArticleEntryPage = props => {

  useEffect(() => {
    props.getArticles();
    props.getBranchOffices();
    props.getProviders();
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedItems, setSelectedItems] = useState({})
  const [selectedBranchOffice, setSelectedBranchOffice] = useState(null)

  const classes = makeStyles(styles)();
  const steps = [
    'Seleccionar proveedor',
    'Artículos',
    'Sucursal',
    'Confirmación de ingreso',
  ];

  function reset() {
    setActiveStep(0);
    setSelectedProvider(null);
    setSelectedItems({});
    setSelectedBranchOffice(null);
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleArticleToggle(article, toggle) {

    const articleId = article.idArticulo;

    const newSelectedItems = {...selectedItems}

    if (toggle) {
      newSelectedItems[articleId] = {
        amount: 1,
        articleData: article
      }
    } else {
      delete newSelectedItems[articleId];
    }

    setSelectedItems(newSelectedItems);
  }

  function handleArticleAmountChange(article, amount) {
    const articleId = article.idArticulo;
    const newSelectedItems = {...selectedItems};
    if (articleId in newSelectedItems) {
      newSelectedItems[articleId] = {
        amount: amount,
        articleData: article
      };
    }
    setSelectedItems(newSelectedItems)
  }

  function handleFinalize() {

    let data = {
      contenido: []
    }

    // Global values
    data["idOrigen"] = selectedProvider.idProveedor;
    data["idUsuario"] = session.getUserData().idUsuario;
    data["cTipoMov"] = 1

    // Item values
    Object.keys(selectedItems).forEach(selectedItemId => {
      data.contenido.push({
        "idDestino": selectedBranchOffice.id,
        "cantidad": selectedItems[selectedItemId].amount,
        "idArticulo": selectedItemId
      });
    });

    props.enterArticleToBranchOffice(data);

  }

  const providerSelectContent = (
    <ProviderSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      shouldBlockNext={selectedProvider === null}
      providerList={props.providerList}
      selectedProvider={selectedProvider}
      handleSelectedProviderChange={provider => setSelectedProvider(provider)}
    />
  );

  const articleContent = (
    <ArticleSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      shouldBlockNext={Object.keys(selectedItems).length <= 0}
      selectedItems={selectedItems}
      articleList={props.articleList}
      handleCheckbox={(data, checked) => handleArticleToggle(data, checked)}
      handleAmountChange={(data, value) => handleArticleAmountChange(data, value)}
    />
  );

  const branchOfficeContent = (
    <TargetBranchSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      shouldBlockNext={selectedBranchOffice === null}
      selectionTitle='¿A qué sucursal desea ingresar estos productos?'
      branchOfficeList={props.branchOfficeList}
      selectedArticles={selectedItems}
      selectedBranch={selectedBranchOffice}
      handleUpdateBranch={branchData => setSelectedBranchOffice(branchData)}
    />
  );

  const confirmationContent = (
    <EntryReport
      activeStep={activeStep}
      handleNext={() => {
        handleFinalize();
        handleNext();
      }}
      handleBack={() => handleBack()}
      nextButtonText='Finalizar'
      selectedProvider={selectedProvider}
      selectedBranchOffice={selectedBranchOffice}
      selectedItems={selectedItems}
    />
  );

  let currentContent = providerSelectContent;
  switch (activeStep) {
    case 1:
      currentContent = articleContent;
      break;
    case 2:
      currentContent = branchOfficeContent;
      break;
    case 3:
      currentContent = confirmationContent;
      break;
    default:
      currentContent = providerSelectContent;
      break;
  }

  return (
    <DashboardPage>
      <Typography variant='h5'>
        <b>Artículos</b> / Entradas
      </Typography>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
        {steps.map(stepLabel => (
          <Step key={stepLabel}>
            <StepLabel>{stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>


      <div>
        {activeStep === steps.length ? (
          <FinishPage
            loadingMessage='Registrando Artículos...'
            loading={props.requesting}
            finishMessage='Artículo registrado exitorsamente'
            buttonMessage='Registrar mas articulos'
            handleButtonClick={() => {
              reset();
            }}
          />
          ) : (
            currentContent
          )
        }
      </div>
    </DashboardPage>
  )
}

const mapStateToProps = state => ({
  providerList: state.provider.providerList,
  articleList: state.articles.articlesList,
  branchOfficeList: state.branches.branchList,
  requesting: state.articles.requestingEnterItemToBranch
});

export default connect(mapStateToProps, {
  getProviders, getBranchOffices, getArticles,
  enterArticleToBranchOffice
})(ArticleEntryPage);