import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper, Step, StepLabel, Typography, TextField, MenuItem
} from '@material-ui/core';

import DashboardPage from '../BasePages/DashboardPage';

import { getBranchOffices } from '../../actions/branchOfficeActions';
import { requestArticlesPerBranch, enterArticleToBranchOffice } from '../../actions/articlesActions';

import TargetBranchSelect from './components/TargetBranchSelect';
import SmallArticleSelect from './components/SmallArticleSelect';
import CustomerSelect from './components/CustomerSelect';
import ArticleExitReport from './components/ArticleExitReport';

import { session } from '../../network';
import FinishPage from './components/FinishPage';

const styles = theme => ({
  stepper: {
    background: 'transparent'
  },
});

const staticCustomers = [
  "El Dorado", "Cemento Panamá", "Tagaropulos", "Copa Airlines", "Farmacias Arrocha"
]

const ArticleExitPage = props => {

  useEffect(() => {
    props.getBranchOffices();
  }, []);

  const classes = makeStyles(styles)();

  const [activeStep, setActiveStep] = useState(0);
  const [sourceBranchOffice, updateSourceBranchOffice] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState('');

  function reset() {
    setActiveStep(0);
    updateSourceBranchOffice(null);
    setSelectedItems({});
    setSelectedCustomer('');
  }

  const steps = [
    "Sucursal de Origen",
    "Catálogo de Productos",
    "Registro de Ventas",
    "Confirmación de Salida"
  ];

  function handleNext() {
    setActiveStep(prevStep => prevStep + 1);
  }

  function handleBack() {
    setActiveStep(prevStep => prevStep - 1);
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
    data["idOrigen"] = sourceBranchOffice.id;
    data["idUsuario"] = session.getUserData().idUsuario;
    data["cTipoMov"] = 2

    // Item values
    Object.keys(selectedItems).forEach(selectedItemId => {
      data.contenido.push({
        "idDestino": 0,
        "cantidad": selectedItems[selectedItemId].amount,
        "idArticulo": selectedItemId
      });
    });

    props.enterArticleToBranchOffice(data);

  }

  const sourceBranchContent = (
    <TargetBranchSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      selectionTitle='¿De cuál sucursal desea hacer la salida?'
      branchOfficeList={props.branchOfficeList}
      selectedBranch={sourceBranchOffice}
      shouldBlockNext={sourceBranchOffice === null}
      handleUpdateBranch={branchData => {
        props.requestArticlesPerBranch(branchData.id);
        updateSourceBranchOffice(branchData);
        setSelectedItems({});
      }}
    />
  );

  const articleSelectContent = (
    <SmallArticleSelect
      reduced={true}
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      shouldBlockNext={Object.keys(selectedItems).length <= 0}
      selectedItems={selectedItems}
      articleList={props.articlesPerBranch}
      handleCheckbox={(data, checked) => handleArticleToggle(data, checked)}
      handleAmountChange={(data, value) => handleArticleAmountChange(data, value)}
    />
  );

  const customerSelectContent = (
    <CustomerSelect
      activeStep={activeStep}
      handleNext={() => handleNext()}
      handleBack={() => handleBack()}
      selectionTitle='¿A qué cliente?'
      customerList={staticCustomers}
      selectedCustomer={selectedCustomer}
      shouldBlockNext={selectedCustomer === ''}
      handleCustomerUpdate={newCustomer => setSelectedCustomer(newCustomer)}
    />
  );

  const reportPage = (
    <ArticleExitReport
      activeStep={activeStep}
      handleNext={() => {
        handleFinalize();
        handleNext();
      }}
      handleBack={() => handleBack()}
      selectedBranchOffice={sourceBranchOffice}
      selectedCustomer={selectedCustomer}
      selectedItems={selectedItems}
    />
  );

  let currentContent = sourceBranchContent;
  switch(activeStep) {
    case 0:
      currentContent = sourceBranchContent;
      break;
    case 1:
      currentContent = articleSelectContent;
      break;
    case 2:
      currentContent = customerSelectContent;
      break;
    case 3:
      currentContent = reportPage;
      break;
  }

  return (
    <DashboardPage>
      <Typography variant='h5'>
        <b>Artículos</b> / Salidas
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
            loadingMessage='Realizando venta...'
            loading={props.requesting}
            finishMessage='Venta exitosa'
            buttonMessage='Realizar otra venta'
            handleButtonClick={() => {
              reset();
            }}
          />
        ) : currentContent}
      </div>
    </DashboardPage>
  )
}

const mapStateToProps = state => ({
  branchOfficeList: state.branches.branchList,
  articlesPerBranch: state.articles.articlesPerBranch,
  requesting: state.articles.requestingEnterItemToBranch
});

export default connect(mapStateToProps, {
  getBranchOffices, requestArticlesPerBranch, enterArticleToBranchOffice
})(ArticleExitPage);